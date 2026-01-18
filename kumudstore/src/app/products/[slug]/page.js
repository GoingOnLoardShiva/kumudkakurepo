import Image from "next/image";
import { LuPhoneCall } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }) {
  const { slug } = await params;

  // 1. Fetch data from your API route
  // Note: Using absolute URL for server-side fetching in Next.js
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/getproduct/${slug}`, {
    cache: 'no-store' // Ensures you get fresh data if you edit it in admin
  });

  if (!res.ok) {
    return notFound(); // Shows the default Next.js 404 page
  }

  const product = await res.json();

  // 2. Parse features (handle if it's a string or array)
  const featuresList = typeof product.features === 'string' 
    ? JSON.parse(product.features) 
    : product.features || [];

  // WhatsApp config
  const phoneNumber = "919954851207";
  const productUrl = `https://mkframework.shop/products/${product.slug}`;
  const whatsappMessage = encodeURIComponent(
    `Hi sir, I want to buy this product:\n*${product.productName || product.title}*\n${productUrl}`
  );

  return (
    <section className="py-26 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image Section */}
        <div className="relative">
          <div className="relative h-[420px] rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
            <Image
              src={product.img || "/placeholder.jpg"}
              alt={product.productName || product.title}
              fill
              priority
              unoptimized // Added to fix the Private IP issue we discussed
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Dynamic Badges from Database */}
          <div className="absolute top-4 left-4 flex gap-2">
            {product.freeInstallation && (
              <span className="rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-bold shadow-sm border border-blue-100">
                Installation Free
              </span>
            )}
            {product.homeDelivery && (
              <span className="rounded-full bg-green-50 text-green-600 px-3 py-1 text-xs font-bold shadow-sm border border-green-100">
                Home Delivery
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            {product.productName || product.title}
          </h1>

          <p className="mt-6 text-slate-600 leading-relaxed text-lg">
            {product.description}
          </p>

          {/* Features */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-indigo-600 rounded-full inline-block"></span>
              Key Specifications
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {featuresList.map((f, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <CiCircleCheck className="mt-1 h-5 w-5 text-green-600 shrink-0" />
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919954851207"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-800 shadow-lg active:scale-95"
            >
              <LuPhoneCall className="text-lg transition group-hover:rotate-12" />
              Call Now
            </a>

            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-green-500 px-8 py-4 text-sm font-bold text-green-600 transition hover:bg-green-600 hover:text-white shadow-sm active:scale-95"
            >
              <FaWhatsapp className="text-xl" />
              WhatsApp Inquiry
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              Available and ready for installation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}