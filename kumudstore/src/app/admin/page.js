"use client";
import React, { useState } from "react";
import { FiList, FiPlusCircle, FiSettings } from "react-icons/fi";
import AdminProductList from "./AdminProductList"; // We will move your list here
import AddProductForm from "./Design";   // We will move your form here

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="min-h-screen mt-26 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FiSettings className="text-indigo-600" /> Admin Control Center
          </h1>
          <p className="text-gray-500">Manage your store products and inventory</p>
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
        <div className="mt-4">
          {activeTab === "list" ? (
            <AdminProductList onEditClick={() => {}} /> 
          ) : (
            <AddProductForm onSuccess={() => setActiveTab("list")} />
          )}
        </div>
      </div>
    </div>
  );
}