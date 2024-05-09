const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
} = require("../../controller/staff/teachersCtrl");
const advancedResults = require("../../middlewares/advancedResults");
const Teacher = require("../../model/Staff/Teacher");
const teachersRouter = express.Router();

teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post("/login", loginTeacher);

teachersRouter.get(
  "/admin",
  isLogin,
  isAdmin,
  advancedResults(Teacher, {
    path : "examsCreated",
    populate: {
      path: "questions", // inside exam created, we want to populate questions
    }
  }), // model first, then data IDs you want populate
  getAllTeachersAdmin
);

teachersRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);

teachersRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);
teachersRouter.put(
  "/:teacherID/update",
  isTeacherLogin,
  isTeacher,
  teacherUpdateProfile
);
teachersRouter.put(
  "/:teacherID/update/admin",
  isLogin,
  isAdmin,
  adminUpdateTeacher
);

module.exports = teachersRouter;
