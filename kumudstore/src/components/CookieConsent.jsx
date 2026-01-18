"use client";

import { useState, useEffect } from "react";
import { FiInfo, FiCheck, FiX } from "react-icons/fi";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl z-50 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          
          {/* Icon and Text */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <FiInfo size={20} />
              </div>
              <h3 className="font-bold text-slate-800">Cookie Privacy Policy</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              We use cookies to enhance your experience, analyze site traffic, and for security 
              purposes like protecting our admin panel. By clicking "Accept", you agree to 
              our use of cookies.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={declineCookies}
              className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold bg-black text-white hover:bg-slate-800 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-black/10"
            >
              <FiCheck /> Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}