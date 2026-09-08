import React from 'react';
import { Bell, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Navbar({ currentView, setView, notificationCount = 2, onBack }) {
  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-30 transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        
        {/* Left Section: Screen Tag & Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Tag badge (01 SECURE ACCESS / 02 MEMBER SETUP / 04 EVERYDAY DASHBOARD) */}
          <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-slate-300 text-[11px] font-semibold tracking-wider text-slate-500 uppercase bg-slate-50/50">
            {currentView === 'login' && '01 SECURE ACCESS'}
            {currentView === 'setup' && '02 MEMBER SETUP'}
            {currentView === 'dashboard' && '04 EVERYDAY DASHBOARD'}
          </div>

          {/* Logo Brand: Interlocking colored circles + CareCircle + Subtitle */}
          <div 
            onClick={() => setView('login')} 
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute left-0 w-5 h-5 rounded-full bg-blue-600 mix-blend-multiply opacity-90 transition-transform group-hover:scale-105"></div>
              <div className="absolute right-0 w-5 h-5 rounded-full bg-emerald-500 mix-blend-multiply opacity-90 transition-transform group-hover:scale-105"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                CareCircle
              </span>
              <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase leading-none">
                Eldercare Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Varies by screen */}
        <div className="flex items-center gap-4">
          
          {/* Screen 1: Protected & Encrypted */}
          {currentView === 'login' && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Protected & encrypted</span>
            </div>
          )}

          {/* Screen 2/3: Stepper Pills (1 Profile, 2 Device, 3 Complete) */}
          {currentView === 'setup' && (
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-semibold shadow-sm">
                1 Profile
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200">
                2 Device
              </span>
              <span className="px-3 py-1 rounded-full text-slate-400 font-medium">
                3 Complete
              </span>
            </div>
          )}

          {/* Screen 4: Dashboard Icons (Notification bell with red count, user avatar) */}
          {currentView === 'dashboard' && (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Notification Bell */}
              <div className="relative cursor-pointer p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {notificationCount}
                  </span>
                )}
              </div>

              {/* User Avatar */}
              <div 
                onClick={() => setView('login')}
                title="Pasindu Induwara (Click to switch user/logout)"
                className="w-9 h-9 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all text-blue-600 font-semibold text-sm shadow-sm"
              >
                PI
              </div>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
