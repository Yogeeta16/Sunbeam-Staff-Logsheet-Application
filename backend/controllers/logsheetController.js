const Logsheet = require('../models/Logsheet');

// Get all logs
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Logsheet.getAll(req.user.role, req.user.id);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching logs', error: err.message });
    }
};

// Get log by ID
exports.getLogById = async (req, res) => {
    try {
        const log = await Logsheet.getById(req.params.id);
        if (!log) return res.status(404).json({ message: 'Log not found' });
        res.json(log);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching log', error: err.message });
    }
};

// Create new log (staff only)
exports.createLog = async (req, res) => {
  try {
    const logId = await Logsheet.create({ ...req.body, faculty_id: req.user.id });
    res.status(201).json({ message: 'Log created successfully', logId });
  } catch (err) {
    if (err.message.includes("already exists")) {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error creating log', error: err.message });
  }
};

// Update log (staff only if Pending)
exports.updateLog = async (req, res) => {
    try {
        const updated = await Logsheet.updateById(req.params.id, req.body, req.user.id);
        if (!updated) return res.status(403).json({ message: 'Update not allowed' });
        res.json({ message: 'Log updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating log', error: err.message });
    }
};

// Delete log (staff only if Pending)
exports.deleteLog = async (req, res) => {
    try {
        const deleted = await Logsheet.deleteById(req.params.id, req.user.id);
        if (!deleted) return res.status(403).json({ message: 'Delete not allowed' });
        res.json({ message: 'Log deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting log', error: err.message });
    }
};

// Approve / Reject log (Coordinator only)
exports.changeLogStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updated = await Logsheet.updateStatus(req.params.id, status);
        if (!updated) return res.status(404).json({ message: 'Log not found' });

        res.json({ message: `Log ${status.toLowerCase()} successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error updating log status', error: err.message });
    }
};
