// frontend/src/components/QueueDisplay.js
import React, { useEffect, useState } from 'react';
import './QueueDisplay.css';
import { getQueues } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function QueueDisplay() {
  const [queues, setQueues] = useState([]);
  const [error, setError] = useState(null);

  const fetchQueues = async () => {
    try {
      const res = await getQueues();
      setQueues(res.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch queue data. Please try again later.');
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
      {error && <div className="error-message">{error}</div>}
      <div className="token-bubble-wrapper">
        {queues.map((q) => (
          <div className={`token-bubble status-${q.status.toLowerCase().replace(' ', '-')}`} key={q.token}>
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
