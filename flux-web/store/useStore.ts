import { create } from "zustand";

interface TelemetryState {
  vibration: number;
  temperature: number;
  power: number;

  isConnected: boolean;
  lastUpdated: string | null;

  updateTelemetry: (data: Partial<TelemetryState>) => void;
  setConnection: (status: boolean) => void;
}

export const useStore = create<TelemetryState>((set) => ({
  vibration: 0,
  temperature: 0,
  power: 0,
  isConnected: false,
  lastUpdated: null,

  updateTelemetry: (data) => set((state) => ({
    ...state,
    ...data,
    lastUpdated: new Date().toLocaleTimeString()
  })),

  setConnection: (status) => set({ isConnected: status }),
}))