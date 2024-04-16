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
    classLevel,
    examType,
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
    createdBy: req.userAuth?._id,
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

/**
 * @description Get All Exams
 * @route       GET /api/v1/exams
 * @access      Private
 */
exports.getExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find();

  res.status(201).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams,
  });
});

/**
 * @description Get Single Exam
 * @route       GET /api/v1/exams/:id
 * @access      Private Teachers Only
 */
exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Exam fetched successfully",
    data: exam,
  });
});
