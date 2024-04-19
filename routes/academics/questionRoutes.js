const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { createQuestion } = require("../../controller/academics/questionsCtrl");

const questionsRouter = express.Router();

questionsRouter.post('/:examID', isTeacherLogin, isTeacher, createQuestion);


module.exports = questionsRouter;