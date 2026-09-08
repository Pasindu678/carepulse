import React, { useState } from 'react';
import { Watch, AlertTriangle, Pill, Activity, Battery, Sliders, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { api } from '../services/api';

export default function WristbandSimulator({ 
  vitals, 
  setVitals, 
  device, 
  setDevice, 
  addAlert, 
  addActivity 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [heartRate, setHeartRate] = useState(vitals.heartRate.value || 72);
  const [temp, setTemp] = useState(vitals.temperature.value || 36.6);
  const [spo2, setSpo2] = useState(vitals.spO2.value || 98);
  const [battery, setBattery] = useState(device.battery || 78);

  const handleSimulateFall = async () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAlert = {
      id: `alt-${Date.now()}`,
      title: "Fall Detected",
      timestamp: "Just now • " + time,
      time: time,
      severity: "critical",
      type: "fall",
      color: "#F97316",
      active: true,
      details: "High impact detected on CarePulse wristband accelerometer. Automatic assistance summoned."
    };
    addAlert(newAlert);
    addActivity({
      id: `act-${Date.now()}`,
      time: time,
      title: "Fall detected",
      desc: "Help is on the way",
      color: "#EF4444"
    });
    await api.simulateTelemetry({ heartRate: 98 });
    setHeartRate(98);
    setVitals(prev => ({
      ...prev,
      heartRate: { ...prev.heartRate, value: 98, status: 'Elevated' }
    }));
  };

  const handleSimulateMedication = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAlert = {
      id: `alt-${Date.now()}`,
      title: "Medication Reminder",
      timestamp: "Just now • " + time,
      time: time,
      severity: "routine",
      type: "medication",
      color: "#3B82F6",
      active: true,
      details: "Scheduled afternoon dosage: Metformin 500mg & Vitamin D3."
    };
    addAlert(newAlert);
    addActivity({
      id: `act-${Date.now()}`,
      time: time,
      title: "Medication reminder",
      desc: "Scheduled medicine due",
      color: "#3B82F6"
    });
  };

  const handleVitalsChange = async (type, val) => {
    if (type === 'hr') {
      setHeartRate(val);
      setVitals(prev => ({
        ...prev,
        heartRate: { ...prev.heartRate, value: val, status: val > 100 ? 'Elevated' : 'Normal' }
      }));
      await api.simulateTelemetry({ heartRate: val });
    } else if (type === 'temp') {
      setTemp(val);
      setVitals(prev => ({
        ...prev,
        temperature: { ...prev.temperature, value: val, status: val > 37.5 ? 'Fever' : 'Normal' }
      }));
      await api.simulateTelemetry({ temperature: val });
    } else if (type === 'spo2') {
      setSpo2(val);
      setVitals(prev => ({
        ...prev,
        spO2: { ...prev.spO2, value: val, status: val < 95 ? 'Low' : 'Normal' }
      }));
      await api.simulateTelemetry({ spO2: val });
    } else if (type === 'battery') {
      setBattery(val);
      setDevice(prev => ({ ...prev, battery: val }));
    }
  };

  const handleAddSteps = () => {
    const newSteps = vitals.steps.value + 150;
    setVitals(prev => ({
      ...prev,
      steps: { ...prev.steps, value: newSteps }
    }));
    api.simulateTelemetry({ steps: newSteps });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition-all font-medium text-xs border border-slate-700 active:scale-95 cursor-pointer"
      >
        <Watch className="w-4 h-4 text-emerald-400" />
        <span>Smart Band Simulator</span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
      </button>

      {/* Simulator Drawer Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 mt-2 space-y-4 animate-in fade-in slide-in-from-bottom-2 transition-colors">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Wristband Hardware Simulator</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">CarePulse Band Pro (00:18:44:11:3A:B7)</p>
              </div>
            </div>
          </div>

          {/* Quick Triggers */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSimulateFall}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 dark:hover:bg-orange-900/60 text-orange-700 dark:text-orange-300 text-xs font-semibold border border-orange-200 dark:border-orange-800 transition-all active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span>Simulate Fall Alert</span>
            </button>

            <button
              onClick={handleSimulateMedication}
              className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800 transition-all active:scale-95 cursor-pointer"
            >
              <Pill className="w-4 h-4 text-blue-500" />
              <span>Trigger Med Alarm</span>
            </button>
          </div>

          {/* Sliders for real-time telemetry */}
          <div className="space-y-3 pt-1 text-xs">
            
            {/* Heart Rate Slider */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-500" /> Heart Rate:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{heartRate} bpm</span>
              </div>
              <input
                type="range"
                min="55"
                max="125"
                value={heartRate}
                onChange={(e) => handleVitalsChange('hr', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Body Temperature:</span>
                <span className="font-bold text-slate-900 dark:text-white">{temp} °C</span>
              </div>
              <input
                type="range"
                min="35.5"
                max="39.2"
                step="0.1"
                value={temp}
                onChange={(e) => handleVitalsChange('temp', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* SpO2 Slider */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span>Oxygen (SpO2):</span>
                <span className="font-bold text-slate-900 dark:text-white">{spo2} %</span>
              </div>
              <input
                type="range"
                min="90"
                max="100"
                value={spo2}
                onChange={(e) => handleVitalsChange('spo2', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Battery & Steps */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleAddSteps}
                className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-xl border border-amber-200 dark:border-amber-800 font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all text-xs cursor-pointer"
              >
                + 150 Steps Walked
              </button>

              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                <Battery className="w-3.5 h-3.5 text-emerald-500" />
                <span>Battery: {battery}%</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}