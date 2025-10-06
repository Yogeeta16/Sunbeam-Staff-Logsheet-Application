// controllers/scheduleController.js
const { validationResult } = require('express-validator');
const ExcelJS = require('exceljs');
const { cloudinary } = require('../cloudinary');
const db = require('../config/db');
const Schedule = require('../models/Schedule');
const Uploads = require('../models/ScheduleUpload');

// ======= Helpers =======
const sendValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

// Convert Excel date → 'YYYY-MM-DD'
const parseExcelDate = value => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().split('T')[0];
  if (typeof value === 'number') return new Date(Math.round((value - 25569) * 86400 * 1000)).toISOString().split('T')[0];
  if (typeof value === 'string') return value.split('T')[0];
  return null;
};

// Convert Excel time → 'HH:MM:SS'
const parseExcelTime = value => {
  if (!value) return null;
  if (value instanceof Date) return value.toTimeString().split(' ')[0];
  if (typeof value === 'number') {
    const seconds = Math.round(value * 24 * 60 * 60);
    const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  if (typeof value === 'string') return value.length === 5 ? `${value}:00` : value;
  return null;
};

// ======= Controller Functions =======

// Add a single schedule
exports.addSchedule = async (req, res) => {
  if (sendValidation(req, res)) return;
  try {
    const scheduleId = await Schedule.create(req.body);
    res.status(201).json({ message: 'Schedule created', schedule_id: scheduleId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload Excel and insert schedules
exports.uploadScheduleExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const uploadedBy = req.user.id;

    // Upload file to Cloudinary
    const cloudRes = await cloudinary.uploader.upload(req.file.path, {
      folder: 'schedules',
      resource_type: 'raw'
    });
    const fileUrl = cloudRes.secure_url;

    // Save upload record
    const uploadId = await Uploads.recordUpload({ file_path: fileUrl, uploaded_by: uploadedBy });

    // Read Excel and insert schedules
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const sheet = workbook.worksheets[0];

    const schedules = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      const [
        course_id,
        module_id,
        date,
        start_time,
        end_time,
        type,
        classgroup,
        venue,
        faculty_id
      ] = row.values.slice(1);

      if (!course_id || !module_id) return;

      schedules.push([
        course_id,
        module_id,
        parseExcelDate(date),
        parseExcelTime(start_time),
        parseExcelTime(end_time),
        type,
        classgroup,
        venue,
        faculty_id
      ]);
    });

    if (schedules.length > 0) {
      await db.query(
        `INSERT INTO schedules 
         (course_id, module_id, date, start_time, end_time, type, \`classgroup\`, venue, faculty_id) 
         VALUES ?`,
        [schedules]
      );
    }

    res.status(200).json({
      message: 'File uploaded and schedules added successfully',
      fileUrl,
      totalInserted: schedules.length,
      uploadId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

// Get all uploaded schedule files
exports.getScheduleUploads = async (req, res) => {
  try {
    const uploads = await Uploads.getAllUploads();
    res.json(uploads.map(u => ({
      upload_id: u.upload_id,
      file_path: u.file_path,
      uploaded_by: u.uploaded_by,
      uploaded_by_name: u.uploaded_by_name,
      uploaded_at: u.uploaded_at
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export all schedules to Excel
exports.exportSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.getAll();
    if (!schedules.length) return res.status(404).json({ message: 'No schedules found' });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Schedules');

    worksheet.columns = [
      { header: 'Schedule ID', key: 'schedule_id', width: 15 },
      { header: 'Course ID', key: 'course_id', width: 10 },
      { header: 'Module ID', key: 'module_id', width: 10 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Start Time', key: 'start_time', width: 12 },
      { header: 'End Time', key: 'end_time', width: 12 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Classgroup', key: 'classgroup', width: 10 },
      { header: 'Venue', key: 'venue', width: 15 },
      { header: 'Faculty ID', key: 'faculty_id', width: 12 },
    ];

    schedules.forEach(sch => worksheet.addRow(sch));

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=schedules.xlsx');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error exporting schedules', error: err.message });
  }
};

// Export schedules by staff
exports.exportSchedulesByStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const schedules = await Schedule.getByStaffId(staffId);
    if (!schedules.length) return res.status(404).json({ message: 'No schedules found for this staff' });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Schedules');

    worksheet.columns = [
      { header: 'Schedule ID', key: 'schedule_id', width: 15 },
      { header: 'Course ID', key: 'course_id', width: 10 },
      { header: 'Module ID', key: 'module_id', width: 10 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Start Time', key: 'start_time', width: 12 },
      { header: 'End Time', key: 'end_time', width: 12 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Classgroup', key: 'classgroup', width: 10 },
      { header: 'Venue', key: 'venue', width: 15 },
    ];

    schedules.forEach(sch => worksheet.addRow(sch));

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=schedules_staff_${staffId}.xlsx`);
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error exporting schedules', error: err.message });
  }
};

// Get all schedules
exports.getAllSchedule = async (req, res) => {
  try {
    const rows = await Schedule.getAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single schedule
exports.getOneSchedule = async (req, res) => {
  try {
    const row = await Schedule.getById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  if (sendValidation(req, res)) return;
  try {
    const affected = await Schedule.update(req.params.id, req.body);
    if (!affected) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Schedule updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete schedule
exports.removeSchedule = async (req, res) => {
  try {
    const affected = await Schedule.remove(req.params.id);
    if (!affected) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search schedules
exports.searchSchedule = async (req, res) => {
  try {
    const data = await Schedule.search({
      faculty_id: req.query.faculty_id,
      course_id: req.query.course_id,
      module_id: req.query.module_id,
      date: req.query.date
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get schedules by staff
exports.getSchedulesByStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const rows = await Schedule.getByStaffId(staffId);
    if (!rows.length) return res.status(404).json({ message: 'No schedules found for this staff' });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get available schedules for staff
exports.getAvailableSchedulesForStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const rows = await Schedule.getAvailableForStaff(staffId);
    if (!rows.length) return res.status(404).json({ message: 'No available schedules' });
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
