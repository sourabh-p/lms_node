const AsyncHandler = require("express-async-handler");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const Question = require("../../model/Academic/Questions");
const Teacher = require("../../model/Staff/Teacher");
const Exam = require("../../model/Academic/Exam");

/**
 * @description Create Question
 * @route POST /api/v1/:examID/questions
 * @access Private Teachers Only
 */
exports.createQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  } = req.body;
  // Find the exam
  const examFound = await Exam.findById(req.params.examID);

  if (!examFound) {
    throw new Error("Exam not found");
  }
  // create exam
  const questionCreated = await Exam.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth?._id
  });
  // add the question into the exam
  examFound.questions.push(questionCreated?._id);
  // save the exam
  await examFound.save();
  // send response
  res.status(201).json({
    status: "success",
    message: "Question created",
    data: questionCreated,
  })
});
