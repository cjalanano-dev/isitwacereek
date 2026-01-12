import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Race Week Hub | Is It Race Week?",
  description: "Your F1 dashboard to check if it's race week. Countdown timers, session schedules, weather forecasts, and track information.",
  keywords: ["F1", "Formula 1", "Race Week", "Grand Prix", "Countdown", "Schedule"],
  openGraph: {
    title: "Race Week Hub | Is It Race Week?",
    description: "Your F1 dashboard to check if it's race week.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

