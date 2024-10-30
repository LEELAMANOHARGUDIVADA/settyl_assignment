import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./connection.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"
import Message from "./models/messageSchema.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);
app.use("/uploads", express.static("uploads"));

// USER ROUTE
app.use("/api/user", userRoutes);
// POST ROUTE
app.use("/api/post", postRoutes);
// CHAT ROUTE
app.use("/api/chat", chatRoutes);


app.get("/", (req, res) => {
    res.send("App is working");
});

const onlineUsers = {};

// SOCKET.IO FUNCTIONALITY
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`User with ID ${userId} joined their room.`);
    });

    socket.on("userOnline", (userId) => {
        onlineUsers[userId] = socket.id; 
        io.emit("userStatusChange", { userId, status: "online" });
        
        Object.keys(onlineUsers).forEach((id) => {
            if (id !== userId) {
                socket.emit("userStatusChange", { userId: id, status: "online" });
            }
        });
    });

    socket.on("sendMessage", async (message) => {
        try {
            const { senderId, receiverId, text, timestamp } = message;

            io.to(receiverId).emit("receiveMessage", message);

            const newMessage = new Message({ senderId, receiverId, text, timestamp });
            await newMessage.save();
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        const userId = Object.keys(onlineUsers).find((key) => onlineUsers[key] === socket.id);
        if (userId) {
            delete onlineUsers[userId];
            io.emit("userStatusChange", { userId, status: "offline" });
        }
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
    console.log("SERVER RUNNING ON PORT", PORT);
    connectDB(process.env.MONGODB_URL);
});
