import express from "express";
import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


connectDB();

app.use("./api/notes",noteRoutes)

app.get("/api/notes", (req, res) => { 
    res.send("Hi!!")
})

app.listen(PORT, () => { 
    console.log("Server started on port :",PORT);
    
})