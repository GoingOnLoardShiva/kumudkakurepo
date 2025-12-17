"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      {/* Centered Header */}
      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-full bg-white/20 backdrop-blur-md shadow-md border border-slate-200">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-md overflow-hidden bg-slate-100">
                <Image
                  src="/images/placeholder-boundary.svg"
                  alt="logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-slate-900">
                Kumud Designs
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/products" className="nav-link">Products</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <a
                href="#contact"
                className="ml-2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 transition"
              >
                Get a Quote
              </a>
            </nav>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden rounded-full p-2 hover:bg-slate-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Aligned to Header) */}
        {open && (
          <div className="absolute left-0 right-0 mt-3 rounded-2xl bg-white shadow-lg border border-slate-200 md:hidden">
            <div className="flex flex-col gap-4 px-6 py-4">
              <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link href="/about" onClick={() => setOpen(false)}>About</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white text-center"
              >
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
