import React, { useEffect, useState } from 'react';
import { getInventories } from '../services/api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function InventoryStatus() {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventories = async () => {
    try {
      setLoading(true);
      const res = await getInventories();
      setInventories(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch inventory data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventories();
    socket.on('inventory-update', fetchInventories);
    return () => socket.off('inventory-update');
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="module-card">
      <h3>💊 Drug Inventory</h3>
      <ul>
        {inventories.map((item) => (
          <li key={item._id} style={{ color: item.stock === 0 ? 'red' : 'black' }}>
            {item.drug}: {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
          </li>
        ))}
      </ul>
    </div>
  );
}
