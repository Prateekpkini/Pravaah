// frontend/src/components/QueueDisplay.js
import React, { useEffect, useState } from 'react';
import './QueueDisplay.css';
import { getQueues } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Dummy token data if backend is unavailable
const demoTokens = [
  { token: 'A101', chamber: 'Dr. Ramesh (Chamber 1)', department: 'OPD', status: 'Waiting' },
  { token: 'A102', chamber: 'Dr. Neha (Chamber 2)', department: 'ENT', status: 'In Progress' },
  { token: 'A103', chamber: 'Dr. Aman (Chamber 3)', department: 'Cardiology', status: 'Waiting' },
  { token: 'A104', chamber: 'Dr. Sneha (Chamber 4)', department: 'Orthopaedics', status: 'Completed' },
];

export default function QueueDisplay() {
  const [queues, setQueues] = useState([]);

  const fetchQueues = async () => {
    try {
      const res = await getQueues();
      setQueues(res.data);
    } catch (error) {
      setQueues(demoTokens); // fallback to demo data
    }
  };

  useEffect(() => {
    fetchQueues();
    socket.on('queue-update', fetchQueues);
    return () => socket.off('queue-update');
  }, []);

  return (
    <div className="queue-display-container">
      <h2>🧾 Current Token Status</h2>
      <div className="token-bubble-wrapper">
        {queues.map((q, idx) => (
          <div className={`token-bubble status-${q.status.toLowerCase().replace(' ', '-')}`} key={idx}>
            <div className="token-number">{q.token}</div>
            <div className="token-details">
              <strong>{q.department}</strong><br />
              <span>{q.chamber}</span><br />
              <span className="status-label">{q.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
