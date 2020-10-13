const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const PORT = 3000 || process.env.PORT;

io.on("connection", (socket) => {
  console.log("a user connected :D");
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg); // will emit chat messages to all clients listening to the specific socket io server, in this case localhost
  });
});

server.listen(PORT, () => console.log("server running on port: " + PORT));
