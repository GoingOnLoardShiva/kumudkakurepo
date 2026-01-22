"use client";

import React from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";



export default function ContactPage() {
  return (
    <section className="bg-slate-50 py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-left md:text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-slate-600">
            Have a project in mind? Get in touch with us for compound wall,
            chokhat, and boundary wall designs.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* LEFT: CONTACT INFO */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              MK Frame Work
            </h2>
            <p className="mt-2 text-slate-600">
              Specialists in Chokhat & Compound Wall Works
            </p>

            <div className="mt-8 space-y-6 text-sm text-slate-700">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 text-lg text-slate-900" />
                <p>
                  Pachim Kolobari<br />
                  Serfanguri, Assam – 783346
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-lg text-slate-900" />
                <a href="tel:+919954851207" className="hover:underline">
                  +91 9954851207
                </a>
              </div>

              <div className="flex items-center gap-4">
                <MdEmail className="text-xl text-slate-900" />
                <a
                  href="mailto:contact@mkframework@gmail.com"
                  className="hover:underline"
                >
                  contact@mkframework@gmail.com
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+919954851207"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition"
              >
                <FaPhoneAlt />
                Call Now
              </a>

              <a
                href="https://wa.me/919954851207"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                <FaWhatsapp className="text-green-600" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Send Us a Message
            </h3>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
              />

              <textarea
                rows="4"
                placeholder="Tell us about your project"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=26.545249,90.142425&z=15&output=embed"
            className="h-[400px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
