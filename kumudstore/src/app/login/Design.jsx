"use client";

import { useState, useEffect } from "react";
import { FaUserShield, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationTriangle, FaClock } from "react-icons/fa";

export default function Design() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Handle countdown timer if rate limited
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLocked(false);
    }
  }, [countdown]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLocked) return;

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 429) {
        // Handle Rate Limit specifically
        setError(data.message || "Too many attempts");
        setIsLocked(true);
        setCountdown(60); // Set a 60-second visual cooldown
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data.message || "Invalid credentials provided.");
        setLoading(false);
        return;
      }

      // Success logic
      window.location.href = "/admin";
    } catch (err) {
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 transition-all">
        
        {/* Header */}
        <div className="text-center">
          <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl rotate-3 transition-colors ${isLocked ? 'bg-red-600' : 'bg-black'} text-white shadow-lg`}>
            <FaUserShield size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin Console
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Secure gateway for authorized personnel
          </p>
        </div>

        {/* Dynamic Alerts */}
        {error && (
          <div className={`mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${isLocked ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
            {isLocked ? <FaClock className="shrink-0" /> : <FaExclamationTriangle className="shrink-0" />}
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
              Email Address
            </label>
            <div className="mt-1 relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" />
              <input
                name="email"
                type="email"
                required
                disabled={isLocked}
                placeholder="admin@corp.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
              Secret Key
            </label>
            <div className="mt-1 relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isLocked}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-12 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-black transition-colors"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isLocked}
            className={`
              w-full rounded-xl py-3.5
              text-sm font-bold tracking-wide text-white
              transition-all duration-300
              shadow-lg shadow-black/10
              ${isLocked 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-black hover:bg-slate-800 active:scale-[0.98]'}
              flex items-center justify-center gap-2
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Authenticating...
              </span>
            ) : isLocked ? (
              `Try again in ${countdown}s`
            ) : (
              "Access Dashboard"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="h-px w-full bg-slate-100" />
          <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium">
            System Monitoring Active
          </p>
        </div>
      </div>
    </div>
  );
}