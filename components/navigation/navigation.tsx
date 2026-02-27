
import Link from "next/link";
import { Palette, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ThemeSelector } from "../theme-selector";
import MobileNav from "./mobile-nav";

const navLinks = [
  { href: "/", text: "Focus" },
  { href: "/tasks", text: "Tasks" },
  // { href: "/wellness", text: "Wellness" },
  // { href: "/study", text: "Study" },
  { href: "/journal", text: "Journal" },
  { href: "/draw", text: "Draw"}
];

export default function Navigation() {



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
          <MobileNav navLinks={navLinks} />
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
              <SheetTitle id="theme-selector-title">Customize Appearance</SheetTitle>
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
