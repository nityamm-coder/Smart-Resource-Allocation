import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-emerald-900/5 py-4 transition-all shadow-[0_2px_20px_rgba(45,90,39,0.03)]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="index.html" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center text-xl shadow-[0_0_10px_rgba(16,185,129,0.05)] group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-300">
            <span>🌱</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-slate-800 leading-none">
              Smart Resource
            </span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none mt-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Allocation Portal
            </span>
          </div>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="dashboard.html"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all duration-300 shadow-sm"
          >
            <LayoutDashboard size={15} className="text-emerald-600" />
            <span className="hidden sm:inline">NGO Dashboard</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
