"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiSave, FiUploadCloud, FiCheckCircle } from "react-icons/fi";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  // --- State Management ---
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState(["", "", "", ""]);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [freeInstallation, setFreeInstallation] = useState(false);
  
  // Image handling
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // Status handling
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  // --- 1. Fetch Product Data on Load ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (res.ok) {
          // Sync all basic fields
          setProductName(data.productName || data.title || "");
          setSlug(data.slug || "");
          setDescription(data.description || "");
          setHomeDelivery(data.homeDelivery || false);
          setFreeInstallation(data.freeInstallation || false);
          setCurrentImageUrl(data.img || "");

          // --- IMPORTANT: Solving the Features Detail issue ---
          let rawFeatures = data.features;
          
          // If database returns a JSON string, parse it into an array
          if (typeof rawFeatures === "string") {
            try {
              rawFeatures = JSON.parse(rawFeatures);
            } catch (e) {
              rawFeatures = [];
            }
          }

          // Ensure we have an array and pad it to exactly 4 slots for the UI
          const finalFeatures = Array.isArray(rawFeatures) ? rawFeatures : [];
          const padded = [...finalFeatures, "", "", "", ""].slice(0, 4);
          setFeatures(padded);
        }
      } catch (err) {
        setStatusMsg({ type: "error", text: "Failed to connect to server." });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // --- 2. Input Handlers ---
  const handleNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);
    setSlug(value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // --- 3. Save Changes ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("slug", slug);
    formData.append("description", description);
    // Filter out empty features before saving
    formData.append("features", JSON.stringify(features.filter((f) => f.trim() !== "")));
    formData.append("homeDelivery", homeDelivery);
    formData.append("freeInstallation", freeInstallation);
    
    if (imageFile) {
      formData.append("img", imageFile);
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        setStatusMsg({ type: "success", text: "Product updated successfully!" });
        // Optional: redirect after success
        setTimeout(() => router.push("/admin"), 2000);
      } else {
        const error = await res.json();
        setStatusMsg({ type: "error", text: error.message || "Update failed." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error. Try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading Product Data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 font-medium transition"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Edit Product</h1>
          <p className="text-gray-500 mt-2">Modify the details of <span className="text-indigo-600">{productName}</span></p>
        </div>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              
              {statusMsg.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${statusMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {statusMsg.type === "success" && <FiCheckCircle />}
                  <span className="text-sm font-semibold">{statusMsg.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={handleNameChange}
                    className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    readOnly
                    className="w-full bg-gray-50 border-gray-100 border rounded-xl px-4 py-3 text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Key Features</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <input
                      key={i}
                      type="text"
                      value={f || ""}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                      placeholder={`Feature ${i + 1}`}
                      className="w-full border-gray-200 border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Image & Actions) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-4">Product Image</label>
              
              <div className="relative group overflow-hidden rounded-2xl aspect-square bg-gray-50 border border-gray-100 mb-4">
                <img 
                  src={imagePreview || currentImageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                  <FiUploadCloud size={24} />
                  <span className="text-xs font-bold mt-2">Change Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={homeDelivery}
                    onChange={() => setHomeDelivery(!homeDelivery)}
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-bold text-gray-700">Home Delivery</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={freeInstallation}
                    onChange={() => setFreeInstallation(!freeInstallation)}
                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-bold text-gray-700">Free Installation</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all ${
                saving ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95"
              }`}
            >
              {saving ? "Saving Changes..." : <><FiSave /> Update Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}