require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));

require("dotenv").config()

const app = require("./src/app")
const connectToDB = require("./src/config/database")
const invokeGeminiAi = require("./src/services/ai.service")

connectToDB()
invokeGeminiAi()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
