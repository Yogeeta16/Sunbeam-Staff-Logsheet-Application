//  Main entry point
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const logsheetRoutes = require('./routes/logsheetRoutes');
const app = express();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// Import Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/logsheets', logsheetRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

