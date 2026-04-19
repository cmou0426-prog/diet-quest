import type { Metadata } from "next";
import { Press_Start_2P, VT323, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const retroFont = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DietQuest | Modern 16-Bit RPG Nutrition",
  description: "Level up your health with DietQuest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${pixelFont.variable} ${retroFont.variable} ${inter.variable} font-inter min-h-screen flex flex-col selection:bg-health/30`}
      >
        <main className="mx-auto w-full max-w-lg min-h-screen flex flex-col p-4 md:p-6 pb-40">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
