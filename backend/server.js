const crypto = require("crypto");
global.crypto = crypto;

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const meetingRoutes = require("./src/routes/meetingRoutes");
const socketHandler = require("./src/socket/socketHandler");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Allowed frontend URL
const FRONTEND_URL =
  "https://intellmeet-ai-chat-git-main-bikendras-projects-b5ab54a1.vercel.app";

// Socket.io
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "IntellMeet Backend is Running 🚀",
  });
});

// Socket handler
socketHandler(io);

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});