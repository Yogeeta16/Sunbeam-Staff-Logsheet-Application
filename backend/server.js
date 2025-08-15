//  Main entry point
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// Import Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Module 
const moduleRoutes = require('./routes/moduleRoutes');
app.use('/api/modules', moduleRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

