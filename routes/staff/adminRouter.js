const express = require("express");

const adminRouter = express.Router();

/**
 * Register
 */
adminRouter.post("/register", (req, res) => {
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

/**
 * Login
 */
adminRouter.post("/login", (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin Logged In'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

/**
 * Get All Admin
 */
adminRouter.get("/", (req, res) => {
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

/**
 * Single Admin
 */
adminRouter.get("/:id", (req, res) => {
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

/**
 * Update Admin
 */
adminRouter.put("/:id", (req, res) => {
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

/**
 * Delete Admin
 */
adminRouter.delete("/:id", (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has been Deleted successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
});

/**
 * Suspend Teacher
 */
adminRouter.put("/suspend/teacher/:id", (req, res) => {
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
})

/**
 * Unsuspend Teacher
 */
adminRouter.put("/unsuspend/teacher/:id", (req, res) => {
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

/**
 * Withdrawl Teacher
 */
adminRouter.put("/withdraw/teacher/:id", (req, res) => {
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

/**
 * Unwithdrawl Teacher
 */
adminRouter.put("/unwithdraw/teacher/:id", (req, res) => {
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

/**
 * Publish Exam Results
 */
adminRouter.put("/publish/exam/:id", (req, res) => {
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

/**
 * Unpublish Exam Results
 */
adminRouter.put("/unpublish/exam/:id", (req, res) => {
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

module.exports = adminRouter;