const express = require("express");
const { registerAdminCtrl, loginAdminCtrl, getAdminsCtrl, getAdminCtrl, updateAdminCtrl, deleteAdminCtrl, adminSuspendTeacherCtrl, adminUnsuspendteacherCtrl, adminWithdrawTeacherCtrl, adminUnwithdrawTeacherCtrl, adminPublishResultsCtrl, adminUnpublishResultsCtrl } = require("../../controller/academics/adminCtrl");

const adminRouter = express.Router();

/**
 * Register
 */
adminRouter.post("/register", registerAdminCtrl);

/**
 * Login
 */
adminRouter.post("/login", loginAdminCtrl);

/**
 * Get All Admin
 */
adminRouter.get("/", getAdminsCtrl);

/**
 * Single Admin
 */
adminRouter.get("/:id", getAdminCtrl);

/**
 * Update Admin
 */
adminRouter.put("/:id", updateAdminCtrl);

/**
 * Delete Admin
 */
adminRouter.delete("/:id", deleteAdminCtrl);

/**
 * Suspend Teacher
 */
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);

/**
 * Unsuspend Teacher
 */
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendteacherCtrl);

/**
 * Withdrawl Teacher
 */
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl);

/**
 * Unwithdrawl Teacher
 */
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacherCtrl);

/**
 * Publish Exam Results
 */
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl);

/**
 * Unpublish Exam Results
 */
adminRouter.put("/unpublish/exam/:id", adminUnpublishResultsCtrl);

module.exports = adminRouter;