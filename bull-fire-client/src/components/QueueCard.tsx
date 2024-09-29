/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Stat from "./Stat";
import { Clock, Zap, Check, XCircle } from "lucide-react";

export default function QueueCard({ name, data }: { name: string; data: any }) {
  const counts = data?.counts || {};
  const repeatable = data?.repeatable || [];

  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 truncate">
          {name}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Stat
            icon={Clock}
            label="Waiting"
            value={counts.waiting ?? 0}
            color="from-yellow-400 to-orange-400"
          />
          <Stat
            icon={Zap}
            label="Active"
            value={counts.active ?? 0}
            color="from-blue-400 to-cyan-400"
          />
          <Stat
            icon={Check}
            label="Done"
            value={counts.completed ?? 0}
            color="from-green-400 to-emerald-400"
          />
          <Stat
            icon={XCircle}
            label="Failed"
            value={counts.failed ?? 0}
            color="from-red-400 to-rose-400"
          />
        </div>

        {repeatable[0] && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs opacity-70">Next Run</p>
            <p className="font-mono text-sm text-purple-300">
              {new Date(repeatable[0].next).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
