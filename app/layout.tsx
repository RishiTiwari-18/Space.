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

  // const ambientSoundsData = [
  //   { name: 'Rain', src: '/audio/rain.mp3', icon: CloudRain },
  //   { name: 'Fire', src: '/audio/fire.mp3', icon: Flame },
  //   { name: 'Forest', src: '/audio/forest.mp3', icon: Trees },
  //   { name: 'Waves', src: '/audio/waves.mp3', icon: Waves },
  //   { name: 'Thunder', src: '/audio/thunder.mp3', icon: CloudLightning }, 
  //   { name: 'River', src: '/audio/river.mp3', icon: Wind },
  //   { name: 'Birds', src: '/audio/birds.mp3', icon: Bird }, 
  // ];

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
          {/* Fixed background component */}
          <div className="fixed inset-0 z-0">
            <BackgroundPaths />
          </div>
          {/* Content wrapper */}
          <div className="relative z-10">
            <Navigation />
            {children}
          </div>
          {/* <div className="fixed bottom-4 right-4 z-50">
            <Card className="">  
              <CardContent className=" flex gap-3">
                {ambientSoundsData.map((item, index) => (
                <Button key={index} variant="outline" size="icon" > <item.icon size={20}/></Button>
                ))}
              </CardContent>
            </Card>
          </div> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
