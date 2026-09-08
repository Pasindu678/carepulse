import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  MapPin, 
  Bell, 
  Users, 
  Settings, 
  Heart,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab = 'dashboard', setActiveTab, alertCount = 2 }) {
  const [likes, setLikes] = useState(14);
  const [liked, setLiked] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'health', label: 'Health Overview', icon: Activity },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertCount },
    { id: 'caregivers', label: 'Caregivers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between py-6 px-4 bg-white/70 backdrop-blur-md border-r border-slate-100 min-h-[calc(100vh-65px)]">
      
      {/* Navigation Links */}
      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50/80 text-blue-600 shadow-sm border border-blue-100/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Promo Card: "Healthy Parents Happier Tomorrows" */}
      <div className="mt-8 pt-4">
        <div className="rounded-3xl p-5 bg-[#FFF1EE] border border-[#FFE2DC] flex flex-col items-center text-center relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
          {/* Subtle decorative glow */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-rose-200/40 rounded-full blur-xl pointer-events-none"></div>

          {/* Top Heart Icon */}
          <div className="w-10 h-10 rounded-2xl bg-white/80 flex items-center justify-center mb-3 shadow-sm text-rose-500">
            <Heart className="w-5 h-5 fill-rose-500/20 text-rose-500" />
          </div>

          <h4 className="font-display font-bold text-base text-rose-600 leading-snug px-1 mb-4">
            Healthy Parents<br />Happier Tomorrows
          </h4>

          {/* Interactive Heart Button */}
          <button
            onClick={handleLike}
            className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all transform active:scale-90 shadow-sm ${
              liked 
                ? 'bg-rose-500 border-rose-500 text-white scale-105' 
                : 'bg-white border-rose-200 text-rose-400 hover:text-rose-600 hover:border-rose-300'
            }`}
            title="Send Love to Family"
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-white' : ''}`} />
          </button>
          
          <span className="text-[10px] text-rose-400 mt-2 font-medium">
            {likes} Family Check-ins
          </span>
        </div>
      </div>

    </aside>
  );
}
