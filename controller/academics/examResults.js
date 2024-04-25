const AsyncHandler = require("express-async-handler");
/**
 * @description Exam results check
 * @route       POST /api/v1/exam-results/:id/check
 * @access      Private Students Only
 */



exports.checkExamResults = AsyncHandler(async  (req, res) => {
    res.json('checking results');
});