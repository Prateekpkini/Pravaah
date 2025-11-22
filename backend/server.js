// backend/server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const queueRoutes = require('./routes/queueRoutes');
const otRoutes = require('./routes/otRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

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

// Pass io to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/queues', queueRoutes);
app.use('/api/ots', otRoutes);
app.use('/api/inventories', inventoryRoutes);

server.listen(5000, () => console.log('Backend running on http://localhost:5000'));

