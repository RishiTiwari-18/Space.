import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Architects_Daughter } from "next/font/google";
import Navigation from "@/components/navigation";
import { BackgroundPaths } from "@/components/ui/background-paths";

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
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Fixed background component */}
          <div className="fixed inset-0 z-0">
            <BackgroundPaths />
          </div>
          {/* Content wrapper */}
          <div className="relative z-10">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
