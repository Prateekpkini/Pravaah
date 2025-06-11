import React from 'react';

const sampleInventory = [
  { drug: 'Paracetamol', stock: 50 },
  { drug: 'Saline', stock: 10 },
  { drug: 'Insulin', stock: 0 },
];

export default function InventoryStatus() {
  return (
    <div className="module-card">
      <h3>💊 Drug Inventory</h3>
      <ul>
        {sampleInventory.map((item, i) => (
          <li key={i} style={{ color: item.stock === 0 ? 'red' : 'black' }}>
            {item.drug}: {item.stock > 0 ? `${item.stock} in stock` : 'Out of Stock'}
          </li>
        ))}
      </ul>
    </div>
  );
}
