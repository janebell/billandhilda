import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics /> {/* enables pageviews + custom events */}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Bill & Hilda Quiz",
  description: "A playful self-check on your leadership energy.",
};


