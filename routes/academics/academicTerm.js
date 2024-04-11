const express = require("express");
const {
  createAcademicTerm,
  getAcademicTerm,
  deleteAcademicTerm,
  getAcademicTerms,
  updateAcademicTerms,
} = require("../../controller/academics/academicTermCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicTermRouter = express.Router();

/**
 * updated chained routes
 */
academicTermRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicTerm)
  .get(isLogin, isAdmin, getAcademicTerms);

academicTermRouter
  .route("/:id")
  .get(isLogin, isAdmin, getAcademicTerm)
  .put(isLogin, isAdmin, updateAcademicTerms)
  .delete(isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
