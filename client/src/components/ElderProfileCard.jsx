import React from 'react';
import { Watch } from 'lucide-react';

export default function ElderProfileCard({ patient, device }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      
      {/* Left: Patient Avatar & Bio */}
      <div className="flex items-center gap-5">
        {/* Elderly Avatar */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100/70 border-2 border-amber-200/80 flex items-center justify-center text-3xl sm:text-4xl shadow-sm flex-shrink-0 select-none">
          👵
        </div>

        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {patient?.name || "Mrs. Nirmala Perera"}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mt-1">
            <span className="font-medium text-slate-700">Mother</span>
            <span>• Age: {patient?.age || 72}</span>
            <span>|</span>
            <span>• Lives at: {patient?.location || "Gampaha"}</span>
          </div>
          <div className="mt-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Safe & Active
            </span>
          </div>
        </div>
      </div>

      {/* Right: Smart Band Status Card */}
      <div className="flex items-center gap-3.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 w-full sm:w-auto">
        {/* Watch Screen Visual */}
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white shadow-inner flex-shrink-0">
          <Watch className="w-6 h-6 text-indigo-400" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-900 leading-tight">
            CarePulse Band Pro
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
              🔋 {device?.battery || 78}%
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {device?.status || "Connected"}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}