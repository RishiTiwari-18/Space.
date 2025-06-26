"use client";
import React from "react";
import { useTheme } from "@/lib/use-theme";
import { Sun, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeSelector({ onThemeSelect }: { onThemeSelect?: () => void }) {
  const { themes, currentTheme, setThemeByName, mode, toggleMode } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Theme Mode</span>
        <Button variant="outline" size="icon" onClick={toggleMode} aria-label="Toggle theme mode">
          {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {themes.map((theme) => {
          const isSelected = currentTheme.name === theme.name;
          const colors = mode === "dark" ? theme.dark : theme.light;
          return (
            <button
              key={theme.name}
              onClick={() => {
                setThemeByName(theme.name);
                onThemeSelect?.();
              }}
              className={`relative flex items-center gap-4 p-6 rounded-lg border transition-all duration-200 hover:border-primary/50 hover:bg-accent/50 ${isSelected ? "border-primary bg-accent/80" : "border-border bg-card"}`}
            >
              <div className="flex gap-1.5">
                {theme.preview.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-sm "
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              <span className="font-medium text-foreground">{theme.name}</span>
              {isSelected && (
                <div className="ml-auto">
                  <Check className="h-5 w-5 text-primary" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
} 