import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export default function AlertsCard({ alerts, onSelectAlert }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-rose-500">
          <AlertTriangle className="w-4 h-4" />
          <h3 className="text-sm font-bold text-slate-900">Recent Alerts</h3>
        </div>
        <button 
          onClick={() => alert("All alerts are actively synced with family caregivers.")}
          className="text-xs font-semibold text-rose-600 hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
            No active alerts. Everything is normal!
          </div>
        ) : (
          alerts.slice(0, 2).map((alertItem) => (
            <div
              key={alertItem.id}
              onClick={() => onSelectAlert(alertItem)}
              className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: alertItem.color }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {alertItem.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {alertItem.timestamp}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}