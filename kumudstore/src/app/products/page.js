"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaOpencart } from "react-icons/fa";

// --- Skeleton Component for Loading State ---
const ProductSkeleton = () => (
  <div className="rounded-2xl bg-white shadow-sm overflow-hidden animate-pulse">
    <div className="h-44 w-full bg-slate-200" />
    <div className="p-4 space-y-3">
      <div className="h-5 w-3/4 bg-slate-200 rounded" />
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
      </div>
      <div className="h-10 w-full bg-slate-200 rounded-full mt-2" />
    </div>
  </div>
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Our Products
          </h1>
          <p className="mt-3 text-slate-600">
            Explore our premium boundary walls, chokhats, and entrance solutions.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Show 8 skeleton cards while loading
            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((p) => (
              <Link
                key={p.id || p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                {/* Ensure the parent div has 'relative' and a defined 'h-48' */}
                {/* 1. Parent MUST be relative and have a height like h-48 or h-64 */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover" // 2. This ensures the image fills the area without stretching
                    priority={true} // 3. Forces it to load immediately for testing
                  />
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-grow gap-3">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
                    {p.title || p.productName}
                  </h3>

                  {/* Dynamic Tags - Only show if true */}
                  <div className="flex flex-wrap gap-2 min-h-[28px]">
                    {p.freeInstallation && (
                      <span className="text-blue-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 border border-blue-100 bg-blue-50 rounded-md">
                        Free Installation
                      </span>
                    )}
                    {p.homeDelivery && (
                      <span className="text-green-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 border border-green-100 bg-green-50 rounded-md">
                        Delivery Available
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-2">
                    <div className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold transition-all group-hover:bg-green-600">
                      <FaOpencart size={18} />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Empty State
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}