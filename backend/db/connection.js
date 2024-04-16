import mongoose from "mongoose";

// connect to MongoDB
export const connectDB = async(uri) => {
    await mongoose.connect(uri);
}