const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 20),
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
