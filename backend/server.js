// backend/server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const queueRoutes = require('./routes/queueRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

mongoose.connect('mongodb://127.0.0.1:27017/hospital-queue', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

app.use('/api/queues', queueRoutes(io));

server.listen(5000, () => console.log('Backend running on http://localhost:5000'));
