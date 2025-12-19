import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center py-16 sm:py-0"
      style={{ backgroundImage: 'url("/images/bgwall.webp")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:min-h-[80vh] lg:flex lg:items-center">
        <div className="max-w-xxl text-left md:text-center mx-auto">
          {/* 👆 text-left by default, md+ center */}
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl text-left lg:text-center">
            Best Folding Wall & Chokhat Solutions in{" "}
            <span className="mt-2 flex flex-col items-start gap-2 text-green-600 lg:mt-3 lg:flex-row lg:items-center lg:justify-center">
              MK Frame Work
              <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white sm:text-lg">
                Kokrajhar District
              </span>
            </span>
          </h1>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Crafted designs for home entrances, boundary walls, and decorative
            chokhats
          </p>

          <div className="mt-6 flex gap-3 items-center flex md:justify-center">
            <a
              href="#products"
              className="rounded-full bg-slate-900 px-5 py-3 text-white"
            >
              View Designs
            </a>
            <a
              href="tel:+9199548 51207"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-full border border-green-600 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-green-600 hover:text-white"
            >
              <LuPhoneCall className="text-lg text-green-600 transition group-hover:text-white" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
