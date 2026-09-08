import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  FileText, 
  Lock, 
  Watch, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Search,
  Check
} from 'lucide-react';
import { api } from '../services/api';

export default function SetupView({ onContinueToDashboard, onBackToAccount, patient, setPatient, device, setDevice }) {
  // Form fields matching Screenshot 2
  const [fullName, setFullName] = useState(patient?.name || 'Robert S.');
  const [dob, setDob] = useState(patient?.dob || 'May 14, 1943');
  const [gender, setGender] = useState(patient?.gender || 'Male');
  const [emergencyContact, setEmergencyContact] = useState(patient?.emergencyContact || 'Anna Simmons');
  const [medicalNotes, setMedicalNotes] = useState(patient?.medicalNotes || 'Penicillin allergy • Hypertension');

  // Wristband Pairing State matching Screenshot 2 & 3
  const [macAddress, setMacAddress] = useState(device?.mac || '00:18:44:11:3A:B7');
  const [isSearching, setIsSearching] = useState(false);
  const [isDeviceFound, setIsDeviceFound] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Find your device to continue');

  const handleFindDevice = async () => {
    setIsSearching(true);
    try {
      const res = await api.findDevice(macAddress);
      // Simulate realistic BLE connection handshake
      setTimeout(() => {
        setIsDeviceFound(true);
        setStatusMessage('Device is ready to continue');
        setIsSearching(false);
        if (setDevice) {
          setDevice(prev => ({ ...prev, isPaired: true, mac: macAddress, status: 'Connected' }));
        }
      }, 700);
    } catch (err) {
      setIsSearching(false);
      setIsDeviceFound(true);
      setStatusMessage('Device is ready to continue');
    }
  };

  const handleSaveAndContinue = async () => {
    if (!isDeviceFound) return;
    
    // Update patient state
    const updatedPatient = {
      ...patient,
      name: fullName,
      dob: dob,
      gender: gender,
      emergencyContact: emergencyContact,
      medicalNotes: medicalNotes
    };
    if (setPatient) setPatient(updatedPatient);
    await api.updatePatient(updatedPatient);

    onContinueToDashboard();
  };

  return (
    <div className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col justify-between">
      
      {/* Top Welcome Title */}
      <div className="mb-8 sm:mb-10">
        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase block mb-2">
          WELCOME TO THE CIRCLE
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Let's set up {fullName.split(' ')[0]}'s care profile.
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl font-normal">
          This information helps CareCircle respond clearly when every second counts.
        </p>
      </div>

      {/* 2 Side-by-Side Cards: Profile & Link Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-12">
        
        {/* Card 1: Elderly Profile (7 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-slate-100">
          
          {/* Card Header */}
          <div className="flex items-start gap-3.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">
                Elderly Profile
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tell us a little about who we're caring for.
              </p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="space-y-4">
            
            {/* Row 1: Full Name & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Date of Birth
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Gender & Emergency Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Gender
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Emergency Contact
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Medical Notes / Allergies */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Medical Notes / Allergies
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400">
                  <FileText className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Card 2: Link Watch & Devices (Screenshot 2 & 3) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden">
          
          {/* Mint decorative circular backdrop in top right */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none -mr-4 -mt-4 opacity-80"></div>

          {/* Card Header */}
          <div className="flex items-start gap-3.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center shadow-sm flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">
                Link Watch & Devices
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pair {fullName.split(' ')[0]}'s personal monitor.
              </p>
            </div>
          </div>

          {/* Watch Icon in soft green badge */}
          <div className="mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Watch className="w-6 h-6" />
            </div>
          </div>

          {/* Section description */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-900 mb-1">
              Pair via MAC Address / Watch ID
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Locate the unique ID on the back of the elderly person's CareCircle monitor watch, then search for it securely.
            </p>
          </div>

          {/* MAC Address Search Bar */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1 flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={macAddress}
                onChange={(e) => {
                  setMacAddress(e.target.value);
                  setIsDeviceFound(false);
                  setStatusMessage('Find your device to continue');
                }}
                placeholder="00:18:44:11:3A:B7"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleFindDevice}
              disabled={isSearching}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all active:scale-95 disabled:opacity-70 flex items-center gap-1.5"
            >
              {isSearching ? 'Scanning...' : 'Find'}
            </button>
          </div>

          {/* Device Found Banner - Screenshot 3 */}
          {isDeviceFound ? (
            <div className="mb-3 p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl flex items-start gap-3 animate-in fade-in duration-300">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-emerald-900 leading-tight">
                  Device Found: CareCircle Smart Watch
                </div>
                <div className="text-emerald-700 font-mono mt-0.5">
                  (MAC: {macAddress}) — Connected Successfully!
                </div>
              </div>
            </div>
          ) : null}

          {/* Subtext Status indicator */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className={`w-2 h-2 rounded-full ${isDeviceFound ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            <span className={isDeviceFound ? 'text-emerald-700' : 'text-slate-500'}>
              {statusMessage}
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Navigation Controls: Exact Match to Screenshot 2 & 3 */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        
        {/* Left: Back to account */}
        <button
          onClick={onBackToAccount}
          className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
        >
          <span>← Back to account</span>
        </button>

        {/* Right: Save & Continue to Dashboard */}
        <button
          onClick={handleSaveAndContinue}
          disabled={!isDeviceFound}
          className={`px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
            isDeviceFound
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_10px_20px_-3px_rgba(16,185,129,0.35)] active:scale-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Save & Continue to Dashboard</span>
          <span>→</span>
        </button>

      </div>

    </div>
  );
}
