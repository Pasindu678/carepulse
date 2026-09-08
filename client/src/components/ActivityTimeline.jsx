import React from 'react';
import { Clock } from 'lucide-react';

export default function ActivityTimeline({ activity }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-2 mb-5">
        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {activity.map((item) => (
          <div key={item.id} className="flex items-start gap-4 text-xs">
            <div className="w-16 flex-shrink-0 text-slate-400 dark:text-slate-500 font-mono font-medium pt-0.5">
              {item.time}
            </div>
            <div 
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <span className="font-bold text-slate-900 dark:text-white mr-2">{item.title}</span>
              <span className="text-slate-500 dark:text-slate-400">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}