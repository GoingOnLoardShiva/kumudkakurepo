"use client";
import React from "react";

const stats = [
  { value: "350+", label: "Projects Completed" },
  { value: "120+", label: "Compound Walls Built" },
  { value: "200+", label: "Chokhat Installations" },
  { value: "15+", label: "Years of Experience" },
];

const videos = [
  {
    title: "Modern Compound Wall Installation",
    location: "Ahmedabad",
    embedId: "ImaTuIX8rUQ",
  },
  {
    title: "Designer Chokhat Project",
    location: "Surat",
    embedId: "oSpujkDfY6U",
  },
  {
    title: "Boundary Wall Construction",
    location: "Vadodara",
    embedId: "FfKvop0hV0o",
  },
];

export default function WorkShowcase() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="max-w-2xl text-left md:text-center mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Work in Action
          </h2>
          <p className="mt-4 text-slate-600">
            A proven track record of completed projects delivered with quality,
            precision, and trust.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-50 p-6 text-center shadow-sm"
            >
              <h3 className="text-3xl font-bold text-slate-900">
                {item.value}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
        {/* VIDEO SHOWCASE */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              <div className="p-5">
                <h4 className="font-semibold text-slate-900">{video.title}</h4>
                <p className="mt-1 text-sm text-slate-500">{video.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-left md:text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            Want to See Your Compuend Wall Here?
          </h3>
          <p className="mt-3 text-slate-600">
            Let’s build something strong, durable, and beautiful together.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Place Your Wall
          </a>
        </div>
      </div>
    </section>
  );
}
