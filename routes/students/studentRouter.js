const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { adminRegisterStudent, loginStudent, getStudentProfile, getAllStudentsByAdmin, getStudentByAdmin, studentUpdateProfile, adminUpdateStudent, writeExam } = require("../../controller/students/studentsCtrl");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const advancedResults = require("../../middlewares/advancedResults");
const Student = require("../../model/Academic/Student");

const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/admin", isLogin, isAdmin, advancedResults(Student), getAllStudentsByAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);
/** Students taking exams can access following: */
studentRouter.post("/exams/:examID/write", isStudentLogin, isStudent, writeExam); // Student only writes exams
/** */
studentRouter.put("/update", isStudentLogin, isStudent, studentUpdateProfile);       // student only
studentRouter.put("/:studentID/update/admin", isLogin, isAdmin, adminUpdateStudent); // Admin only


module.exports = studentRouter;
