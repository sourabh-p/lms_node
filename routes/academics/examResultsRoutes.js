const express = require("express");
const { checkExamResults, getExamResults } = require("../../controller/academics/examResults");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const examResultRouter = express.Router();

examResultRouter.get('/:id/check', isStudentLogin, isStudent, checkExamResults);
examResultRouter.get('/', isStudentLogin, isStudent, getExamResults);

module.exports = examResultRouter;