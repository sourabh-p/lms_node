const express     = require('express');
const {globalErrHandler, notFoundErr} = require('../middlewares/globalErrHandler');

const adminRouter = require('../routes/staff/adminRouter');

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
 */
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;