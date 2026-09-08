import React, { useState } from 'react';
import { Bell, ShieldCheck, ArrowLeft, LogOut, Settings, Watch, User, ChevronDown } from 'lucide-react';

export default function Navbar({ currentView, setView, user, onLogout, notificationCount = 2, backendOnline }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-30 transition-all shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Left Section: Screen Tag & CarePulse Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Tag badge (01 SECURE ACCESS / 02 MEMBER SETUP / 04 EVERYDAY DASHBOARD) */}
          <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-slate-300 text-[11px] font-semibold tracking-wider text-slate-500 uppercase bg-slate-50/50">
            {currentView === 'login' && '01 SECURE ACCESS'}
            {currentView === 'setup' && '02 MEMBER SETUP'}
            {currentView === 'dashboard' && '04 EVERYDAY DASHBOARD'}
          </div>

          {/* Logo Brand: Interlocking colored circles + CarePulse + Subtitle */}
          <div 
            onClick={() => user ? setView('dashboard') : setView('login')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute left-0 w-5 h-5 rounded-full bg-blue-600 mix-blend-multiply opacity-90 transition-transform group-hover:scale-105"></div>
              <div className="absolute right-0 w-5 h-5 rounded-full bg-emerald-500 mix-blend-multiply opacity-90 transition-transform group-hover:scale-105"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight flex items-center gap-1.5">
                CarePulse
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </span>
              <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase leading-none">
                Eldercare Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Varies by login state */}
        <div className="flex items-center gap-4">
          
          {/* Unauthenticated View: Protected & Encrypted */}
          {(!user || currentView === 'login') && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Protected & encrypted</span>
            </div>
          )}

          {/* Setup view stepper pills */}
          {user && currentView === 'setup' && (
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <button 
                onClick={() => setView('dashboard')}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold transition-colors flex items-center gap-1"
              >
                <span>← Back to Dashboard</span>
              </button>
            </div>
          )}

          {/* Authenticated Dashboard Header Controls */}
          {user && currentView !== 'login' && (
            <div className="flex items-center gap-3 sm:gap-4 relative">
              
              {/* Notification Bell */}
              <div 
                onClick={() => alert("Alerts synced: 1 Fall Detection event, 1 Medication Reminder.")}
                className="relative cursor-pointer p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                title="View Notifications"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {notificationCount}
                  </span>
                )}
              </div>

              {/* User Avatar & Dropdown Menu */}
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'PI'}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-none">
                      {user?.name || "Pasindu Induwara"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                      {user?.role || "Caregiver"}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl p-2 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2 z-50"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="p-3 border-b border-slate-100 mb-1">
                      <div className="font-bold text-sm text-slate-900">{user?.name}</div>
                      <div className="text-xs text-slate-400">{user?.role}</div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>{backendOnline ? 'Render Backend: Live' : 'Local Synced'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setView('setup');
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <Watch className="w-4 h-4 text-emerald-500" />
                      <span>Pair Watch / Member Setup</span>
                    </button>

                    <button
                      onClick={() => {
                        setView('dashboard');
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      <span>Everyday Dashboard</span>
                    </button>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}