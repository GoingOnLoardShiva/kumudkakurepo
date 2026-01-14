"use client";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState(["", "", "", ""]);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [freeInstallation, setFreeInstallation] = useState(false);
  const [imageFile, setImageFile] = useState(null); // selected file
  const [imagePreview, setImagePreview] = useState(null); // preview Base64

  // Auto-generate slug
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

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Preview image as Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("features", JSON.stringify(features.filter((f) => f !== "")));
    formData.append("homeDelivery", homeDelivery);
    formData.append("freeInstallation", freeInstallation);
    
    if (imageFile) {
      formData.append("img", imageFile); // Send the actual file
    }
  
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        // Note: Do NOT set 'Content-Type' header. 
        // The browser will automatically set it to 'multipart/form-data' with the boundary.
        body: formData, 
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert("Product added successfully!");
        // ... clear form logic ...
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };
  return (
    <div className="min-h-screen bg-transparent p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto space-y-6"
      >
        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={handleNameChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-semibold mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            required
          />
        </div>

        {/* Features */}
        <div>
          <label className="block font-semibold mb-2">Features</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <input
                key={i}
                type="text"
                value={f}
                onChange={(e) => handleFeatureChange(i, e.target.value)}
                placeholder={`Feature ${i + 1}`}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-48 h-48 object-cover rounded border"
            />
          )}
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={homeDelivery}
              onChange={() => setHomeDelivery(!homeDelivery)}
              className="w-5 h-5 accent-indigo-500"
            />
            Home Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={freeInstallation}
              onChange={() => setFreeInstallation(!freeInstallation)}
              className="w-5 h-5 accent-indigo-500"
            />
            Free Installation
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
