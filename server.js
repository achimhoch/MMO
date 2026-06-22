const express = require('express');
const http = require('http');

const Socketserver = require("./server/network/SocketServer");

const app = express();
const server = http.createServer(app);

app.use(express.static("client"));

new Socketserver(server);

server.listen(3300, () => {
    console.log("Server lauscht auf Port 3300");
});