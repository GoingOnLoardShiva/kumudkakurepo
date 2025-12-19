"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const categories = [
  {
    title: "Chokhat (Caukhat)",
    desc: "Premium entrance chokhat designs with durability and elegance.",
    image: "/images/coukath.png",
  },
  {
    title: "Folding Compound Wall",
    desc: "Strong and stylish folding compound wall patterns for modern homes.",
    image: "/images/compound-wall.jpg",
  },
  {
    title: "Gate & Boundary Panels",
    desc: "Designer gate and boundary wall panels for all architectures.",
    image: "/images/gate-wall6.jpg",
  },
  {
    title: "Precast Concrete Ventilation Panels",
    desc: "Designer window panels for better ventilation and aesthetics.",
    image: "/images/window.jpg",
  },
];

export default function ProductCategory() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-left md:text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-4 text-slate-600">
            Explore our wide range of chokhat and compound wall designs —
            crafted for strength, beauty, and long-lasting performance.
          </p>
        </div>

        {/* Category Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
          {categories.map((item, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>

                <Link href="/products">
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-slate-700 group">
                    View Designs
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
