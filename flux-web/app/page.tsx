"use client";

import React from "react";
import { useTelemetry } from "@/hooks/useTelemetry";
import { useStore } from "@/store/useStore";
import DigitalTwin from "@/components/DigitalTwin";
import { 
  Activity, 
  Thermometer, 
  Zap, 
  AlertTriangle, 
  ShieldCheck, 
  Settings 
} from "lucide-react";

export default function DashboardPage() {
  const {isConnected} = useStore();
  
  // 1. Initialize the WebSocket connection [cite: 44, 69]
  useTelemetry();

  // 2. Connect the UI to your global state [cite: 40, 462]
  const vibration = useStore((state) => state.vibration) ?? 0;
  const temperature = useStore((state) => state.temperature) ?? 0;
  const power = useStore((state) => state.power) ?? 0;

  console.log(vibration, temperature, power)
  
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto transition-colors duration-300">
      
      {/* Page Header: Industrial Context [cite: 63, 64] */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Machine Overview</h2>
          <p className="text-muted-foreground text-sm">
            Monitoring Unit: <span className="font-mono font-medium text-primary">MTR-CONVEYOR-042</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            <ShieldCheck size={14} /> SYSTEM SECURE
          </div>
          <button className="p-2 hover:bg-accent rounded-full transition-colors">
            <Settings size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid [cite: 62] */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT: Live Metrics (Now Driven by useStore) [cite: 98, 590] */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Real-time Telemetry
          </h3>
          <StatCard 
            title="Vibration" 
            value={vibration.toFixed(2)} 
            unit="mm/s" 
            icon={<Activity className="text-blue-500" />} 
          />
          <StatCard 
            title="Surface Temp" 
            value={temperature.toFixed(1)} 
            unit="°C" 
            icon={<Thermometer className="text-orange-500" />} 
          />
          <StatCard 
            title="Power Draw" 
            value={power.toFixed(2)} 
            unit="kW" 
            icon={<Zap className="text-yellow-500" />} 
          />
        </div>

        {/* CENTER: The Digital Twin Container [cite: 24, 100] */}
        <div className="col-span-12 lg:col-span-6">
          <div className="relative group h-[600px] rounded-3xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="bg-background/80 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase font-bold border border-border shadow-sm flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                Live 3D View
              </span>
            </div>
            
            {/* The 3D Canvas reacts to the same store values  */}
            <div className="w-full h-full">
               <DigitalTwin />
            </div>

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-background/80 backdrop-blur p-1 rounded-xl border border-border shadow-lg">
                <button className="px-3 py-1.5 text-[10px] font-bold hover:bg-accent rounded-lg transition-colors">RESET CAMERA</button>
                <div className="w-[1px] bg-border my-1" />
                <button className="px-3 py-1.5 text-[10px] font-bold hover:bg-accent rounded-lg transition-colors">EXPAND VIEW</button>
            </div>
          </div>
        </div>

        {/* RIGHT: Status & Alerts (SaaS Business Logic) [cite: 101, 684] */}
        <div className="col-span-12 lg:col-span-3">
           <div className="p-6 rounded-3xl border border-border bg-card h-full">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <AlertTriangle size={14} /> Maintenance Log
              </h3>
              <div className="space-y-6">
                {/* Eventually, you can map() your alerts from the DB here [cite: 660] */}
                <TimelineItem status="success" msg="Bearing health check passed." time="Live" />
                <TimelineItem status="neutral" msg="Routine data sync with Neon DB." time="Stable" />
                <TimelineItem status={vibration > 0.8 ? "warning" : "success"} 
                              msg={vibration > 0.8 ? "High vibration detected!" : "Vibration within limits."} 
                              time="Real-time" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

// Reusable StatCard Component [cite: 590]
function StatCard({ title, value, unit, icon }: any) {
  return (
    <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{title}</span>
        <div className="p-2 rounded-lg bg-background border border-border group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight font-mono">{value}</span>
        <span className="text-muted-foreground text-xs font-medium">{unit}</span>
      </div>
    </div>
  );
}

// Reusable TimelineItem Component [cite: 684]
function TimelineItem({ status, msg, time }: any) {
  const color = status === "success" ? "bg-green-500" : status === "warning" ? "bg-orange-500" : "bg-primary";
  return (
    <div className="flex gap-4">
      <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${color}`} />
      <div className="space-y-1">
        <p className="text-xs font-medium leading-relaxed">{msg}</p>
        <p className="text-[10px] text-muted-foreground italic">{time}</p>
      </div>
    </div>
  );
}