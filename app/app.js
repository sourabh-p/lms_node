const express     = require('express');
const morgan      = require('morgan');
const adminRouter = require('../routes/staff/adminRouter');

const app  = express(); //  create application instance of express

/**
 * Middleware
 */
app.use(morgan("dev"));
app.use(express.json()); // pass incoming json data

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

let user = {
    name: "john doe",
    isAdmin: false,
    isLogin: true,
};

const isLogin = (req, res, next) => {
    if(user.isLogin){
        next();
    } else {
        res.status(401).json({
            msg: "Unauthorized",
        });
    }
};

const isAdmin = (req, res, next) => {
    if(user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            msg: 'You are not an administrator'
        });
    }
};

app.use(isLogin, isAdmin); // chaining multiple middleware

/**
 * Routes
 */
app.use('/api/v1/admins', adminRouter); // Admin middleware

module.exports = app;