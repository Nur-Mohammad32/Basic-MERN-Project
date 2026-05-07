import mongoose from "mongoose";

export const connectDB = async () => { 
    try {
        await mongoose.connect("mongodb+srv://Nur:500nur500@cluster0.yuwd8kb.mongodb.net/?appName=Cluster0")
        console.log("MongoDB Connected Successfully");
        
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}