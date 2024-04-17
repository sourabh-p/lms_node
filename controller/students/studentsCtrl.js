const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

/**
 * @description Admin Register Student
 * @route       POST /api/students/admins/register
 * @access      Private Admin Only
 */
exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
    const { name, email, password } =req.body;
    // check if the student already exists
    const student = await Student.findOne( {email: email} );
    if (student) {
        throw new Error("Student already employed");
    }
    //hash password
    const hashedPassword = await hashPassword(password);
    // Student created
    const studentRegistered = await Student.create({
        name,
        email,
        password: hashedPassword,
    });
    // send response
    res.status(201).json({
        status: "success",
        message: "Student registered Successfuly",
        data: studentRegistered,
    });
});

/**
 * @description Login a Student
 * @route       POST /api/students/login
 * @access      Public
 */
exports.loginStudent = AsyncHandler(async  (req, res)=>{
    const { email, password } = req.body;

    //find the teacher user obj
    const student = await Student.findOne({email});
    if( !student ) {
        return res.json({message: "Invalid login credentials"});
    }
    // verify the password
    const isMatched = await isPassMatched(password, student?.password);
    if ( !isMatched ) {
        return res.json({message:"Invalid login credentials"});
    } else {
        res.status(200).json({
            status: "success",
            message: "Student logged in successfully",
            data: generateToken(student?._id),
        });
    }
});

/**
 * @description Student Profile
 * @route       Get /api/students/profile
 * @access      Private Student only
 */
exports.getStudentProfile = AsyncHandler( async(req, res) => {
    const student = await Student.findById(req.userAuth?._id).select('-password -createdAt -updatedAt');

    if(!student) {
        throw new Error("Student not found");
    }
    res.status(200).json({
        status: "success",
        data: student,
        message: "Student profile fetched successfully",
    });
});

/**
 * @description Get All Students
 * @route       GET /api/v1/students/admin
 * @access      Private admin only
 */
exports.getAllStudentsByAdmin = AsyncHandler( async(req, res) => {
    const students = await Student.find();

    res.status(200).json({
        status: "success",
        message: "Students fetched successfully",
        data: students,
    });
});