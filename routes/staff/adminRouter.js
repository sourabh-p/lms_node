const express = require("express");

const adminRouter = express.Router();

adminRouter.post("/", (req, res) => {
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

module.exports = adminRouter;