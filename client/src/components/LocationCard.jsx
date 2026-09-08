import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationCard({ onOpenMapModal }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <h3 className="text-sm font-bold text-slate-900">Current Location</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          • Live
        </span>
      </div>

      {/* Stylized Map View showing Gampaha, Sri Lanka */}
      <div 
        onClick={onOpenMapModal}
        className="relative h-44 rounded-2xl overflow-hidden border border-slate-100 cursor-pointer group map-grid-pattern flex items-center justify-center"
      >
        {/* Visual roads lines */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-200 transform -rotate-12"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-slate-200 transform rotate-6"></div>
          <div className="absolute top-0 bottom-0 right-1/4 w-3 bg-blue-100/60 transform -rotate-6"></div>
        </div>

        {/* Pulsing Pin Badge */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-400/20 rounded-full animate-ping"></div>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 fill-white" />
            </div>
          </div>
          <div className="mt-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-slate-200/80 text-center">
            <div className="text-xs font-bold text-slate-900 leading-tight">Home</div>
            <div className="text-[11px] text-slate-500">Gampaha, Sri Lanka</div>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/80 rounded-md text-[10px] text-slate-400 group-hover:text-blue-600 transition-colors">
          Click to expand
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between mt-3 text-xs text-slate-400 font-medium pt-1">
        <span>Last Updated 10:24 AM</span>
        <button 
          onClick={onOpenMapModal}
          className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
        >
          <span>View on Map</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}