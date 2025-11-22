import React, { useEffect, useState } from 'react';
import { getQueues, updateQueue } from '../services/api';

export default function StaffDashboard() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getQueues();
      setQueues(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const updatedQueue = await updateQueue(id, { status });
      setQueues((prevQueues) =>
        prevQueues.map((q) => (q._id === id ? updatedQueue.data : q))
      );
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>
      {queues.map((q) => (
        <div key={q._id} className="queue-card">
          <div><strong>{q.department}</strong> — Token {q.token}</div>
          <select
            value={q.status}
            onChange={(e) => handleStatuschange(q._id, e.target.value)}
          >
            <option value="Waiting">Waiting</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
}
