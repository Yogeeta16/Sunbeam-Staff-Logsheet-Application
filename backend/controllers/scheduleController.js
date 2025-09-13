// scheduleController.js
const { validationResult } = require('express-validator');
const xlsx = require('xlsx');
const path = require('path');
const db = require('../config/db');  
const Schedule = require('../models/Schedule');
const Uploads = require('../models/ScheduleUpload');
const ExcelJS = require('exceljs');

const sendValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true; }
  return false; 

};
// Convert Excel date serial (or JS Date) → 'YYYY-MM-DD'
function parseExcelDate(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  if (typeof value === 'number') {
    const dateObj = new Date(Math.round((value - 25569) * 86400 * 1000)); 
    return dateObj.toISOString().split('T')[0];
  }
  if (typeof value === 'string') {
    return value.split('T')[0];
  }
  return null;
}

// Convert Excel time (fraction of day or Date) → 'HH:MM:SS'
function parseExcelTime(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return value.toTimeString().split(' ')[0];
  }
  if (typeof value === 'number') {
    const seconds = Math.round(value * 24 * 60 * 60);
    const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  if (typeof value === 'string') {
    return value.length === 5 ? `${value}:00` : value; // e.g. '12:00' → '12:00:00'
  }
  return null;
}

exports.addSchedule = async (req, res) => {
  if (sendValidation(req, res)) return;  
  try {
    const id = await Schedule.create(req.body);
    res.status(201).json({ message: 'Schedule created', schedule_id: id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.exportSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.getAll(); 

    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "No schedules found" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Schedules");

    worksheet.columns = [
      { header: "Schedule ID", key: "schedule_id", width: 15 },
      { header: "Course ID", key: "course_id", width: 10 },
      { header: "Module ID", key: "module_id", width: 10 },
      { header: "Date", key: "date", width: 15 },
      { header: "Start Time", key: "start_time", width: 12 },
      { header: "End Time", key: "end_time", width: 12 },
      { header: "Type", key: "type", width: 10 },
      { header: "Group", key: "group", width: 10 },
      { header: "Venue", key: "venue", width: 15 },
      { header: "Faculty ID", key: "faculty_id", width: 12 },
    ];
    schedules.forEach(sch => worksheet.addRow(sch));

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=schedules.xlsx");

    res.send(buffer);
  } catch (err) {
    console.error("Error exporting schedules:", err);
    res.status(500).json({ message: "Error exporting schedules", error: err.message });
  }
};

exports.uploadScheduleExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedBy = req.user.id;

    //  1. Save file info in schedule_uploads
    await db.query(
      "INSERT INTO schedule_uploads (file_path, uploaded_by) VALUES (?, ?)",
      [req.file.path, uploadedBy]
    );

    //  2. Read Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const sheet = workbook.worksheets[0]; 

    //  3. Loop through rows (skip header row)
    const schedules = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; 

      const [
        course_id,
        module_id,
        date,
        start_time,
        end_time,
        type,
        group,
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
        group,
        venue,
        faculty_id
      ]);
    });

    if (schedules.length > 0) {
      await db.query(
        `INSERT INTO schedules 
        (course_id, module_id, date, start_time, end_time, type, \`group\`, venue, faculty_id) 
        VALUES ?`,
        [schedules]
      );
    }

    res.status(200).json({
      message: "File uploaded and schedules added successfully",
      totalInserted: schedules.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};
exports.exportSchedulesByStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const schedules = await Schedule.getByStaffId(staffId);

    if (!schedules.length) {
      return res.status(404).json({ message: "No schedules found for this staff" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Schedules");

    worksheet.columns = [
      { header: "Schedule ID", key: "schedule_id", width: 15 },
      { header: "Course ID", key: "course_id", width: 10 },
      { header: "Module ID", key: "module_id", width: 10 },
      { header: "Date", key: "date", width: 15 },
      { header: "Start Time", key: "start_time", width: 12 },
      { header: "End Time", key: "end_time", width: 12 },
      { header: "Type", key: "type", width: 10 },
      { header: "Group", key: "group", width: 10 },
      { header: "Venue", key: "venue", width: 15 },
    ];

    schedules.forEach(sch => worksheet.addRow(sch));

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=schedules_staff_${staffId}.xlsx`);
    res.send(buffer);
  } catch (err) {
    console.error("Error exporting staff schedules:", err);
    res.status(500).json({ message: "Error exporting schedules", error: err.message });
  }
};

exports.getScheduleUploads = async (req, res) => {
  try {
    const list = await Uploads.getAllUploads();
    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllSchedule = async (req, res) => {
  try {
    const rows = await Schedule.getAll();
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOneSchedule = async (req, res) => {
  try {
    const row = await Schedule.getById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSchedule = async (req, res) => {
  const bad = sendValidation(req, res); if (bad) return;
  try {
    const affected = await Schedule.update(req.params.id, req.body);
    if (!affected) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Schedule updated' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeSchedule = async (req, res) => {
  try {
    const affected = await Schedule.remove(req.params.id);
    if (!affected) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Schedule deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchSchedule = async (req, res) => {
  try {
    const data = await Schedule.search({
      faculty_id: req.query.faculty_id,
      course_id:  req.query.course_id,
      module_id:  req.query.module_id,
      date:       req.query.date
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getSchedulesByStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;

    const rows = await Schedule.getByStaffId(staffId);

    if (!rows.length) {
      return res.status(404).json({ message: "No schedules found for this staff" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Error fetching schedules by staff:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailableSchedulesForStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const rows = await Schedule.getAvailableForStaff(staffId);

    if (!rows.length) {
      return res.status(404).json({ message: "No available schedules" });
    }

    res.json(rows);
  } catch (err) {
    console.error("Error fetching available schedules:", err);
    res.status(500).json({ message: "Server error" });
  }
};
