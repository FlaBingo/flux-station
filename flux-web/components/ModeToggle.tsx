"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // Assumes you ran 'npx shadcn-ui@latest add button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-slate-900/50 border-slate-800 hover:bg-slate-800"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (<Moon />) : (<Sun />)}
    </Button>
  );
}
