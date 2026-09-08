import React from 'react';
import { Phone, Video, MessageSquare } from 'lucide-react';

export default function QuickContactCard({ onTriggerContact }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Phone className="w-4 h-4 text-slate-700" />
        <h3 className="text-sm font-bold text-slate-900">Quick Contact</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        
        {/* Call Button (Green) */}
        <button
          onClick={() => onTriggerContact('call')}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 transition-all transform active:scale-95">
            <Phone className="w-5 h-5 fill-white" />
          </div>
          <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
            Call
          </span>
        </button>

        {/* Video Call Button (Blue) */}
        <button
          onClick={() => onTriggerContact('video')}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-all transform active:scale-95">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
            Video Call
          </span>
        </button>

        {/* Message Button (Purple) */}
        <button
          onClick={() => onTriggerContact('message')}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-md shadow-purple-500/20 transition-all transform active:scale-95">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
            Message
          </span>
        </button>

      </div>
    </div>
  );
}