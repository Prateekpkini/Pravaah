import React, { useState, useEffect } from 'react';
import './App.css';
import QueueDisplay from './components/QueueDisplay';
import StaffDashboard from './components/StaffDashboard';
import Login from './components/Login';
import OTStatus from './components/OTStatus';
import InventoryStatus from './components/InventoryStatus';
import EmergencyAlert from './components/EmergencyAlert';
import {
  FiLogIn,
  FiLogOut,
  FiAlertTriangle,
  FiClock,
  FiActivity,
  FiPackage,
  FiHome,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiMenu,
  FiX,
  FiPlus,
  FiChevronsLeft,
  FiChevronsRight,
  FiMoon,
  FiSun,
} from 'react-icons/fi';

const LOADING_TIMEOUT = 2500; // Increased for effect

/*
================================================================================
Loading Screen Component
================================================================================
*/
const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-content">
      <div className="loading-logo">
        <div className="hospital-icon">🏥</div>
        <div className="pulse-ring"></div>
      </div>
      <h1>
        Initializing Pravaah <br />
        Real-Time Hospital Management System
      </h1>
      <div className="progress-bar"></div>
    </div>
  </div>
);

/*
================================================================================
Dashboard Component
================================================================================
*/
const Dashboard = ({ onLogout, onShowAlert }) => {
  const [activeTab, setActiveTab] = useState('queue');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const TABS = {
    queue: {
      label: 'Patient Queue',
      icon: FiClock,
      component: (
        <>
          <div className="module-card slide-up">
            <QueueDisplay />
          </div>
          <div className="module-card slide-up" style={{ animationDelay: '100ms' }}>
            <StaffDashboard />
          </div>
        </>
      ),
    },
    ot: { label: 'OT Status', icon: FiActivity, component: <OTStatus /> },
    inventory: { label: 'Inventory', icon: FiPackage, component: <InventoryStatus /> },
  };

  return (
    <div className={`dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="user-info">
              <h4>Dr. Jane Doe</h4>
              <p>Cardiologist</p>
            </div>
          </div>
        </div>

        <ul className="nav-menu">
          {Object.entries(TABS).map(([key, { label, icon: Icon }]) => (
            <li
              key={key}
              className={`nav-item ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{label}</span>
              {activeTab === key && <div className="active-indicator"></div>}
            </li>
          ))}
          <li className="nav-item emergency-nav-item" onClick={onShowAlert}>
            <FiAlertTriangle className="nav-icon" />
            <span className="nav-label">Emergency Alert</span>
            <div className="pulse-dot"></div>
          </li>
        </ul>

        <div className="sidebar-footer">
          <button className="sidebar-btn">
            <FiSettings className="icon" />
            <span className="nav-label">Settings</span>
          </button>
          <button className="logout-button" onClick={onLogout}>
            <FiLogOut className="icon" />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="content-area fade-in">{TABS[activeTab].component}</div>
    </div>
  );
};

/*
================================================================================
Main App Component
================================================================================
*/
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container">
      {showAlert && <EmergencyAlert onClose={() => setShowAlert(false)} />}

      {/* Application Header */}
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-badge">
            <FiHome className="logo-icon" />
          </div>
          <div className="logo-text">
            <h1>Pravaah</h1>
            <p>Hospital Management</p>
          </div>
        </div>

        <div className="header-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search patients, staff, or records..." />
          </div>
          <div className="notification-bell">
            <FiBell />
            <span className="notification-badge">3</span>
          </div>
          <button className="voice-assistant-btn">
            <FiPlus />
            <span>New Admission</span>
            <div className="pulse-effect"></div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {isLoggedIn ? (
          <Dashboard onLogout={() => setIsLoggedIn(false)} onShowAlert={() => setShowAlert(true)} />
        ) : (
          <div className="auth-container slide-up">
            <Login onLogin={() => setIsLoggedIn(true)} />
          </div>
        )}
      </main>

      {/* Application Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Pravaah</h4>
            <p>
              Pravaah is a next-generation hospital management system designed to streamline operations and
              enhance patient care.
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Patient Records</a></li>
              <li><a href="#">Appointments</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>123 Health St, MedCity</p>
            <p>contact@pravaah.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Pravaah. All Rights Reserved.</span>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;