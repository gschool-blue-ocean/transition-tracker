const express = require("express");
const app = express();
const PORT = process.env.PORT + 1 || 8001;
const cors = require("cors");
const controller = require("./src/Backend/controller");

const http = require('http')
const { Server } = require('socket.io');
const server = http.createServer(app)

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
    }
})

server.listen(PORT, () => {
    console.log(PORT, 'web Socket running')
})