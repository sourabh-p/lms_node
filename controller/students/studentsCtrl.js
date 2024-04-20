const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");

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

/**
 * @description Get Single a Student
 * @route       POST /api/v1/students/:studentID/admin
 * @access      Private admin only
 */
exports.getStudentByAdmin = AsyncHandler(async(req, res) => {
    const studentID = req.params.studentID;

    try {
        // Try to find the student by ID
        const student = await Student.findById(studentID);
        
        // Check if the teacher was found
        if (!student) {
            return res.status(404).json({
                status: "error",
                message: "Student not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Student fetched successfully",
            data: student
        });
    } catch (error) {
        // If an error occurs (e.g., CastError for invalid ObjectId)
        res.status(400).json({
            status: "error",
            message: "Invalid student ID format",
            error: error.message // Optional: provide error message for debugging
        });
    }
});

/**
 * @description Student updating profile
 * @route       UPDATE /api/v1/students/update
 * @access      Private Student Only
 */
exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    // if email is taken
    const emailExists = await Student.findOne({email});
    if(emailExists) {
        throw new Error("This email already exists");
    }

    // check if user is updating password
    if(password){
        // update user
        const student = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
            password: await hashPassword(password),
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: "success",
            data: student,
            message: "Student profile updated successfully",
        });
    } else {
        // update user email and name
        const student = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: "success",
            data: student,
            message: "Student profile updated successfully",
        });
    }
});

/**
 * @description Admin Update Student eg: Assign Classes, name, etc.
 * @route       UPDATE /api/v1/students/:studentID/update/admin
 * @access      Private Admin Only
 * 
 * Notes:  $set operator replaces the value of a field with the specified value - mongoose handles saving those field. see docs: https://www.mongodb.com/docs/manual/reference/operator/update/set/
 * Notes:  $addToSet operator adds a value to an array UNLESS the value is already present. see docs: https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/
 */
exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
    const { classLevels, academicYear, program, name, email, prefectName } = req.body;

    // find the student by id
    const studentFound = await Student.findById(req.params.studentID);
    if (!studentFound) {
        throw new Error("Student not found");
    }
    // update 
    const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, 
        {    
            $set: {
                name,
                email,
                academicYear,
                program,
                prefectName
            },
            $addToSet: {
                classLevels
            }
        },
        {
            new: true,
        }
    );

    // send response
    res.status(200).json({
        status: "success",
        data: studentUpdated,
        message: "Student updated successfully"
    });
});

/**
 * @description Student taking exam
 * @route       POST /api/v1/students/exams/:examID/write
 * @access      Private Student Only
 */
exports.writeExam = AsyncHandler(async (req, res) => {
    // get student taking exam
    const studentFound = await Student.findById(req.userAuth?.id);
    if(!studentFound){
        throw new Error("Student not found");
    }
    // get exam
    const examFound = await Exam.findById(req.params.examID).populate(
        "questions"
    );
    console.log({examFound});
    if(!examFound){
        throw new Error("Exam not found");
    }
    // get questions to be answered
    const questions = examFound?.questions;
    // get all answers the user submitted
    const studentAnswers = req.body?.answers;
    // check if student answered all questions
    if (studentAnswers.length !== questions.length) {
        throw new Error("You have not answered all of the questions");
    }

    /**
     * Check if users name is already in students who took this exam using the id from student in the exam results as the query */
    const studentFoundInResults = await ExamResult.findOne({ student: studentFound?._id});
    if (studentFoundInResults) {
        throw new Error("You have already taken this exam. Wait for your results.");
    }

    // build report object - this will tell the student how many answers they got right/wrong
    let correctAnswers    = 0;
    let wrongAnswers      = 0;
    let status            = ""; // failed/passed
    let grade             = 0;
    let score             = 0;
    let answeredQuestions = 0;

    // check for answers
    // loop through questions to the possible answers
    for (let i = 0; i < questions.length; i++) {
        // find the single question
        const question = questions[i];
        // check if the answer is correct
        if(question.correctAnswer === studentAnswers[i]){
            correctAnswers++;
            score++;
            question.isCorrect = true;
        } else {
            wrongAnswers++;
        }
    }

     // calculate reports
     totalQuestions    = questions.length;
     grade             = (correctAnswers / questions.length) * 100;
     answeredQuestions = questions.map(question => {
         return {
             question: question.question,
             correctAnswers: question.correctAnswer,
             isCorrect: question.isCorrect,
         };
     });

     if(grade >= 50) {
        status = 'Pass'
     } else {
        status = 'Fail';
     }

     // Remarks
     if (grade >= 80) {
        remarks = 'Excellent!';
     } else if (grade >=70) {
        remarks = 'Very Good';
     } else if (grade >=60) {
        remarks = 'Good';
     } else if (grade >=50) {
        remarks = 'Fair';
     } else {
        remarks = "Needs Improvement";
     }

     // generate exam results
     const examResults = await ExamResult.create({
        student: studentFound?._id,
        exam: examFound?._id,
        grade,
        score,
        status,
        remarks,
        classLevel: examFound?.classLevel,
        academicTerm: examFound?.academicTerm,
        academicYear: examFound?.academicYear,
     });
     // push results into students
     studentFound.examResults.push(examResults?._id);
     // save
     await studentFound.save();
    // submit request
    res.status(200).json({
        status: "success",
        correctAnswers,
        wrongAnswers,
        score,
        grade,
        status,
        remarks,
        answeredQuestions,
    })
});