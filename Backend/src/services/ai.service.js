const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.Google_GENAI_API_KEY });
const {z}= require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")



async function invokeGeminiAI(){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents : "Hello gemini ! Explain what is Interview ?"
    })

    console.log(response.text)

} 

const interviewReportSchema = z.object({
    matchScore: z.number().describe("The match score between 0 to 100 for the candidate indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question : z.string().describe("The technical question can be ask in the interview"),
        intention : z.string().describe("The intention behind asking this question in the interview"),
        answer: z.string().describe("THow to answer this question, what points to cover and what are the approaches for the technical question")
    })).describe("The technical questions that can be asked in the interview along with the intention behind asking those questions and how to answer those questions"),
    
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be ask in the interview"),
        intention: z.string().describe("The intention behind asking this question in the interview"),
        answer: z.string().describe("How to answer this question, what points to cover and what are the approaches for the behavioral question")
    })).describe("The behavioral questions that can be asked in the interview along with the intention behind asking those questions and how to answer those questions"),
    
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking based on the resume and self describe"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, whether it is low, medium or high")

    })).describe("The skill gaps that the candidate has based on the resume and self describe along with the severity of the skill gap"),
    
    preparationPlan: z.array(z.object({
        day: z.string().describe("The day of the preparation plan"),
        tasks: z.array(z.string()).describe("The tasks to be done on that day for the preparation plan"),
        focus : z.string().describe("The focus of the preparation plan for that day, whether it is technical questions, behavioral questions or skill gaps")
    })).describe("The preparation plan for the interview based on the resume, self describe and job describe along with the focus of the preparation plan for each day")


})



async function generateInterviewReport({resume, selfDescription, jobDescription}) {
const prompt = `Based on the following resume, self describe and job describe, generate an interview report for the candidate. The interview report should include the match score between 0 to 100 for the candidate indicating how well the candidate's profile matches the job describe, the technical questions that can be asked in the interview along with the intention behind asking those questions and how to answer those questions, the behavioral questions that can be asked in the interview along with the intention behind asking those questions and how to answer those questions, the skill gaps that the candidate has based on the resume and self describe along with the severity of the skill gap, and the preparation plan for the interview based on the resume, self describe and job describe along with the focus of the preparation plan for each day. The response should be in JSON format and should follow this schema: ${JSON.stringify(zodToJsonSchema(interviewReportSchema))}`
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
     contents: prompt,
     config:{
        responseMimeType: "application/json",
        responseSchema : zodToJsonSchema(interviewReportSchema),


     }
})

   return JSON.parse(response.text)
    
}
module.exports = generateInterviewReport