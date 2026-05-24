import dns from "dns";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

let memoryServer;

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (uri) {
      await mongoose.connect(uri);
      console.log("MONGODB Connected Successfully");
    } else {
      memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      await mongoose.connect(memUri);
      console.log("Connected to in-memory MongoDB for local development");
    }

    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (memoryServer) await memoryServer.stop();
    memoryServer = null;
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("Error during MongoDB disconnect", err);
  }
};
