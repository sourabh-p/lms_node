const express = require("express");
const { createProgram, getPrograms, getSingleProgram, updateProgram, deleteProgram } = require("../../controller/academics/programsCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const programRouter = express.Router();

/**
 * updated chained routes
 */
programRouter
  .route("/")
  .post(isLogin, isAdmin, createProgram)
  .get(isLogin, isAdmin, getPrograms);

programRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSingleProgram)
  .put(isLogin, isAdmin, updateProgram)
  .delete(isLogin, isAdmin, deleteProgram);

module.exports = programRouter;
