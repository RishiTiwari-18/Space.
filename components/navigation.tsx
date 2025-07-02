"use client";

import Link from "next/link";
import React from "react";
import { Palette, Telescope } from "lucide-react";
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
  // { href: "/aihelper", text: "Ai Helper" },
  { href: "/wellness", text: "Wellness" },
  { href: "/study", text: "Study" },
  { href: "/journal", text: "Journal" },
  { href: "/draw", text: "Draw"}
];



export default function Navigation() {

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
      </div>
    </div>
  );
}
