const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const connectDB = require('./config/db');
// const connectDB = require('./config/db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Connect to database
connectDB();

module.exports = app;
