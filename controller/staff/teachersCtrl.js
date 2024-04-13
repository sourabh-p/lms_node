const expressAsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

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

/**
 * @description Login a Teacehr
 * @route       POST /api/teachers/login
 * @access      Public
 */

exports.loginTeacher = expressAsyncHandler(async  (req, res)=>{
    const { email, password } = req.body;

    //find the teacher user obj
    const teacher = await Teacher.findOne({email});
    if( !teacher ) {
        return res.json({message: "Invalid login credentials"});
    }
    // verify the password
    const isMatched = await isPassMatched(password, teacher?.password);
    if ( !isMatched ) {
        return res.json({message:"Invalid login credentials"});
    } else {
        res.status(200).json({
            status: "success",
            message: "Teacher logged in successfully",
            data: generateToken(teacher?._id),
        });
    }
});

/**
 * @description Get All Teachers
 * @route       GET /api/v1/admin/teachers
 * @access      Private admin only
 */

exports.getAllTeachersAdmin = expressAsyncHandler( async(req, res) => {
    const teachers = await Teacher.find();
    res.status(200).json({
        status: "success",
        message: "Teachers fetched successfully",
        data: teachers,
    });
});