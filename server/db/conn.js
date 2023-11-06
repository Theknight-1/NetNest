import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const connectToMongoDB = asyncHandler(async (url) => {
  return await mongoose.connect(url);
});

export default connectToMongoDB
