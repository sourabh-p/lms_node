const express     = require('express');
const morgan      = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');

const app  = express(); //  create application instance of express

/**
 * Middleware
 */
app.use(morgan("dev"));
app.use(express.json()); // pass incoming json data

/**
 * Routes
 */
app.use('/api/v1/admins', adminRouter); // Admin middleware

module.exports = app;