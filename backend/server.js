// Main entry point
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const logsheetRoutes = require('./routes/logsheetRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads and subfolders exist 
const uploadBase = path.join(__dirname, 'uploads');
const modulePath = path.join(uploadBase, 'modules');
const schedulePath = path.join(uploadBase, 'schedules');

// Create directories if missing
[uploadBase, modulePath, schedulePath].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 Backend Running');
});

// Import Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/logsheets', logsheetRoutes);
app.use('/api/dashboard', dashboardRoutes);

//Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
