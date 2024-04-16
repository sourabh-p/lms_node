const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");

/**
 * @description Create Exam
 * @route       POST /api/v1/exams
 * @access      Private Teachers Only
 */
exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
  } = req.body;

  // find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);

  if (!teacherFound) {
    throw new Error("Teacher not found");
  }

  // check if exam exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exists!");
  }

  /**
   * Note: This is an alternative way to create an object using new Exam() very similiar to PHP/Laravel. Utilizing the `push()` method of mongoose I am pushing the examCreated object into the teacher object.
   */
  // create exam
  const examCreated = new Exam({
    name,
    description,
    academicTerm,
    academicYear,
    duration,
    examDate,
    examTime,
    examType,
    classLevel,
    createdBy,
    subject,
    program,
  });

  // push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);
  // save the exam
  await examCreated.save();
  await teacherFound.save();
  // send response
  res.status(201).json({
    status: "success",
    message: "Exam created successfully",
    data: examCreated,
  });
});