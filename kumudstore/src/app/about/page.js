"use client";
import Image from "next/image";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl text-left md:text-center mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Building Strength. Crafting Design.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              We design and manufacture premium chokhat, compound wall, and
              boundary solutions that combine durability with architectural
              elegance.
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                title: "Custom Solutions",
                desc: "Designs tailored exactly to your property and preferences.",
              },
              {
                title: "Trusted Service",
                desc: "Clear communication and dependable delivery every time.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Requirement & Consultation",
              "Design & Customization",
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
            href="https://wa.me/919876543210"
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
