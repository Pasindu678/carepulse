import React from 'react';
import { Zap } from 'lucide-react';

export default function HealthSummaryCard() {
  return (
    <div className="space-y-4">
      {/* Chart Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-slate-900 dark:bg-white rounded-sm"></span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Health Summary</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            Last 7 Days
          </span>
        </div>

        {/* 7-Day SVG Line Chart */}
        <div className="pt-2">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 280 80">
            {/* Horizontal Grid lines */}
            <line x1="0" y1="20" x2="280" y2="20" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="280" y2="50" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Main Trend Line */}
            <path
              d="M 15 50 L 55 30 L 95 40 L 135 32 L 175 18 L 215 36 L 265 22"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data Nodes */}
            {[
              { x: 15, y: 50 },
              { x: 55, y: 30 },
              { x: 95, y: 40 },
              { x: 135, y: 32 },
              { x: 175, y: 18 },
              { x: 215, y: 36 },
              { x: 265, y: 22 }
            ].map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="4"
                className="fill-white dark:fill-slate-900 stroke-blue-600 stroke-2 hover:r-6 cursor-pointer transition-all"
              />
            ))}
          </svg>

          {/* Day Labels */}
          <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-2 px-1">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      {/* Affirmation Card underneath */}
      <div className="rounded-2xl p-4 bg-[#FFF1EE] dark:bg-rose-950/20 border border-[#FFE2DC] dark:border-rose-900/30 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400 shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <span>♡</span>
          <span>Your care makes a real difference</span>
        </div>
        <Zap className="w-4 h-4 text-emerald-500" />
      </div>
    </div>
  );
}