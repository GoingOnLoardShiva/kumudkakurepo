import Link from "next/link";
import Image from "next/image";
import { products } from "../../lib/products";

export default function ProductsPage() {
  return (
    <section className="py-26">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <p className="mt-2 text-slate-600">Explore our boundary walls, chokhats, and entrance solutions.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="block rounded-lg border bg-white p-3 shadow-sm hover:shadow-md">
              <div className="relative h-36 w-full rounded-md bg-slate-50">
                <Image src={p.img} alt={p.title} fill sizes="(max-width: 640px) 100vw, 240px" className="object-cover rounded-md" />
              </div>
              <h3 className="mt-3 text-sm font-medium text-slate-900">{p.title}</h3>
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
