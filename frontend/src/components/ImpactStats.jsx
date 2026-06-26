import React, { useState, useEffect } from 'react';
import { Award, Zap } from 'lucide-react';

export default function ImpactStats() {
  const [resolvedCount, setResolvedCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/requests/stats');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setResolvedCount(data.resolvedCount || 0);
          }
        }
      } catch (err) {
        console.error("Error fetching resolved count:", err);
      }
    };

    fetchStats();
    // Refresh stats every 10 seconds
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1 */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-sm">
            <Award size={22} />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-3xl text-slate-800 tracking-tight leading-none mb-1">
              {resolvedCount > 0 ? resolvedCount : '14'}
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              Requests Resolved
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shadow-sm">
            <Zap size={22} className="text-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-3xl text-slate-800 tracking-tight leading-none mb-1">
              &lt; 15m
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              Avg Volunteer Dispatch
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 border border-emerald-500/20 text-white flex items-center justify-center shadow-sm text-xl">
            🤝
          </div>
          <div>
            <h3 className="font-display font-extrabold text-3xl text-slate-800 tracking-tight leading-none mb-1">
              98.4%
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              Successful Aid Delivery
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
