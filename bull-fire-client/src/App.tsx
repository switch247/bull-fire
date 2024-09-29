/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useQueueStore } from "./store/queueStore";
import Header from "./components/Header";
import QueueCard from "./components/QueueCard";
import AddJobCard from "./components/AddJobCard";

export default function App() {
  const { stats, loading, error, fetchStats, addJob } = useQueueStore();
  const [payload, setPayload] = useState("");
  const [queue, setQueue] = useState("Email");

  useEffect(() => {
    fetchStats();
    const i = setInterval(fetchStats, 4000);
    return () => clearInterval(i);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob(queue, payload);
    setPayload("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 text-white overflow-x-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <Header />
      </div>

      <div className="mx-auto p-6 pb-20">
        {error && (
          <div className="mb-8 p-6 bg-red-900/60 backdrop-blur-lg border border-red-500/50 rounded-2xl flex items-center gap-4 shadow-2xl">
            <svg
              className="w-8 h-8 text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="text-lg">{error}</span>
          </div>
        )}

        {/* Queue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stats &&
            Object.entries(stats.queues || {}).map(([name, q]: any) => (
              <QueueCard key={name} name={name} data={q} />
            ))}
        </div>

        {/* Add Job Card */}
        <div className="max-w-2xl mx-auto">
          <AddJobCard
            payload={payload}
            setPayload={setPayload}
            queue={queue}
            setQueue={setQueue}
            stats={stats}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-16">
          <button
            onClick={fetchStats}
            className="inline-flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 12a9 9 0 1 1-3-6.7" />
            </svg>
            Auto-refresh {loading ? "..." : "4s"}
          </button>
          <p className="mt-4 text-xs opacity-50">
            <a href="/ui" className="underline hover:text-purple-400">
              Raw Bull Board
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
