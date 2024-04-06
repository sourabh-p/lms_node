const express = require('express');
const morgan = require('morgan');

const app  = express(); //  create application instance of express

/**
 * Middleware
 */
app.use(morgan("dev"));

/**
 * Routes
 */

// Admin Register
app.post('/api/v1/admins/register', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has been registered successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Admin Login
app.post('/api/v1/admins/login', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'All Admins'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Get All Admin
app.get('/api/v1/admins', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'All Registered Admins'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Get Single Admin 
app.get('/api/v1/admins/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Single Admin'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Update Admin
app.put('/api/v1/admins/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has been updated successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Delete Admin
app.delete('/api/v1/admins/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has been updated successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Admin Suspending Teacher
app.put('/api/v1/admins/suspend/teacher/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Suspended teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Admin Unsuspending Teacher
app.put('/api/v1/admins/unsuspend/teacher/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Unsuspended teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Admin Withdrawing Teacher
app.put('/api/v1/admins/withdraw/teacher/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has withdrawn teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Admin Unwithdrawing Teacher
app.put('/api/v1/admins/unwithdraw/teacher/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Unwithdrawn teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Admin Publishing Exam Results
app.put('/api/v1/admins/publish/exam/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has published exam result(s) successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

// Admin Unpublishing Exam Results
app.put('/api/v1/admins/unpublish/exam/:id', (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Unpublished exam result(s) successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});


module.exports = app;