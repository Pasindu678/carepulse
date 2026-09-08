import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginView from './pages/LoginView';
import SetupView from './pages/SetupView';
import DashboardView from './pages/DashboardView';
import { localDefaults } from './services/api';

export default function App() {
  // Dark mode state with persistence
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('carepulse_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('carepulse_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('carepulse_theme', 'light');
      }
    } catch (e) {}
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Check if session exists in localStorage
  const savedUser = (() => {
    try {
      const stored = localStorage.getItem('carepulse_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  })();

  const [user, setUser] = useState(savedUser);
  const [currentView, setCurrentView] = useState(savedUser ? 'dashboard' : 'login');
  const [patient, setPatient] = useState(localDefaults.patient);
  const [device, setDevice] = useState(localDefaults.device);
  const [backendOnline, setBackendOnline] = useState(false);

  // Check live Render backend connectivity
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const rawApi = import.meta.env.VITE_API_URL || 'https://carepulse-87zw.onrender.com/api';
        const cleanApi = rawApi.replace(/\/+$/, '');
        const res = await fetch(`${cleanApi}/health`);
        const data = await res.json();
        if (data?.status === 'ok') setBackendOnline(true);
      } catch (err) {
        setBackendOnline(false);
      }
    };
    checkHealth();
  }, []);

  const handleLoginSuccess = (userData, patientData) => {
    setUser(userData);
    if (patientData) {
      setPatient(patientData);
      localStorage.setItem('carepulse_patient', JSON.stringify(patientData));
    }
    localStorage.setItem('carepulse_user', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('carepulse_user');
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Production Navbar with Dark Mode Toggle */}
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView}
        user={user}
        onLogout={handleLogout}
        backendOnline={backendOnline}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Dynamic Views */}
      {!user || currentView === 'login' ? (
        <LoginView 
          onLoginSuccess={handleLoginSuccess}
        />
      ) : currentView === 'setup' ? (
        <SetupView
          patient={patient}
          setPatient={setPatient}
          device={device}
          setDevice={setDevice}
          onContinueToDashboard={() => setCurrentView('dashboard')}
          onBackToAccount={() => setCurrentView('dashboard')}
        />
      ) : (
        <DashboardView
          patient={patient}
          setPatient={setPatient}
          device={device}
          setDevice={setDevice}
          onBackToSetup={() => setCurrentView('setup')}
        />
      )}

    </div>
  );
}