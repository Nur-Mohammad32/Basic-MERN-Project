import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB Connected Successfully");
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};
