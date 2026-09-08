import mongoose from 'mongoose';

/*
-job_description :string
-self_description :string
-resume text :string

-overScore: Number
-technical qs : [{
    qs:"",
    intention:"",
    ans:""
}]
-behavioral qs : [{
    qs:"",
    intention:"",
    ans:""
}]
-skill gaps: [{
    skill:"",
    severity:{
    type:String,
    enum:["low","medium","high"]}
    }]
-preparation plan: [{
    day:Number,
    focus:String,
    tasks:[String]  
}]
*/

const technicalQuestionSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"technical qs is required"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{_id:false})

const behavioralQuestionSchema= new mongoose.Schema({
    question:{
        type:String,
        required:[true,"behavioral qs is required"]
    },
    intention:{
        type:String,
        required:[true,"intention is required"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }
},{_id:false})

const skillGapSchema= new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","hard"],
        required:[true,"severity is req"]
    }
},{_id:false})

const preparationPlanSchema= new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is req"]
    },
    focus:{
        type:String
    },
    tasks:[{
        type:String,
        required:[true,"task is required"]
    }]
},{_id:false})

const reportSchema= new mongoose.Schema({
  jobDescription:{
    type:String,
    required:[true,"job description is required"]
  },
  resume:{
    type:String
  },
  selfDescription:{
    type:String,
  },
  matchScore:{
    type:Number,
    min:0,
    max:100,
  },
  technicalQuestions:[technicalQuestionSchema],
  behavioralQuestions:[behavioralQuestionSchema],
  skillGaps:[skillGapSchema],
  preparationPlan:[preparationPlanSchema],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  title:{
    type:String,
    required:[true,"title is required"]
  }

},{timestamps:true})

const interviewReportModel= mongoose.model("InterviewReport",reportSchema)

export default interviewReportModel;