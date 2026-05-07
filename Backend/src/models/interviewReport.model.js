const mongoose= require('mongoose');


/**
 * job description schema
 * resume text
 * self-description
 * 
 * 
 * technical questions
 * Behavioural questions
 * Skill gaps
 * preparation plan: [{
 *     day: Number
 *     focus
 *     task :- array of string  
 * }]
 * matchScore: Number
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
       type: String,
       required : [true,"Technical question is required"]
    },
    intension:{
       type: String,
       required : [true,"Intention is required"]
    },
    answer:{
       type: String,
       required : [true,"Technical Answer is required"]
    }
    },{ 
        _id: false
})


const behavioralQuestionSchema = new mongoose.Schema({
    question:{
       type: String,
       required : [true,"Behavioral question is required"]
    },
    intension:{
       type: String,
       required : [true,"Intention is required"]
    },
    answer:{
       type: String,
       required : [true,"Technical Answer is required"]
    }
    },{ 
        _id: false
})

const skillGapSchema = new mongoose.Schema({
},{ 
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true," Day is required"]
    },

    focus:{
        type: Number,
        required:[true,"Focus is required"]
    },
    tasks:[{
      type: String,
      required : [true," Task is required"]

    }]
})



const interviewReportSchema = new mongoose.Schema({
    jobDescriptin: {
        type: String,
        required: [true,"description is required"]
    },

    resume:{
        type: String,
    },
    selfDescription:{
        type:String,
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema] },
    { 
        timestamps: true

})



const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);


module.exports = interviewReportModel;
