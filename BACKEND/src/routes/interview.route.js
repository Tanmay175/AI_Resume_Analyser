import express from "express";
import authmiddleware from "../middlewares/auth.middleware.js"
import interviewController from "../controllers/interview.controller.js"
import upload from "../middlewares/file.middleware.js"

const interviewRouter= express.Router();

interviewRouter.post("/",authmiddleware.authUser,upload.single("resume"),interviewController.genReportController)




export default interviewRouter;
