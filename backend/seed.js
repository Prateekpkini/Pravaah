// backend/seed.js
const mongoose = require('mongoose');
const Queue = require('./models/Queue');
const OT = require('./models/OT');
const Inventory = require('./models/Inventory');

mongoose.connect('mongodb://127.0.0.1:27017/hospital-queue', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  return Promise.all([Queue.deleteMany({}), OT.deleteMany({}), Inventory.deleteMany({})]);
}).then(() => {
  const sampleQueues = [
    {
      token: 'A101',
      chamber: 'Chamber 1',
      department: 'General Medicine',
      status: 'Waiting'
    },
    {
      token: 'A102',
      chamber: 'Chamber 2',
      department: 'Orthopedics',
      status: 'In Progress'
    },
    {
      token: 'A103',
      chamber: 'Chamber 3',
      department: 'Cardiology',
      status: 'Waiting'
    },
    {
      token: 'A104',
      chamber: 'Chamber 4',
      department: 'Dermatology',
      status: 'Completed'
    },
    {
      token: 'A105',
      chamber: 'Chamber 5',
      department: 'Pediatrics',
      status: 'Waiting'
    }
  ];

  const sampleOTs = [
    { room: 'OT-1', status: 'Scheduled', patient: 'Token 12' },
    { room: 'OT-2', status: 'In Use', patient: 'Token 18' },
    { room: 'OT-3', status: 'Available', patient: '-' },
  ];

  const sampleInventories = [
    { drug: 'Paracetamol', stock: 50 },
    { drug: 'Saline', stock: 10 },
    { drug: 'Insulin', stock: 0 },
  ];

  return Promise.all([
    Queue.insertMany(sampleQueues),
    OT.insertMany(sampleOTs),
    Inventory.insertMany(sampleInventories),
  ]);
}).then(() => {
  console.log('Seed data inserted successfully!');
  process.exit();
}).catch((err) => {
  console.error('Error inserting seed data:', err);
  process.exit(1);
});
