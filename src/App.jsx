import { useState } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import RequestForm from "./components/RequestForm";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 grid place-items-center font-bold">C</div>
            <span className="font-semibold">Caring Hands</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#services" className="text-white/80 hover:text-white">Services</a>
            <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Request Care</button>
          </div>
        </div>
      </header>

      <Hero onOpenForm={() => setOpen(true)} />
      <Services />

      <footer className="mt-12 py-10 text-center text-white/60">
        <p>© {new Date().getFullYear()} Caring Hands. All rights reserved.</p>
      </footer>

      <RequestForm open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default App