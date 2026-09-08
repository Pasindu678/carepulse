import React from 'react';
import { Zap } from 'lucide-react';

export default function HealthSummaryCard() {
  return (
    <div className="space-y-4">
      {/* Chart Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-slate-900 rounded-sm"></span>
            <h3 className="text-sm font-bold text-slate-900">Health Summary</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Last 7 Days
          </span>
        </div>

        {/* 7-Day SVG Line Chart matching Screenshot 4 */}
        <div className="pt-2">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 280 80">
            {/* Horizontal Grid lines */}
            <line x1="0" y1="20" x2="280" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="280" y2="50" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
            
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
                className="fill-white stroke-blue-600 stroke-2 hover:r-6 cursor-pointer transition-all"
              />
            ))}
          </svg>

          {/* Day Labels */}
          <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2 px-1">
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
      <div className="rounded-2xl p-4 bg-[#FFF1EE] border border-[#FFE2DC] flex items-center justify-between text-xs font-semibold text-rose-600 shadow-sm">
        <div className="flex items-center gap-2">
          <span>♡</span>
          <span>Your care makes a real difference</span>
        </div>
        <Zap className="w-4 h-4 text-emerald-500" />
      </div>
    </div>
  );
}