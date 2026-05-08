const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @desc Generate interview report for the candidate based on the resume pdf, self description and job description
 * @access Private
 * @body {resume, selfDescription, jobDescription}
 * @response {matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan}
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)


module.exports = interviewRouter