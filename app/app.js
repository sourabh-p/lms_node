const express     = require('express');
const morgan      = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');

const app  = express(); //  create application instance of express

/**
 * Middleware
 */
app.use('/api/v1/admins', adminRouter); // Admin middleware

/**
 * Routes
 */


module.exports = app;