const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to Database");
  } catch (err) {
    console.log("❌ Database Connection Error:", err.message);
    process.exit(1); // stop server if DB fails
  }
}

module.exports = connectToDB;