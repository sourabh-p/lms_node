const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { adminRegisterTeacher, loginTeacher, getAllTeachersAdmin } = require("../../controller/staff/teachersCtrl");
const teachersRouter = express.Router();

teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post("/login", loginTeacher);
teachersRouter.get("/admin", isLogin, isAdmin, getAllTeachersAdmin);

module.exports = teachersRouter;