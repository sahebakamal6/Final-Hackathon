import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect("mongodb://localhost:27017/usertasks");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err);
  }
};
