import React, { useEffect, useState } from 'react';
import { getQueues, updateQueue } from '../services/api';

export default function StaffDashboard({ onLogout }) {
  const [queues, setQueues] = useState([]);

  const fetchData = async () => {
    const res = await getQueues();
    setQueues(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateQueue(id, { status });
    fetchData();
  };

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>
      <button onClick={onLogout} className="logout-button">Logout</button>
      {queues.map((q) => (
        <div key={q._id} className="queue-card">
          <div><strong>{q.department}</strong> — Token {q.token}</div>
          <select
            value={q.status}
            onChange={(e) => handleStatusChange(q._id, e.target.value)}
          >
            <option value="waiting">Waiting</option>
            <option value="in-service">In Service</option>
            <option value="completed">Completed</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      ))}
    </div>
  );
}
