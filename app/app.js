const express     = require('express');
const morgan      = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');
const globalErrHandler = require('../middlewares/globalErrHandler');

const app  = express(); //  create application instance of express

/**
 * Middleware
 */
app.use(express.json()); // pass incoming json data

/**
 * Routes
 */
app.use("/api/v1/admins", adminRouter); // Admin middleware

/**
 * Error Middlewares
 * 
 * when express sees the following, it will return
 * as error handled middleware
 */
app.use(globalErrHandler);

module.exports = app;