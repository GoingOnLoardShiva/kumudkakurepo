"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";
import { CiTimer } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";

export default function OwnerLocation() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="max-w-2xl text-left md:text-center mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Visit Our Workshop
          </h2>
          <p className="mt-4 text-slate-600">
            Our manufacturing and design work is carried out at our main
            location. Feel free to visit or contact us directly.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* MAP */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <iframe
              src="https://www.google.com/maps?q=26.545249,90.142425&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full"
            />
          </div>

          {/* CONTACT DETAILS */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">
              MK Frames Work
            </h3>
            <p className="mt-2 text-slate-600">
              Specialists in Chokhat, Compound Wall & Boundary Designs
            </p>

            {/* DETAILS */}
            <div className="mt-6 space-y-5 text-sm text-slate-700">
              <div className="flex gap-3">
                <CiLocationArrow1 className="mt-1 text-lg text-slate-500" />
                <p>
                  Pachim Kolobari<br />
                  Serfanguri, Assam – 783346
                </p>
              </div>

              <div className="flex gap-3">
                <LuPhoneCall className="mt-1 text-lg text-slate-500" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex gap-3">
                <MdAlternateEmail className="mt-1 text-lg text-slate-500" />
                <p>contact@kumuddesigns.com</p>
              </div>

              <div className="flex gap-3">
                <CiTimer className="mt-1 text-lg text-slate-500" />
                <p>
                  Monday – Saturday<br />
                  9:00 AM – 7:00 PM
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                <LuPhoneCall className="text-lg" />
                Call Now
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <FaWhatsapp className="text-lg text-green-600" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
