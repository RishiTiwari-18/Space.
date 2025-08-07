"use client";

import Link from "next/link";
import { Palette, Telescope, Menu } from "lucide-react";
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
import { useTheme } from "@/lib/use-theme";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", text: "Focus" },
  { href: "/tasks", text: "Tasks" },
  // { href: "/wellness", text: "Wellness" },
  // { href: "/study", text: "Study" },
  { href: "/journal", text: "Journal" },
  { href: "/draw", text: "Draw"}
];

export default function Navigation() {
  useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleMobileNavClick = (href: string) => () => {
    setOpen(false);
    router.push(href);
  };

  return (
    <nav
      className="flex justify-between items-center h-16 px-4 md:px-10"
      aria-label="Main navigation"
    >
      <div>
        <Link href="/" aria-label="Space Logo" className="flex items-center gap-2">
          <h1 className="text-xl flex items-center gap-2">
            Space. <Telescope size={20} aria-hidden="true" />
          </h1>
        </Link>
      </div>
      {/* Desktop nav */}
      <ul className="max-md:hidden flex gap-10" role="menubar">
        {navLinks.map((link) => (
          <li key={link.href} role="none">
            <Link
              className="text-sm hover:text-accent-foreground duration-200"
              href={link.href}
              role="menuitem"
              aria-label={link.text}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {/* Mobile nav: show menu button on small screens */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open navigation menu"
                title="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 max-w-full"
              aria-label="Mobile navigation"
              role="menu"
            >
              <SheetHeader>
                <SheetTitle asChild>
                  <h2 id="mobile-nav-title">Menu</h2>
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-6 mt-6 px-4" aria-labelledby="mobile-nav-title">
                {navLinks.map((link) => (
                  <li key={link.href} role="none">
                    <button
                      className="text-xl font-medium hover:text-accent-foreground duration-200 text-left w-full"
                      role="menuitem"
                      aria-label={link.text}
                      onClick={handleMobileNavClick(link.href)}
                      tabIndex={0}
                      type="button"
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
        {/* Theme selector */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open theme selector"
              title="Customize appearance"
            >
              <Palette className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="max-md:w-full"
            aria-label="Theme selector section"
            role="region"
          >
            <SheetHeader>
              <SheetTitle asChild>
                <h2 id="theme-selector-title">Customize Appearance</h2>
              </SheetTitle>
              <SheetDescription id="theme-selector-desc">
                Choose your preferred colors and background
              </SheetDescription>
            </SheetHeader>
            <section
              className="mt-4 max-h-[calc(100vh-150px)] flex flex-col gap-6 overflow-y-auto px-4"
              aria-labelledby="theme-selector-title"
              aria-describedby="theme-selector-desc"
            >
              <ThemeSelector />
            </section>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
