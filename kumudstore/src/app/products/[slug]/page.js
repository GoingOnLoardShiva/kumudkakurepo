import Image from "next/image";
import { products } from "../../../lib/products";

export default function ProductDetail({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-6xl px-6">Product not found</div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative h-80 w-full rounded-lg bg-slate-100">
          <Image src={product.img} alt={product.title} fill className="object-cover rounded-lg" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-3 text-slate-600">{product.description}</p>
          <div className="mt-4 text-lg font-semibold">${product.price}</div>

          <ul className="mt-6 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="text-slate-700">• {f}</li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <a className="rounded-full bg-slate-900 px-5 py-3 text-white" href="#contact">Get a Quote</a>
            <a className="rounded-full border px-5 py-3" href="mailto:info@example.com">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}
