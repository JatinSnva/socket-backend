import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { initialiseSocketIO } from "./socket/index.js";
import cookieParser from "cookie-parser";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true, // If you need credentials like cookies
    },
});

app.use(cookieParser());
app.set("io", io);

app.get("/", (req, res) => {
    res.write("Hello from Socket server");
    res.end();
});

initialiseSocketIO(io);

server.listen(8000, () => {
    console.log("Server is running on port 8000");
});
