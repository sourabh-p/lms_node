const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { createQuestion, getQuestions, getQuestion } = require("../../controller/academics/questionsCtrl");

const questionsRouter = express.Router();

questionsRouter.get('/', isTeacherLogin, isTeacher, getQuestions);
questionsRouter.get('/:id', isTeacherLogin, isTeacher, getQuestion);
questionsRouter.post('/:examID', isTeacherLogin, isTeacher, createQuestion);


module.exports = questionsRouter;