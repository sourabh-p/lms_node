const express     = require('express');
const {globalErrHandler, notFoundErr} = require('../middlewares/globalErrHandler');

const adminRouter = require('../routes/staff/adminRouter');
const academicYearRouter = require('../routes/academics/academicYear');
const academicTermRouter = require('../routes/academics/academicTerm');
const classLevelRouter = require('../routes/academics/classLevel');
const programRouter = require('../routes/academics/program');
const subjectRouter = require('../routes/academics/subject');
const yearGroupRouter = require('../routes/academics/yearGroup');

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
app.use("/api/v1/class-levels", classLevelRouter); // Class level routes
app.use("/api/v1/programs", programRouter); // Program routes
app.use("/api/v1/subjects", subjectRouter); // Subject routes
app.use("/api/v1/year-groups", yearGroupRouter); // Year Group routes
/**
 * Error Middlewares
 */
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;