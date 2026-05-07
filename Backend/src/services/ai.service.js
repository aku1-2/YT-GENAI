const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.Google_GENAI_API_KEY });


async function invokeGeminiAI(){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Hello gemini! Explain what an interview is?"
    })

    console.log(response.text)

} 
module.exports = invokeGeminiAI
