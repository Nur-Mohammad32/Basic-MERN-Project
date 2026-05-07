import express from "express";
import noteRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";

const app = express();
connectDB();

app.use("./api/notes",noteRoutes)

app.get("/api/notes", (req, res) => { 
    res.send("Hi!!")
})

app.listen(5001, () => { 
    console.log("Server started on port : 5001");
    
})