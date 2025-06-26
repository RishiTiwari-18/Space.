import { useState, useEffect } from "react";
import { themes, defaultTheme } from "./themes";

export type Theme = typeof themes[number];

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme and mode from localStorage on mount
  useEffect(() => {
    const savedThemeName = localStorage.getItem("color-theme");
    const savedMode = localStorage.getItem("color-mode");
    if (savedThemeName) {
      const theme = themes.find((t) => t.name === savedThemeName);
      if (theme) setCurrentTheme(theme);
    }
    if (savedMode === "dark" || savedMode === "light") {
      setMode(savedMode);
    }
    setIsLoaded(true);
  }, []);

  // Apply theme colors to CSS custom properties
  useEffect(() => {
    if (!isLoaded) return;
    const colors = mode === "dark" ? currentTheme.dark : currentTheme.light;
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
    localStorage.setItem("color-theme", currentTheme.name);
    localStorage.setItem("color-mode", mode);
  }, [currentTheme, mode, isLoaded]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const setThemeByName = (name: string) => {
    const theme = themes.find((t) => t.name === name);
    if (theme) setCurrentTheme(theme);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return {
    currentTheme,
    setTheme,
    setThemeByName,
    mode,
    setMode,
    toggleMode,
    themes,
    isLoaded,
  };
} 