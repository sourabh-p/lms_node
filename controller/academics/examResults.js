const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../model/Academic/ExamResults");

/**
 * @description Exam results check
 * @route       POST /api/v1/exam-results/:id/check
 * @access      Private Students Only
 */
exports.checkExamResults = AsyncHandler(async  (req, res) => {
    res.json('checking results');
});

/**
 * @description Get all exam results (name, id)
 * @route       POST /api/v1/exam-results
 * @access      Private Students Only
 */
exports.getExamResults = AsyncHandler( async ( req, res ) => {
   const results = await ExamResult.find();
   res.status(200).json({
    status: "success",
    message: "Exam results retrieved successfully",
    data: results
   });
});