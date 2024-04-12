const expressAsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

/**
 * @description Admin Register Teacher
 * @route       POST /api/teachers/admins/register
 * @access      Private
 */
exports.adminRegisterTeacher = expressAsyncHandler(async (req, res) => {
    const { name, email, password } =req.body;
    // check if the teacher already exists
    const teacher = await Teacher.findOne( {email: email} );
    if (teacher) {
        throw new Error("Teacher already employed");
    }
    //hash password
    const hashedPassword = await hashPassword(password);;
    // teacher created
    const teacherCreated = await Teacher.create({
        name,
        email,
        password: hashedPassword,
    });
    // send response
    res.status(201).json({
        status: "success",
        message: "Teacher registered Successfuly",
        data: teacherCreated,
    });
});