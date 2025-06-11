import React from 'react';
import './EmergencyAlert.css';

export default function EmergencyAlert({ onClose }) {
  return (
    <div className="emergency-overlay">
      <div className="alert-box">
        <h2>🚨 Emergency Alert</h2>
        <p>Please follow hospital emergency protocols immediately!</p>
        <button onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );
}
