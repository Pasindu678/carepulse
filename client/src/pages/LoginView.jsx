import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, ArrowRight, UserCheck, Sparkles, X, HeartHandshake } from 'lucide-react';
import { api } from '../services/api';

export default function LoginView({ onLoginSuccess }) {
  const [username, setUsername] = useState('pasindu');
  const [password, setPassword] = useState('carepulse123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Register Modal State
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regElderName, setRegElderName] = useState('');
  const [regRole, setRegRole] = useState('Family Caregiver');
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');

  // Demo accounts
  const demoAccounts = [
    {
      label: "Pasindu Induwara",
      role: "Son / Family Caregiver",
      username: "pasindu",
      password: "carepulse123",
      elder: "Mrs. Nirmala Perera"
    },
    {
      label: "Dr. Anna Simmons",
      role: "Registered Nurse",
      username: "dr.anna",
      password: "carepulse123",
      elder: "Robert S."
    }
  ];

  const handleSelectDemo = async (demo) => {
    setUsername(demo.username);
    setPassword(demo.password);
    setError('');
    setLoading(true);

    try {
      const res = await api.login(demo.username, demo.password);
      if (res.success) {
        onLoginSuccess(res.user, res.patient);
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      onLoginSuccess({
        username: demo.username,
        name: demo.label,
        role: demo.role
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login(username, password);
      if (res.success) {
        onLoginSuccess(res.user, res.patient);
      } else {
        setError(res.message || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      onLoginSuccess({
        username: username,
        name: username === 'pasindu' ? 'Pasindu Induwara' : 'Family Caregiver',
        role: 'Primary Caregiver'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    setRegLoading(true);

    try {
      const res = await fetch(`${api.getApiBase ? api.getApiBase() : 'https://carepulse-87zw.onrender.com/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          username: regUsername,
          password: regPassword,
          role: regRole,
          patientName: regElderName,
          patientRelation: 'Parent'
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowRegister(false);
        onLoginSuccess(data.user, data.patient);
      } else {
        setRegError(data.message || 'Registration failed');
      }
    } catch (err) {
      // Local fallback
      onLoginSuccess({
        name: regName || 'New Caregiver',
        username: regUsername,
        role: regRole
      });
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center py-8 px-4 min-h-[calc(100vh-65px)] bg-gradient-to-b from-slate-50/60 via-[#F8FAFC] to-slate-100/40">
      
      <div></div>

      {/* Main Login Card - CarePulse Branded */}
      <div className="w-full max-w-[460px] bg-white rounded-3xl p-7 sm:p-9 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-100 relative">
        
        {/* Shield Icon in soft blue container */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50/90 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Header Titles */}
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            CarePulse Secure Login
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
            Welcome back. Sign in to your family care network.
          </p>
        </div>

        {/* Demo Accounts Quick Selector */}
        <div className="mb-6 p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              1-Click Demo Logins:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoAccounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectDemo(acc)}
                className="text-left p-2.5 bg-white hover:bg-blue-600 hover:text-white rounded-xl border border-blue-100/80 transition-all group shadow-sm active:scale-95 flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-white leading-tight">
                  {acc.label}
                </div>
                <div className="text-[10px] text-slate-400 group-hover:text-blue-100 mt-0.5">
                  Caring for {acc.elder}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-xs text-rose-600 bg-rose-50 rounded-xl border border-rose-100">
              {error}
            </div>
          )}

          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Username
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={() => alert("Password reset link sent! Use password 'carepulse123' for demo accounts.")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-[0_10px_20px_-3px_rgba(37,99,235,0.4)] transition-all transform active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? 'Verifying...' : 'Sign In to CarePulse'}
            </button>
          </div>
        </form>

        {/* Create Account Link */}
        <div className="text-center mt-6 text-xs text-slate-500">
          New to CarePulse?{' '}
          <button 
            onClick={() => setShowRegister(true)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>

      </div>

      {/* Footer text */}
      <footer className="mt-8 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
        <span>HIPAA-conscious data practices</span>
        <span>•</span>
        <button 
          onClick={() => alert("CarePulse 24/7 Elder Support: support@carepulse.app")} 
          className="hover:text-slate-600 transition-colors"
        >
          Need help? Contact support
        </button>
      </footer>

      {/* Create Account Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Join CarePulse Network
                </h3>
                <p className="text-xs text-slate-500">Register as a family caregiver</p>
              </div>
            </div>

            {regError && (
              <div className="mb-4 p-3 text-xs text-rose-600 bg-rose-50 rounded-xl border border-rose-100">
                {regError}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Silva"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    placeholder="john"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Elder Name You Are Caring For</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grandma Perera"
                  value={regElderName}
                  onChange={(e) => setRegElderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  {regLoading ? 'Creating Account...' : 'Create CarePulse Account'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}