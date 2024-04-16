const Student = require("../model/Academic/Student");

const isStudent = async (req, res, next) => {
    // find the user
    const userId = req?.userAuth?._id;
    const studentFound = await Student.findById(userId);
    // check is user is admin
    if(studentFound?.role === 'student') {
        next();
    } else {
        next(new Error("Access Denied. User must be student"));
    }
};

module.exports = isStudent;