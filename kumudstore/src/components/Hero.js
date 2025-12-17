import Image from "next/image";

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

          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Best Cement Boundary Wall
          </h1>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Crafted designs for home entrances, boundary walls, and decorative
            chokhats — responsive, durable, and fully custom made.
          </p>

          <div className="mt-6 flex gap-3 items-center flex md:justify-center">
            <a
              href="#products"
              className="rounded-full bg-slate-900 px-5 py-3 text-white"
            >
              View Designs
            </a>
            <a
              href="#contact"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
