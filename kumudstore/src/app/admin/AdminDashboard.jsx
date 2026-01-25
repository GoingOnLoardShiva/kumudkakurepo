"use client";
import React, { useState } from "react";
import { FiList, FiPlusCircle, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import AdminProductList from "./AdminProductList";
import Design from "./Design";
import { useRouter } from "next/navigation";

export default function AdminDashboard({ adminEmail }) {
  const [activeTab, setActiveTab] = useState("list");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        // Redirect to login page after clearing cookie
        router.push("/login");
        router.refresh(); // Clears server-side cache
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="left-side">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FiSettings className="text-indigo-600" /> Admin Control Center
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium">
                <FiUser size={14}/> {adminEmail}
              </span>
              <span>• Manage your store inventory</span>
            </div>
          </div>

          <div className="right-side">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 transition-all active:scale-95 shadow-sm disabled:opacity-50"
            >
              <FiLogOut />
              {isLoggingOut ? "Processing..." : "Sign Out"}
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6 gap-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all ${
              activeTab === "list"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FiList size={18} /> Product Inventory
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all ${
              activeTab === "add"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FiPlusCircle size={18} /> Add New Product
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {activeTab === "list" ? (
            <AdminProductList onEditClick={() => {}} />
          ) : (
            <Design onSuccess={() => setActiveTab("list")} />
          )}
        </div>
      </div>
    </div>
  );
}