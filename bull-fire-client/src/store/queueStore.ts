// src/store/queueStore.ts
import { create } from "zustand";
import axios from "../lib/axios";

interface QueueStats {
  timestamp: string;
  queues: Record<string, any>;
}

interface QueueStore {
  stats: QueueStats | null;
  loading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
  addJob: (queue: string, email: string) => Promise<void>;
}

export const useQueueStore = create<QueueStore>((set) => ({
  stats: null,
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const data = await axios.get("/queue/stats");
      set({ stats: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addJob: async (queue: string, email: string) => {
    await axios.get("/jobs/add", { params: { queue, to: email } });
    // Auto-refresh
    useQueueStore.getState().fetchStats();
  },
}));
