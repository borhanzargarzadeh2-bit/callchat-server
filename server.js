const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("یک کاربر وصل شد");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("file message", (msg) => {
    io.emit("file message", msg);
  });

  socket.on("disconnect", () => {
    console.log("یک کاربر خارج شد");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
