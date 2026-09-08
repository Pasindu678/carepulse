import React, { useState, useEffect } from 'react';
import { Phone, Video, X, MapPin, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ElderProfileCard from '../components/ElderProfileCard';
import VitalsGrid from '../components/VitalsGrid';
import LocationCard from '../components/LocationCard';
import ActivityTimeline from '../components/ActivityTimeline';
import AlertsCard from '../components/AlertsCard';
import QuickContactCard from '../components/QuickContactCard';
import HealthSummaryCard from '../components/HealthSummaryCard';
import WristbandSimulator from '../components/WristbandSimulator';
import { api, localDefaults } from '../services/api';

export default function DashboardView({ onBackToSetup, patient, setPatient, device, setDevice }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Vitals and alerts state
  const [vitals, setVitals] = useState(localDefaults.vitals);
  const [alerts, setAlerts] = useState(localDefaults.alerts);
  const [activity, setActivity] = useState(localDefaults.activity);
  
  // Modals
  const [activeContactModal, setActiveContactModal] = useState(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    async function loadData() {
      const v = await api.getVitals();
      if (v) setVitals(v);
      const a = await api.getAlerts();
      if (a?.alerts) setAlerts(a.alerts);
      if (a?.activity) setActivity(a.activity);
    }
    loadData();
  }, []);

  const handleResolveAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    api.resolveAlert(id);
    setSelectedAlert(null);
  };

  const addAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
  };

  const addActivity = (newAct) => {
    setActivity(prev => [newAct, ...prev]);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-65px)] bg-[#F8FAFC]">
      
      {/* Left Sidebar matching Screenshot 4 */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        alertCount={alerts.filter(a => a.active).length}
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-[1240px] overflow-y-auto space-y-6">
        
        {/* Top Breadcrumb & User Greeting matching Screenshot 4 */}
        <div>
          <button
            onClick={onBackToSetup}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-2 transition-colors"
          >
            <span>← Back to Setup</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good Morning, Pasindu Induwara
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Here's your parent's health and location update.
          </p>
        </div>

        {/* Row 1: Profile Summary Card */}
        <ElderProfileCard patient={patient} device={device} />

        {/* Row 2: 4 Metric Cards */}
        <VitalsGrid vitals={vitals} />

        {/* Lower Grid: Left 2 Columns & Right 1 Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <LocationCard onOpenMapModal={() => setMapModalOpen(true)} />
            <ActivityTimeline activity={activity} />
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <AlertsCard 
              alerts={alerts} 
              onSelectAlert={(a) => setSelectedAlert(a)} 
            />
            <QuickContactCard onTriggerContact={(type) => setActiveContactModal(type)} />
            <HealthSummaryCard />
          </div>

        </div>

      </main>

      {/* Floating Smart Wristband Hardware Simulator */}
      <WristbandSimulator
        vitals={vitals}
        setVitals={setVitals}
        device={device}
        setDevice={setDevice}
        addAlert={addAlert}
        addActivity={addActivity}
      />

      {/* Quick Contact Modal */}
      {activeContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center relative">
            <button
              onClick={() => setActiveContactModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {activeContactModal === 'call' && (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <Phone className="w-8 h-8 fill-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Calling Wristband...</h4>
                <p className="text-xs text-slate-500">
                  Connecting high-definition two-way audio to {patient?.name || "Mrs. Nirmala Perera"}'s CarePulse Band Pro.
                </p>
                <button
                  onClick={() => setActiveContactModal(null)}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
                >
                  End Call
                </button>
              </div>
            )}

            {activeContactModal === 'video' && (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  <Video className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Live Video Check-in</h4>
                <div className="h-32 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs">
                  Connecting to Home Camera Hub...
                </div>
                <button
                  onClick={() => setActiveContactModal(null)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Close Video
                </button>
              </div>
            )}

            {activeContactModal === 'message' && (
              <div className="space-y-3 text-left">
                <h4 className="text-base font-bold text-slate-900">Send Wristband TTS Audio Message</h4>
                <p className="text-xs text-slate-500">
                  Wristband will speak this message out loud to your parent.
                </p>
                <textarea
                  defaultValue="Hi Amma, I checked your heart rate and you are doing great! Don't forget to take your medicine."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                />
                <button
                  onClick={() => {
                    alert("Voice notification transmitted to CarePulse wristband speaker!");
                    setActiveContactModal(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold"
                >
                  Speak On Wristband
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedAlert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: selectedAlert.color }}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{selectedAlert.title}</h4>
                <p className="text-xs text-slate-400">{selectedAlert.timestamp}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 my-4 leading-relaxed">
              {selectedAlert.details}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleResolveAlert(selectedAlert.id)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold"
              >
                Acknowledge & Mark Safe
              </button>
              <button
                onClick={() => {
                  setActiveContactModal('call');
                  setSelectedAlert(null);
                }}
                className="px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {mapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setMapModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="font-bold text-slate-900 text-lg mb-1">Live GPS Location</h4>
            <p className="text-xs text-slate-500 mb-4">Gampaha, Western Province, Sri Lanka • Geofence Status: Safe Zone (Home)</p>
            <div className="h-72 rounded-2xl bg-slate-100 border border-slate-200 map-grid-pattern relative flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xl">
                  <MapPin className="w-6 h-6 fill-white" />
                </div>
                <div className="mt-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-slate-900 shadow-md">
                  {patient?.name || "Mrs. Nirmala Perera"} • Home
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Accuracy: ±3 meters • Satellite Lock: 9 Sats</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}