"use client";
import Image from "next/image";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

export const metadata = {
  title: "About Us",
  description: "Learn about MK Frame Work's history and our commitment to quality chokhat solutions in Kokrajhar.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative bg-slate-50 py-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl text-left md:text-center mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Strength in Structure. Simplicity in Design.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              We manufacture high-quality chokhat, compound wall, and boundary
              products using durable, readymade frames. Our focus is on reliable
              construction and consistent design — we do not offer customized
              designs.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Image */}
          <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-sm sm:h-[420px]">
            <Image
              src="/images/constraction.jpg"
              alt="Our work"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-bold text-slate-900">Who We Are</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              With years of hands-on experience in architectural construction
              elements, we specialize in designing high-quality chokhat,
              compound wall panels, and boundary structures that elevate the
              appearance and security of your property.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our approach blends modern manufacturing techniques with
              traditional craftsmanship, ensuring every design is strong,
              precise, and visually striking.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl text-left md:text-center mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">
              What We Stand For
            </h2>
            <p className="mt-4 text-slate-600">
              Every product we create reflects our commitment to quality,
              reliability, and customer satisfaction.
            </p>
          </div>

          <div className="relative mt-12 grid gap-10 sm:grid-cols-2 place-items-center">
            {[
              {
                title: "Quality Materials",
                desc: "We use premium-grade materials for long-lasting performance.",
              },
              {
                title: "Expert Craftsmanship",
                desc: "Precision-built designs shaped by skilled professionals.",
              },
              {
                title: "Ready Products",
                desc: "Efficient manufacturing ensures timely delivery of standard designs.",
              },
              {
                title: "Trusted Service",
                desc: "Clear communication and dependable delivery every time.",
              },
            ].map((item, i) => (
              <div key={i} className="relative w-full max-w-sm">
                {/* RIGHT ARROW (Desktop: 1 → 2, 3 → 4) */}
                {(i === 0 || i === 2) && (
                  <span className="hidden sm:block absolute right-[-36px] top-1/2 h-[2px] w-8 bg-green-600">
                    <span className="absolute right-0 -top-[5px] h-3 w-3 rotate-45 border-t-2 border-r-2 border-green-600"></span>
                  </span>
                )}

                {/* DOWN ARROW (Desktop: 2 → 4) */}
                {/* {i === 1 && (
                  <span className="hidden sm:block absolute bottom-[-36px] left-1/2 h-8 w-[2px] bg-green-600">
                    <span className="absolute -bottom-1 -left-[5px] h-3 w-3 rotate-45 border-r-2 border-b-2 border-green-600"></span>
                  </span>
                )} */}

                {/* DOWN ARROW (Mobile: vertical flow) */}
                {i !== 3 && (
                  <span className="sm:hidden absolute bottom-[-36px] left-1/2 h-8 w-[2px] bg-green-600">
                    <span className="absolute -bottom-1 -left-[5px] h-3 w-3 rotate-45 border-r-2 border-b-2 border-green-600"></span>
                  </span>
                )}

                {/* CARD */}
                <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl text-left md:text-center mx-auto">
            <h2 className="text-3xl font-bold text-slate-900">Our Process</h2>
            <p className="mt-4 text-slate-600">
              From idea to installation — we keep everything simple and
              transparent.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
            {[
              "Requirement & Consultation",
              "Manufacturing & Quality Check",
              "Delivery & Installation",
            ].map((step, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-6 text-center"
              >
                <span className="text-sm font-semibold text-slate-500">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 text-lg font-medium text-slate-900">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-left md:text-center">
          <h2 className="text-3xl font-bold">
            Let’s Build Something Strong Together
          </h2>
          <p className="mt-4 text-slate-300">
            Get in touch with us to discuss your chokhat or compound wall design
            needs.
          </p>
          <a
            href="https://wa.me/919954851207"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100 transition"
          >
            <FaWhatsapp className="text-lg text-green-600" />
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
