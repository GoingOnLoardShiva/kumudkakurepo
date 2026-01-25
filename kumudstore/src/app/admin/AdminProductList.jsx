"use client";
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiEye, FiPackage } from "react-icons/fi";
import Link from "next/link";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET"
      }); // Ensure your GET api/products returns all
      const data = await res.json();
      // If your API returns { products: [...] } use data.products
      // If it returns the array directly, use data
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Loading Product Data...</p>
    </div>
  </div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiPackage /> Product Inventory
        </h1>
        {/* <Link href="/add" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Add  Product
        </Link> */}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Slug</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products?.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.img} alt="" className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                    <span className="font-medium text-gray-800">{product.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.slug}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-md" title="View">
                      <FiEye size={18} />
                    </button>
                    {/* Link to an edit page */}
                    <Link href={`/admin/edit/${product.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md" title="Edit">
                      <FiEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="p-10 text-center text-gray-400">No products found.</div>
        )}
      </div>
    </div>
  );
}