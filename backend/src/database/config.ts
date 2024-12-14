import mongoose from "mongoose";

const MONGODB_URL = process.env.DB_URL;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL as string);
    console.log("[database]: connected to the database.");
  } catch (error) {
    console.error("[database]: error connecting to the database:", error);
    throw error;
  }
};
