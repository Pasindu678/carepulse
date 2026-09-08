import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginView from './pages/LoginView';
import SetupView from './pages/SetupView';
import DashboardView from './pages/DashboardView';
import { localDefaults, api } from './services/api';
import { ShieldCheck, UserCheck, LayoutDashboard, Radio } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'setup' | 'dashboard'
  const [user, setUser] = useState(localDefaults.user);
  const [patient, setPatient] = useState(localDefaults.patient);
  const [device, setDevice] = useState(localDefaults.device);
  const [backendOnline, setBackendOnline] = useState(false);

  // Check backend connectivity
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data?.status === 'ok') setBackendOnline(true);
      })
      .catch(() => setBackendOnline(false));
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('setup');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* Top Demo Bar for Reviewing Exact Screens */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 select-none z-40">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-white tracking-wide">CareCircle Screen Explorer:</span>
        </div>

        {/* View Switcher Tabs matching user's screenshots */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentView('login')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'login'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>01 Login</span>
          </button>

          <button
            onClick={() => setCurrentView('setup')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'setup'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>02 Setup & Pair Band</span>
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentView === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>04 Everyday Dashboard</span>
          </button>
        </div>

        {/* Backend Connectivity Status */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Radio className={`w-3.5 h-3.5 ${backendOnline ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
          <span>{backendOnline ? 'Render Backend API: Connected' : 'Local / Standalone Mode'}</span>
        </div>
      </div>

      {/* Screen Header Navbar */}
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView}
        onBack={() => {
          if (currentView === 'dashboard') setCurrentView('setup');
          else if (currentView === 'setup') setCurrentView('login');
        }}
      />

      {/* Screen Views */}
      {currentView === 'login' && (
        <LoginView 
          onLoginSuccess={handleLoginSuccess}
          onGoToSetup={() => setCurrentView('setup')}
        />
      )}

      {currentView === 'setup' && (
        <SetupView
          patient={patient}
          setPatient={setPatient}
          device={device}
          setDevice={setDevice}
          onContinueToDashboard={() => setCurrentView('dashboard')}
          onBackToAccount={() => setCurrentView('login')}
        />
      )}

      {currentView === 'dashboard' && (
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