// frontend/src/components/QueueDisplay.js
import React, { useEffect, useState } from 'react';
import { getQueues } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function QueueDisplay() {
  const [queues, setQueues] = useState([]);

  const fetchQueues = async () => {
    const res = await getQueues();
    setQueues(res.data);
  };

  useEffect(() => {
    fetchQueues();
    socket.on('queue-update', fetchQueues);
    return () => socket.off('queue-update');
  }, []);

  return (
    <div>
      <h2>🏥 Department Queues</h2>
      {queues.map((q) => (
        <div key={q._id}>
          <strong>{q.department}</strong>: Token {q.token} - {q.status}
        </div>
      ))}
    </div>
  );
}
