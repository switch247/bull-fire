/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Send } from "lucide-react";

type Props = {
  payload: string;
  setPayload: (v: string) => void;
  queue: string;
  setQueue: (v: string) => void;
  stats: any;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export default function AddJobCard({
  payload,
  setPayload,
  queue,
  setQueue,
  stats,
  loading,
  onSubmit,
}: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        Fire a New Job
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter payload..."
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="w-full px-4 py-3 bg-transparent text-white placeholder:text-slate-400/80 border border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/40 transition text-lg"
          required
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
            className="flex-1 px-4 py-3 bg-transparent text-white placeholder:text-slate-400/80 border border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/40 appearance-none"
          >
            {stats &&
              Object.keys(stats.queues || {}).map((q: string) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            FIRE
          </button>
        </div>
      </form>
    </div>
  );
}
