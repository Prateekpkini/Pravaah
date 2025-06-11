import React from 'react';

const sampleOTSchedule = [
  { room: 'OT-1', status: 'Scheduled', patient: 'Token 12' },
  { room: 'OT-2', status: 'In Use', patient: 'Token 18' },
  { room: 'OT-3', status: 'Available', patient: '-' },
];

export default function OTStatus() {
  return (
    <div className="module-card">
      <h3>🛏️ OT Schedule</h3>
      <ul>
        {sampleOTSchedule.map((ot, i) => (
          <li key={i}><strong>{ot.room}:</strong> {ot.status} - {ot.patient}</li>
        ))}
      </ul>
    </div>
  );
}
