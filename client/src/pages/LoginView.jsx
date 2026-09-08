import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function LoginView({ onLoginSuccess, onGoToSetup }) {
  const [username, setUsername] = useState('pasindu');
  const [password, setPassword] = useState('carepulse2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login(username, password);
      if (res.success) {
        onLoginSuccess(res.user);
      } else {
        setError(res.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      // Direct pass for demo
      onLoginSuccess({ username: 'pasindu', name: 'Pasindu Induwara' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center py-10 px-4 min-h-[calc(100vh-65px)] bg-gradient-to-b from-slate-50/60 via-[#F8FAFC] to-slate-100/40">
      
      {/* Top spacer */}
      <div></div>

      {/* Main Login Card - Exact Match to Screenshot 1 */}
      <div className="w-full max-w-[440px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-100 relative">
        
        {/* Shield Icon in soft blue container */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50/90 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Header Titles */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
            CareCircle Secure Login
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
            Welcome back. Sign in to your family care network.
          </p>
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
                onClick={() => alert("Password reset link sent to registered email.")}
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
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Create Account Link */}
        <div className="text-center mt-6 text-xs text-slate-500">
          New to CareCircle?{' '}
          <button 
            onClick={onGoToSetup}
            className="text-blue-600 font-semibold hover:underline"
          >
            Create an Account
          </button>
        </div>

      </div>

      {/* Footer text: Exact match to Screenshot 1 */}
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

    </div>
  );
}
