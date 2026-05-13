import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("Server started on port :", PORT);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();

//middleware
app.use(express.json());//this method will parse JSON bodies:req.body ...basically it helps  us to access the req.body

//our simple custom middleware
// app.use((req, res, next) => { 
//   console.log(`Request method id ${req.method} & req URL is ${req.url}`);
//   next();
  
// })

app.use("/api/notes", noteRoutes);

app.get("/api/notes", (req, res) => {
  res.send("Hi!!");
});
