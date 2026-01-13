import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log("Mongo URI =>", process.env.MONGODB_URL);
    console.log("DB NAME =>", DB_NAME);

    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is undefined");
    }

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(
      `MongoDB connected! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
