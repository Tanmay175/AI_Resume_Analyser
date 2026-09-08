import express from "express";
import authmiddleware from "../middlewares/auth.middleware.js"
import interviewController from "../controllers/interview.controller.js"
import upload from "../middlewares/file.middleware.js"

const interviewRouter= express.Router();

interviewRouter.post("/",authmiddleware.authUser,upload.single("resume"),interviewController.genReportController)

interviewRouter.get("/report/:interviewId",authmiddleware.authUser,interviewController.getReportByIdController)
interviewRouter.get("/",authmiddleware.authUser,interviewController.getAllInterviewReportsController)



export default interviewRouter;
