"use client"
import Image from "next/image";
import { products } from "../../../lib/productsa";
import { LuPhoneCall } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";


export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-24 text-center text-slate-600">
        Product not found
      </div>
    );
  }

  // WhatsApp config
  const phoneNumber = "919954851207";
  const productUrl = `${window.location.origin}/products/${product.slug}`;
  const whatsappMessage = encodeURIComponent(
    `Hi sir, I want to buy this product:\n${product.title}\n${productUrl}`
  );

  return (
    <section className="py-26 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image Section */}
        <div className="relative">
          <div className="relative h-[420px] rounded-2xl overflow-hidden bg-white shadow-sm">
            <Image
              src={product.img}
              alt={product.title}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Floating badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium">
              Installation Free
            </span>
            <span className="rounded-full bg-green-50 text-green-600 px-3 py-1 text-xs font-medium">
              Home Delivery
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-slate-900">
            {product.title}
          </h1>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              Product Features
            </h3>

            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700">
                  <CiCircleCheck className="mt-0.5 h-5 w-5 text-green-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {/* Call */}
            <a
              href="tel:+919954851207"
              className="group flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-900"
            >
              <LuPhoneCall className="text-lg transition group-hover:rotate-6" />
              Call Now
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-full border border-green-500 px-6 py-3 text-sm font-medium text-green-600 transition hover:bg-green-600 hover:text-white"
            >
              <FaWhatsapp className="text-lg transition group-hover:scale-110" />
              WhatsApp
            </a>
          </div>

          {/* Trust Text */}
          <p className="mt-4 text-xs text-slate-500">
            ✔ Trusted by 500+ customers • ✔ Quality assured • ✔ Fast installation
          </p>
        </div>
      </div>
    </section>
  );
}
