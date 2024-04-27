const express = require("express");
const { checkExamResults, getExamResults } = require("../../controller/academics/examResults");

const examResultRouter = express.Router();

examResultRouter.get('/:id/check', checkExamResults);
examResultRouter.get('/', getExamResults);

module.exports = examResultRouter;