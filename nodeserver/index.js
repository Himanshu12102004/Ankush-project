const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket Chat Server");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Client connected.");

  socket.on("message", (message) => {
    // Broadcast the received message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const PORT = 3000; // Change port if needed
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
