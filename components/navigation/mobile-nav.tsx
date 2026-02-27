"use client";

import { useTheme } from "@/lib/use-theme";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface NavLink {
  href: string;
  text: string;
}

export default function MobileNav({navLinks} : { navLinks: NavLink[]}) {
  useTheme();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleMobileNavClick = (href: string) => () => {
    setOpen(false);
    router.push(href);
  };

  return (
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
                <SheetTitle id="mobile-nav-title">Menu</SheetTitle>
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
  );
}
