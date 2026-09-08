import React from 'react';
import { Heart, Thermometer, Activity, Footprints } from 'lucide-react';

export default function VitalsGrid({ vitals }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      
      {/* 1. Heart Rate */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-slate-200 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center border border-rose-100 dark:border-rose-900/50">
            <Heart className="w-4 h-4 fill-rose-500/20 text-rose-500" />
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-400 block mb-1">
            Heart Rate
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {vitals.heartRate.value}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">bpm</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <span>• {vitals.heartRate.status}</span>
          </div>
        </div>
        {/* Live ECG Waveform */}
        <div className="mt-3 pt-2">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
            <path
              d="M0,15 L20,15 L25,5 L30,22 L35,10 L40,18 L45,15 L70,15 L75,7 L80,24 L85,12 L90,15 L100,15"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              className="ecg-line"
            />
          </svg>
        </div>
      </div>

      {/* 2. Body Temperature */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-slate-200 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
            <Thermometer className="w-4 h-4 text-blue-500" />
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-400 block mb-1">
            Body Temperature
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {vitals.temperature.value}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">°C</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <span>• {vitals.temperature.status}</span>
          </div>
        </div>
        {/* Smooth Blue Wave */}
        <div className="mt-3 pt-2">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
            <path
              d="M0,15 Q25,5 50,15 T100,15"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 3. SpO2 (Oxygen) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-slate-200 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-500 flex items-center justify-center border border-purple-100 dark:border-purple-900/50">
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-400 block mb-1">
            SpO2 (Oxygen)
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {vitals.spO2.value}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">%</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <span>• {vitals.spO2.status}</span>
          </div>
        </div>
        {/* Smooth Purple Wave */}
        <div className="mt-3 pt-2">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
            <path
              d="M0,16 Q25,8 50,16 T100,16"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 4. Steps Today */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-slate-200 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center border border-amber-100 dark:border-amber-900/50">
            <Footprints className="w-4 h-4 text-amber-500" />
          </div>
        </div>
        <div>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-400 block mb-1">
            Steps Today
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {vitals.steps.value.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            <span>• {vitals.steps.status}</span>
          </div>
        </div>
        {/* Amber Bar Chart */}
        <div className="mt-3 pt-2 flex items-end justify-between h-8 gap-1 px-1">
          {[35, 45, 60, 80, 50, 95, 70, 85].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="w-full bg-amber-400 dark:bg-amber-500 rounded-t-sm"
            />
          ))}
        </div>
      </div>

    </div>
  );
}