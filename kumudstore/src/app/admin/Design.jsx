"use client";
import React, { useState } from "react";

export default function Design() {
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState(["", "", "", ""]);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [freeInstallation, setFreeInstallation] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // New: Loading and Status states
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const handleNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
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

  const resetForm = () => {
    setProductName("");
    setSlug("");
    setDescription("");
    setFeatures(["", "", "", ""]);
    setHomeDelivery(false);
    setFreeInstallation(false);
    setImageFile(null);
    setImagePreview(null);
    // Reset file input manually
    document.getElementById("imageInput").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg({ type: "", text: "" });

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("features", JSON.stringify(features.filter((f) => f.trim() !== "")));
    formData.append("homeDelivery", homeDelivery);
    formData.append("freeInstallation", freeInstallation);
    if (imageFile) formData.append("img", imageFile);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.status === 201) {
        setStatusMsg({ type: "success", text: "Product added successfully!" });
        resetForm();
      } else {
        setStatusMsg({ type: "error", text: result.message || "Failed to add product." });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: "error", text: "Connection error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Add New Product</h1>
        <p className="text-gray-500 mb-8">Fill in the details below to add a product to the Supabase database.</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">

          {/* Status Message */}
          {statusMsg.text && (
            <div className={`p-4 rounded-lg text-sm font-medium ${statusMsg.type === "error" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
              {statusMsg.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={handleNameChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Slug (Auto-generated)</label>
              <input
                type="text"
                value={slug}
                readOnly
                className="w-full border border-gray-100 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Key Features</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <input
                  key={i}
                  type="text"
                  value={f}
                  onChange={(e) => handleFeatureChange(i, e.target.value)}
                  placeholder={`Feature ${i + 1}`}
                  className="w-full border border-gray-200 rounded-lg px-4 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Product Image</label>
            <div className="flex items-center gap-4">
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            {imagePreview && (
              <div className="mt-4 relative w-32 h-32">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl border border-gray-200" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6 py-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={homeDelivery}
                onChange={() => setHomeDelivery(!homeDelivery)}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">Home Delivery</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={freeInstallation}
                onChange={() => setFreeInstallation(!freeInstallation)}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">Free Installation</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Product...
              </>
            ) : (
              "Add Product to Store"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}