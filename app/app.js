const express     = require('express');
const {globalErrHandler, notFoundErr} = require('../middlewares/globalErrHandler');

const adminRouter = require('../routes/staff/adminRouter');
const academicYearRouter = require('../routes/academics/academicYear');
const academicTermRouter = require('../routes/academics/academicTerm');

const app  = express(); //  create application instance of express

/**
 * Middleware
 */
app.use(express.json()); // pass incoming json data

/**
 * Routes
 */
app.use("/api/v1/admins", adminRouter); // Admin routes
app.use("/api/v1/academic-years", academicYearRouter); // academic year routes
app.use("/api/v1/academic-terms", academicTermRouter); // academic term routes
/**
 * Error Middlewares
 */
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;