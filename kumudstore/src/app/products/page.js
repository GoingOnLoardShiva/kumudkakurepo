import Link from "next/link";
import Image from "next/image";
import { products } from "../../lib/productsa";
import { FaOpencart } from "react-icons/fa";

export default function ProductsPage() {
  return (
    <section className="py-26 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Our Products
          </h1>
          <p className="mt-3 text-slate-600">
            Explore our premium boundary walls, chokhats, and entrance solutions.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  {p.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-blue-600 text-xs px-2 py-1 border border-blue-200 bg-blue-50 rounded-full">
                    Installation Free
                  </span>
                  <span className="text-green-600 text-xs px-2 py-1 border border-green-200 bg-green-50 rounded-full">
                    Home Delivery
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="
                    mt-3 group/button flex items-center justify-center gap-2
                    w-full
                    bg-black text-white
                    py-2.5 rounded-full
                    text-sm font-medium
                    transition-all duration-300
                    hover:bg-gray-900
                    active:scale-95
                  "
                >
                  <FaOpencart
                    size={16}
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                  <span>Order Now</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import React from "react";
// import { FaClock, FaWhatsapp } from "react-icons/fa";

// export default function WaitingPage() {
//   return (
//     <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
//       <div className="mx-auto max-w-md text-center bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
//         {/* ICON */}
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
//           <FaClock className="text-2xl text-slate-700 animate-pulse" />
//         </div>

//         {/* TEXT */}
//         <h1 className="mt-6 text-2xl font-bold text-slate-900">
//           Page Under Construction
//         </h1>

//         <p className="mt-3 text-sm text-slate-600">
//           We’re working hard to bring you this page.
//           Please check back soon or contact us for immediate assistance.
//         </p>

//         {/* CTA */}
//         <div className="mt-6 flex flex-col gap-3">
//           <a
//             href="/"
//             className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition"
//           >
//             Go Back Home
//           </a>

//           <a
//             href="https://wa.me/919876543210"
//             target="_blank"
//             className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
//           >
//             <FaWhatsapp className="text-green-600" />
//             Contact on WhatsApp
//           </a>
//         </div>

//         {/* FOOTER */}
//         <p className="mt-6 text-xs text-slate-400">
//           © {new Date().getFullYear()} Mk Frame Work. All rights reserved.
//         </p>
//       </div>
//     </section>
//   );
// }
