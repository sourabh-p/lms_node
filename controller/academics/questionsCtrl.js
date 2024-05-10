const AsyncHandler = require("express-async-handler");
const Question = require("../../model/Academic/Questions");
const Exam = require("../../model/Academic/Exam");

/**
 * @description Create Question
 * @route POST /api/v1/questions/:examID
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
  // throw error if not found
  if (!examFound) {
    throw new Error("Exam not found");
  }
  // check if question exists
  const questionExists = await Question.findOne({question});
  // throw error if already exists
  if (questionExists) {
    throw new Error("Question already exists");
  }
  // create question
  const questionCreated = await Question.create({
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


/**
 * @description Get all questions
 * @route POST /api/v1/questions/
 * @access Private Teachers Only
 */
exports.getQuestions = AsyncHandler(async (req, res) => {
  
  res.status(200).json(res.results);

});

/**
 * @description Get single questions
 * @route GET /api/v1/questions/:id
 * @access Private Teachers Only
 */
exports.getQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Question fetched successfully",
    data: question,
  });
});

/**
 * @description Update Question
 * @route PUT /api/v1/questions/:id
 * @access Private Teachers Only
 */
exports.updateQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  } = req.body;
  // check if exists
  const questionFound = Question.findOne({ question });
  if (!questionFound) {
    throw new Error("Question not found");
  }
  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    },
    {
      new: true,
    }
  );
  // return response
  res.status(200).json({
    status: "success",
    message: "Question update successfully",
    data: updatedQuestion,
  });
});
