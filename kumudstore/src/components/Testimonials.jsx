"use client";
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    name: "Rajesh Patel",
    role: "Home Owner",
    location: "Ahmedabad",
    message:
      "The chokhat design quality exceeded our expectations. Strong material, perfect finishing, and timely delivery. Highly recommended.",
    image: "/images/client1.jpg",
  },
  {
    name: "Sunita Mehta",
    role: "Architect",
    location: "Surat",
    message:
      "Their compound wall panels are well-crafted and easy to install. The design precision and material quality are excellent.",
    image: "/images/client2.jpg",
  },
  {
    name: "Amit Shah",
    role: "Builder",
    location: "Vadodara",
    message:
      "We have used their boundary wall designs for multiple projects. Reliable service and consistent quality every time.",
    image: "/images/client3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl text-left md:text-center mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-slate-600">
            Trusted by homeowners, architects, and builders across the region.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              {/* Quote icon */}
              <span className="absolute right-6 top-6 text-4xl text-slate-200">
                “
              </span>

              {/* Message */}
              <p className="text-slate-600 leading-relaxed">
                {item.message}
              </p>

              {/* Client Info */}
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {item.role} • {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
