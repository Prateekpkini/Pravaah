import React, { useState, useEffect } from 'react';
import './App.css';
import QueueDisplay from './components/QueueDisplay';
import StaffDashboard from './components/StaffDashboard';
import Login from './components/Login';
import OTStatus from './components/OTStatus';
import InventoryStatus from './components/InventoryStatus';
import EmergencyAlert from './components/EmergencyAlert';
import HospitalIllustration from './assets/hospital-illustration.svg';
import { FiLogIn, FiLogOut, FiAlertTriangle, FiClock, FiActivity, FiPackage } from 'react-icons/fi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="pulse-logo">🏥</div>
          <h2>Initializing Pravaah System</h2>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {showAlert && <EmergencyAlert onClose={() => setShowAlert(false)} />}
      
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <span className="logo">🏥</span>
            <h1>Pravaah <span>Hospital Management System</span></h1>
          </div>
          <p className="tagline">
            Streamlining patient care through intelligent queue management and real-time resource tracking
          </p>
        </div>
        <div className="header-illustration">
          <img src={HospitalIllustration} alt="Hospital illustration" />
        </div>
      </header>

      <main className="app-main">
        {isLoggedIn ? (
          <div className="dashboard-container">
            <nav className="sidebar">
              <div className="sidebar-header">
                <h3>Navigation</h3>
              </div>
              <ul className="nav-menu">
                <li 
                  className={activeTab === 'queue' ? 'active' : ''}
                  onClick={() => setActiveTab('queue')}
                >
                  <FiClock className="nav-icon" />
                  <span>Patient Queue</span>
                </li>
                <li 
                  className={activeTab === 'ot' ? 'active' : ''}
                  onClick={() => setActiveTab('ot')}
                >
                  <FiActivity className="nav-icon" />
                  <span>OT Status</span>
                </li>
                <li 
                  className={activeTab === 'inventory' ? 'active' : ''}
                  onClick={() => setActiveTab('inventory')}
                >
                  <FiPackage className="nav-icon" />
                  <span>Inventory</span>
                </li>
                <li className="emergency-nav-item" onClick={() => setShowAlert(true)}>
                  <FiAlertTriangle className="nav-icon" />
                  <span>Emergency Alert</span>
                </li>
              </ul>
              <button 
                className="logout-button"
                onClick={() => setIsLoggedIn(false)}
              >
                <FiLogOut className="nav-icon" />
                <span>Logout</span>
              </button>
            </nav>

            <div className="content-area">
              {activeTab === 'queue' && (
                <>
                  <QueueDisplay />
                  <StaffDashboard />
                </>
              )}
              {activeTab === 'ot' && <OTStatus />}
              {activeTab === 'inventory' && <InventoryStatus />}
            </div>
          </div>
        ) : (
          <div className="auth-container">
            <Login onLogin={() => setIsLoggedIn(true)} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Pravaah Hospital Management System</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}

export default App;