import Image from "next/image";
import { products } from "../../../lib/products";
import { LuPhoneCall } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-6xl px-6">Product not found</div>
      </div>
    );
  }

  // ✅ WhatsApp config
  const phoneNumber = "919876543210"; // change if needed
  const productUrl = `https://yourdomain.com/products/${product.slug}`;
  const whatsappMessage = encodeURIComponent(
    `Hi sir, I want to buy this ${product.title}\n${productUrl}`
  );

  return (
    <section className="py-26">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative h-80 w-full rounded-lg bg-slate-100">
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div> 
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-3 text-slate-600">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="text-slate-700">
                • {f}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            {/* Call */}
            <a
              href="tel:+919876543210"
              className="group flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-green-600 hover:text-white"
            >
              <LuPhoneCall className="text-lg text-green-600 transition group-hover:text-white" />
              Call Now
            </a>

            {/* WhatsApp with Message */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-black"
            >
              <FaWhatsapp className="text-green-600 transition group-hover:text-white" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
