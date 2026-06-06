const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const fileRoutes = require("./routes/fileRoutes");
const Message = require("./models/Message");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/files", fileRoutes);

// Get Chat History

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Socket.IO

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      const message = await Message.create({
        sender: data.sender,
        text: data.text,
      });

      io.emit("receiveMessage", message);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Start Server

const PORT = process.env.PORT || 5002;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});