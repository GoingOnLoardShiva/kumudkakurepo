import Link from "next/link";
import Image from "next/image";
import { products } from "../../lib/products";

export default function ProductsPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-3xl font-bold">Our Designs</h1>
        <p className="mt-2 text-slate-600">Explore our boundary walls, chokhats, and entrance solutions.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="block rounded-lg border bg-white p-3 shadow-sm hover:shadow-md">
              <div className="relative h-36 w-full rounded-md bg-slate-50">
                <Image src={p.img} alt={p.title} fill sizes="(max-width: 640px) 100vw, 240px" className="object-cover rounded-md" />
              </div>
              <h3 className="mt-3 text-sm font-medium text-slate-900">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600">${p.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
