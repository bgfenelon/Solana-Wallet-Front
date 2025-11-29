import { create } from "zustand";

export interface ActivityItem {
  type: "deposit" | "withdraw";
  amount: number;
  signature: string;
  timestamp: number;
}

interface ActivityState {
  history: ActivityItem[];
  addActivity: (item: ActivityItem) => void;
}

export const useActivityStore = create<ActivityState>()((set) => ({
  history: [],

  addActivity: (item) =>
    set((state) => ({
      history: [item, ...state.history], // newest first
    })),
}));
