import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Architects_Daughter } from "next/font/google";
import Navigation from "@/components/navigation/navigation";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { PomodoroProvider } from "@/contexts/PomodoroContext";
import { AmbientProvider } from "@/contexts/AmbientContext";

const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architects-daughter",
});

export const metadata: Metadata = {
  title: "Space.",
  description:
    "Space: A quiet environment designed for deep focus, study, and productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${architectsDaughter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AmbientProvider>
          <PomodoroProvider>
          <div className="fixed inset-0 z-0">
            <BackgroundPaths />
          </div>
          <div className="relative z-10">
            <Navigation />
            {children}
          </div>
          </PomodoroProvider>
          </AmbientProvider>  
        </ThemeProvider>
      </body>
    </html>
  );
}
