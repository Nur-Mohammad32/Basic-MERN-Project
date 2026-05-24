import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//this is necessary for production level application
let server = null;

const startServer = async (preferredPort = PORT) => {
  try {
    await connectDB();

    // try to listen, and if port is in use, retry a few times on next ports
    const maxRetries = 3;
    let attempt = 0;
    let currentPort = Number(preferredPort);

    while (attempt <= maxRetries) {
      try {
        server = app.listen(currentPort, () => {
          console.log("Server started on port :", currentPort);
        });

        // if the server emits an error later, handle it
        server.on("error", (err) => {
          if (err && err.code === "EADDRINUSE") {
            console.error(`Port ${currentPort} is already in use.`);
          } else {
            console.error("Server error:", err);
          }
        });

        // successfully started
        break;
      } catch (err) {
        // graceful shutdown handlers to ensure server and DB are closed on restart/stop
        const gracefulShutdown = async (signal) => {
          try {
            console.log(`Received ${signal}. Shutting down server...`);
            if (server) {
              server.close(() => console.log("HTTP server closed"));
            }
            // disconnect DB (imported function)
            try {
              const { disconnectDB } = await import("./config/db.js");
              await disconnectDB();
            } catch (e) {
              console.error("Error during DB disconnect:", e);
            }
            process.exit(0);
          } catch (e) {
            console.error("Error during graceful shutdown:", e);
            process.exit(1);
          }
        };

        process.once("SIGINT", () => gracefulShutdown("SIGINT"));
        process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.once("SIGUSR2", async () => {
          // nodemon uses SIGUSR2 to restart
          await gracefulShutdown("SIGUSR2");
          process.kill(process.pid, "SIGUSR2");
        });
        if (err && err.code === "EADDRINUSE") {
          console.warn(
            `Port ${currentPort} busy, trying port ${currentPort + 1}`,
          );
          currentPort += 1;
          attempt += 1;
          if (attempt > maxRetries) {
            console.error(
              "Could not start server: all fallback ports are in use.",
            );
            process.exit(1);
          }
        } else {
          console.error("Unexpected error while starting server:", err);
          process.exit(1);
        }
      }
    }
  } catch (error) {
    console.error("Fatal startup error:", error);
    process.exit(1);
  }
};

startServer();

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json()); //this method will parse JSON bodies:req.body ...basically it helps  us to access the req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Request method id ${req.method} & req URL is ${req.url}`);
//   next();

// })

app.use("/api/notes", noteRoutes);

app.get("/api/notes", (req, res) => {
  res.send("Hi!!");
});
