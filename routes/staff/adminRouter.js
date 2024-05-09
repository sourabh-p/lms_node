const express = require("express");
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAdminsCtrl,
  getAdminProfileCtrl,
  updateAdminCtrl,
  deleteAdminCtrl,
  adminSuspendTeacherCtrl,
  adminUnsuspendteacherCtrl,
  adminWithdrawTeacherCtrl,
  adminUnwithdrawTeacherCtrl,
  adminPublishResultsCtrl,
  adminUnpublishResultsCtrl,
} = require("../../controller/staff/adminCtrl");

const isLogin     = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const Admin = require("../../model/Staff/Admin");
const advancedResults = require("../../middlewares/advancedResults");
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
adminRouter.get("/", isLogin, advancedResults(Admin), getAdminsCtrl);

/**
 * Single Admin
 */
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);

/**
 * Update Admin
 */
adminRouter.put("/", isLogin, isAdmin, updateAdminCtrl);

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