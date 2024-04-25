const express = require("express");
const { checkExamResults } = require("../../controller/academics/examResults");

const examResultRouter = express.Router();

examResultRouter.get('/:id/check', checkExamResults);

module.exports = examResultRouter;