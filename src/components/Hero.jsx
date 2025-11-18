import { useState } from "react";

export default function Hero({ onOpenForm }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.15),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Compassionate, reliable in‑home care for your loved ones
        </h1>
        <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
          From daily visits to overnight support, our vetted carers help with meals, personal care, cleaning, companionship and more — 24/7 when needed.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onOpenForm} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/30 transition">
            Request Care
          </button>
          <a href="#services" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}
