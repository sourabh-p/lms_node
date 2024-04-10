const express = require("express");
const { createAcademicYear } = require("../../controller/academics/academicYearCtrl");

const academicYearRouter = express.Router();

academicYearRouter.post("/", createAcademicYear);

module.exports = academicYearRouter;