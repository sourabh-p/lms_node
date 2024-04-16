const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { createExam, getExams, getExam } = require("../../controller/academics/examsCtrl");

const examRouter = express.Router();

/**
 * observe the middleware being defined in the route method of this chained router.
 */
examRouter
    .route("/", isTeacherLogin, isTeacher)
    .post(createExam)
    .get(getExams);
    
examRouter
    .route("/:id", isTeacherLogin, isTeacher)
    .get(getExam);

module.exports=examRouter;