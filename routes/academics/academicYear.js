const express = require("express");
const { createAcademicYear, getAcademicYears, getAcademicYear, updateAcademicYear, deleteAcademicYear } = require("../../controller/academics/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { create } = require("../../model/Academic/AcademicYear");

const academicYearRouter = express.Router();

/**
 * Below is an example of route chaining in express. 
 * The commented code is how you would normally write
 * routes, but when chaining, it would look and function
 * as written.
 * 
 * old routes
 */
// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/", isLogin, isAdmin, getAcademicYears);
// academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

/**
 * updated chained routes
 */
academicYearRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicYear)
  .get(isLogin, isAdmin, getAcademicYear);

academicYearRouter
  .route("/:id")
  .get(isLogin, isAdmin, getAcademicYear)
  .put(isLogin, isAdmin, updateAcademicYear)
  .delete(isLogin, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;