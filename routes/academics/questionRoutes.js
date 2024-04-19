const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { createQuestion, getQuestions } = require("../../controller/academics/questionsCtrl");

const questionsRouter = express.Router();

questionsRouter.get('/', isTeacherLogin, isTeacher, getQuestions);
questionsRouter.post('/:examID', isTeacherLogin, isTeacher, createQuestion);


module.exports = questionsRouter;