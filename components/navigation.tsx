"use client";

import Link from "next/link";
import React from "react";
import { useTheme } from "@/lib/use-theme";
import { Sun, Moon, Palette, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ThemeSelector } from "./theme-selector";

const navLinks = [
  { href: "/", text: "Focus" },
  { href: "/tasks", text: "Tasks" },
  { href: "/aihelper", text: "Ai Helper" },
  { href: "/wellness", text: "Wellness" },
  { href: "/study", text: "Study" },
  { href: "/journal", text: "Journal" },
];

// Define example color themes (replace with actual theme colors if available)
const colorThemes = [{}
  // {
  //   name: "Default",
  //   colors: ["#1c9cf0", "#000000", "#e7e9ea", "#061622"], // Example placeholder colors
  // },
  // {
  //   name: "Claude",
  //   colors: ["#d97757", "#1a1915", "#c3c0b6", "#30302e"],
  // },
  // {
  //   name: "Catppuccin",
  //   colors: ["#cba6f7", "#89dceb", "#585b70", "#1e1e2e"],
  // },
  // {
  //   name: "Amber",
  //   colors: ["#FFC107", "#FF9800", "#FF5722", "#FFF9C4"],
  // },
  // {
  //   name: "Minimal",
  //   colors: ["#212121", "#757575", "#BDBDBD", "#FAFAFA"],
  // },
  // {
  //   name: "Twitter",
  //   colors: ["#1DA1F2", "#14171A", "#657786", "#E1E8ED"],
  // },
];


export default function Navigation() {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="flex justify-between items-center h-16 px-10">
      <div>
        <h1 className="text-xl flex items-center gap-2">Space. <Telescope size={20} /></h1>
      </div>
      <div className="flex gap-10">
        {navLinks.map((link) => (
          <Link
            className="text-sm hover:text-accent-foreground duration-200"
            key={link.href}
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Palette className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Customize Appearance</SheetTitle>
              <SheetDescription>
                Choose your preferred colors and background
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 max-h-[calc(100vh-150px)] flex flex-col gap-6 overflow-y-auto px-4">
              <ThemeSelector />
            </div>
          </SheetContent>
        </Sheet>
        <Button variant="outline" size="icon" onClick={toggleMode} aria-label="Toggle theme mode">
          {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}
