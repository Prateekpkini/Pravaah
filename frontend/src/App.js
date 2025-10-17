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

const LOADING_TIMEOUT = 1500;

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-animation">
      <div className="pulse-logo">🏥</div>
      <h2>Initializing Pravaah System</h2>
      <div className="loading-bar"></div>
    </div>
  </div>
);

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <li className={isActive ? 'active' : ''}>
    <button onClick={onClick}>
      <Icon className="nav-icon" />
      <span>{label}</span>
    </button>
  </li>
);

const Dashboard = ({ onLogout, onShowAlert }) => {
  const [activeTab, setActiveTab] = useState('queue');

  const TABS = {
    queue: {
      label: 'Patient Queue',
      icon: FiClock,
      component: <><QueueDisplay /><StaffDashboard /></>
    },
    ot: {
      label: 'OT Status',
      icon: FiActivity,
      component: <OTStatus />
    },
    inventory: {
      label: 'Inventory',
      icon: FiPackage,
      component: <InventoryStatus />
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>Navigation</h3>
        </div>
        <ul className="nav-menu">
          {Object.entries(TABS).map(([key, { label, icon }]) => (
            <NavItem
              key={key}
              icon={icon}
              label={label}
              isActive={activeTab === key}
              onClick={() => setActiveTab(key)}
            />
          ))}
          <li className="emergency-nav-item">
            <button onClick={onShowAlert}>
              <FiAlertTriangle className="nav-icon" />
              <span>Emergency Alert</span>
            </button>
          </li>
        </ul>
        <button className="logout-button" onClick={onLogout}>
          <FiLogOut className="nav-icon" />
          <span>Logout</span>
        </button>
      </nav>

      <div className="content-area">
        {TABS[activeTab].component}
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), LOADING_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
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
          <Dashboard
            onLogout={() => setIsLoggedIn(false)}
            onShowAlert={() => setShowAlert(true)}
          />
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