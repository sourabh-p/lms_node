const Admin = require("../model/Staff/Admin");
const Teacher = require("../model/Staff/Teacher");

const isTeacher = async (req, res, next) => {
    // find the user
    const userId = req?.userAuth?._id;
    const teacherFound = await Teacher.findById(userId);
    // check is user is admin
    if(teacherFound?.role === 'teacher') {
        next();
    } else {
        next(new Error("Access Denied. User must be teacher"));
    }
};

module.exports = isTeacher;