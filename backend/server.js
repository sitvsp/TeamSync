const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");

const User = require("./models/User");
const Message = require("./models/Message");

dotenv.config();

// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store Online Users

const onlineUsers = {};

// Middleware

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/files", fileRoutes);

// Get All Users

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      "name email"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get All Messages

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Socket.IO

io.on("connection", (socket) => {
  console.log(
    "User Connected:",
    socket.id
  );

  // Register User

  socket.on("registerUser", (username) => {
    onlineUsers[username] = socket.id;
    console.log(
      username,
      "registered"
    );
  }
  );

  // Send Message

  socket.on(
    "sendMessage",
    async (data) => {
      try {
        const message =
          await Message.create({
            sender: data.sender,
            receiver: data.receiver || null,
            text: data.text || "",
            fileUrl: data.fileUrl || "",
            fileName: data.fileName || "",
            chatType: data.chatType || "group",
          });

        // GROUP CHAT

        if (message.chatType === "group") {
          io.emit(
            "receiveMessage",
            message
          );
        }

        // PRIVATE CHAT

        else {
          const receiverSocket = onlineUsers[message.receiver];

          if (receiverSocket) {
            io.to(
              receiverSocket
            ).emit(
              "receiveMessage",
              message
            );
          }

          socket.emit(
            "receiveMessage",
            message
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  socket.on("disconnect", () => {
    for (const user in onlineUsers) {
      if (onlineUsers[user] === socket.id) {
        delete onlineUsers[user];
        break;
      }
    }
    console.log("User Disconnected:", socket.id);
  }
  );
});

// Start Server

server.listen(5002, () => {
  console.log(
    `Server running on port 5002`
  );
});