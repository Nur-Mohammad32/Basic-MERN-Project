import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB, disconnectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//this is necessary for production level application
let server = null;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log("Server started on port :", PORT);
    });

    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use.`);
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("Fatal startup error:", error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  try {
    console.log(`Received ${signal}. Shutting down server...`);
    if (server) {
      server.close(() => console.log("HTTP server closed"));
    }
    await disconnectDB();
    process.exit(0);
  } catch (e) {
    console.error("Error during graceful shutdown:", e);
    process.exit(1);
  }
};

process.once("SIGINT", () => gracefulShutdown("SIGINT"));
process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.once("SIGUSR2", async () => {
  await gracefulShutdown("SIGUSR2");
  process.kill(process.pid, "SIGUSR2");
});

startServer();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
app.use(express.json()); //this method will parse JSON bodies:req.body ...basically it helps  us to access the req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Request method id ${req.method} & req URL is ${req.url}`);
//   next();

// })

app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
