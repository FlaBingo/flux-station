"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { 
  Activity, 
  LayoutDashboard, 
  Settings, 
  Database, 
  Box,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";

export default function Navbar() {

  const { isConnected } = useStore();

  return (
    // Uses background variable and border variable from your CSS
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left: Branding & Core Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Uses your --primary color for the branding icon */}
            <div className="bg-primary p-1.5 rounded-lg group-hover:opacity-80 transition-opacity">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Flux<span className="text-primary underline decoration-2 underline-offset-4">Station</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Navlink href="/" icon={<LayoutDashboard size={16} />} label="Dashboard" active />
            <Navlink href="/assets" icon={<Box size={16} />} label="Digital Twins" />
            <Navlink href="/history" icon={<Database size={16} />} label="Data Logs" />
            <Navlink href="/settings" icon={<Settings size={16} />} label="Settings" />
          </div>
        </div>

        {/* Right: Status & Actions */}
        <div className="flex items-center gap-4">
          {/* Status Indicator: Uses a custom green that looks great on your OKLCH background */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isConnected ? "bg-blue-400" : "bg-yellow-400"} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? "bg-blue-500" : "bg-yellow-500"}`}></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Hub Connected
            </span>
          </div>

          {/* Vertical Divider using your border variable */}
          <div className="h-6 w-[1px] bg-border mx-2" />

          <ModeToggle />
          
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent hover:text-accent-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Navlink({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      // Uses muted-foreground and accent tokens for state changes
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:bg-accent hover:text-accent-foreground ${
        active 
          ? "text-primary bg-primary/10 font-semibold" 
          : "text-muted-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}