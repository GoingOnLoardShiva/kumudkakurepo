"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    homeDelivery: false,
    freeInstallation: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Fetch original data
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`); // You need a GET route for single ID
      const data = await res.json();
      setFormData({
        title: data.title,
        description: data.description,
        homeDelivery: data.homeDelivery,
        freeInstallation: data.freeInstallation,
      });
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin"); // Go back to dashboard after save
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-gray-500">Loading Product Data...</div>;

  return (
    <div className="min-h-screen mt-26 bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-black mb-6">
          <FiArrowLeft /> Back to Dashboard
        </button>

        <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold">Edit Product: {formData.title}</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-bold">Product Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">Description</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2"
          >
            {saving ? "Updating..." : <><FiSave /> Update Product</>}
          </button>
        </form>
      </div>
    </div>
  );
}