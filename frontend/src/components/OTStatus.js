import React, { useEffect, useState } from 'react';
import { getOTs } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function OTStatus() {
  const [ots, setOts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOTs = async () => {
    try {
      setLoading(true);
      const res = await getOTs();
      setOts(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch OT data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOTs();
    socket.on('ot-update', fetchOTs);
    return () => socket.off('ot-update');
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="module-card">
      <h3>🛏️ OT Schedule</h3>
      <ul>
        {ots.map((ot) => (
          <li key={ot._id}><strong>{ot.room}:</strong> {ot.status} - {ot.patient}</li>
        ))}
      </ul>
    </div>
  );
}
