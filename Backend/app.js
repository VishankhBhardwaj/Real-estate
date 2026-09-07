const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const messageModel = require('./models/Message');
const conversationModel = require('./models/Conversation');
const Usermodel = require('./models/user');
require('./db/config');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://luxury-estate-navy.vercel.app'
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Socket.IO HttpOnly Cookie Auth Middleware
io.use(async (socket, next) => {
  try {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) {
      return next(new Error("Authentication error: No cookies found"));
    }

    const parsedCookies = cookie.parse(rawCookie);
    const token = parsedCookies.token;
    if (!token) {
      return next(new Error("Authentication error: Token not found"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    if (!decoded.id && !decoded._id && decoded.email) {
      const user = await Usermodel.findOne({ email: decoded.email });
      if (user) {
        decoded.id = user._id.toString();
        decoded._id = user._id.toString();
        decoded.role = decoded.role || 'buyer';
      }
    } else if (decoded._id && !decoded.id) {
      decoded.id = decoded._id.toString();
    }

    socket.user = decoded;
    next();
  } catch (err) {
    console.error("Socket authentication error:", err.message);
    return next(new Error("Authentication error: " + err.message));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id, "User ID:", socket.user?.id || socket.user?._id);

  const handleJoinRoom = async (conversationId) => {
    try {
      const userId = socket.user?.id || socket.user?._id;
      const conversation = await conversationModel.findOne({
        _id: conversationId,
        $or: [
          { buyer: userId },
          { agent: userId }
        ]
      });
      if (!conversation) {
        socket.emit("error", "You are not authorized to join this conversation");
        return;
      }
      socket.join(conversationId);
      console.log(`User ${userId} (${socket.id}) joined room ${conversationId}`);
    } catch (err) {
      console.error("Error joining room:", err);
      socket.emit("error", "Failed to join room");
    }
  };

  socket.on("joinRoom", handleJoinRoom);
  socket.on("join_room", handleJoinRoom);

  const handleSendMessage = async (messageData, callback) => {
    try {
      const { conversationId, text } = messageData;
      const senderId = socket.user?.id || socket.user?._id;
      const senderType = socket.user?.role || 'buyer';

      if (!text || !text.trim()) {
        if (typeof callback === "function") {
          return callback({
            success: false,
            status: "error",
            message: "Message text cannot be empty"
          });
        }
        return;
      }

      const conversation = await conversationModel.findOne({
        _id: conversationId,
        $or: [
          { buyer: senderId },
          { agent: senderId }
        ]
      });

      if (!conversation) {
        console.log("Unauthorized message attempt by user:", senderId);
        if (typeof callback === "function") {
          return callback({
            success: false,
            status: "error",
            message: "You are not authorized to send messages in this conversation"
          });
        }
        return;
      }

      const newMessage = await messageModel.create({
        conversation: conversationId,
        sender: senderId,
        senderType: senderType,
        text: text.trim()
      });

      io.to(conversationId).emit("receiveMessage", newMessage);
      io.to(conversationId).emit("receive_message", newMessage);

      if (typeof callback === "function") {
        return callback({
          success: true,
          status: "success",
          message: "Message sent successfully",
          data: newMessage
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      if (typeof callback === "function") {
        return callback({
          success: false,
          status: "error",
          message: "An error occurred while sending the message"
        });
      }
    }
  };

  socket.on("sendMessage", handleSendMessage);
  socket.on("send_message", handleSendMessage);

  const handleLeaveRoom = (conversationId) => {
    socket.leave(conversationId);
    console.log(`User ${socket.id} left room ${conversationId}`);
  };

  socket.on("leaveRoom", handleLeaveRoom);
  socket.on("leave_room", handleLeaveRoom);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});



// Import Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const toppicksRoutes = require('./routes/toppicksRoutes');
const filteredPropertiesRoutes = require('./routes/filteredPropertiesRoutes');
const userPropertiesRoutes = require('./routes/UserPropertiesRoutes');
const UserContactRoutes = require('./routes/contactRoutes');
const teamDetailsRoutes = require('./routes/teamRoutes');
const agentDetailsRoutes = require('./routes/agentDetailsRoutes');
const conversationRoutes = require('./routes/conversation.route');
const aiRoutes = require('./routes/ai.route');
// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/toppicks', toppicksRoutes);
app.use('/api/filter', filteredPropertiesRoutes);
app.use('/api/userProperties', userPropertiesRoutes);
app.use('/api/contact', UserContactRoutes);
app.use('/api/team', teamDetailsRoutes);
app.use('/api/agents', agentDetailsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', conversationRoutes);
app.use('/api', conversationRoutes);
// Base Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start Server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
