import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import ClientSessionProvider from "./components/ClientSessionProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
  },
  title: {
    default: "MeetSync - Compare Calendly with Google Calendar",
    template: "%s | MeetSync",
  },
  description: "Find the perfect meeting time by comparing Calendly availability with your Google Calendar. Side-by-side view to easily spot overlapping free slots.",
  keywords: ["calendar", "scheduling", "Calendly", "Google Calendar", "meeting planner", "availability", "appointment scheduler"],
  authors: [{ name: "MeetSync" }],
  creator: "MeetSync",
  publisher: "MeetSync",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meetsync.prabalbanerjee.xyz",
    siteName: "MeetSync",
    title: "MeetSync - Compare Calendly with Google Calendar",
    description: "Find the perfect meeting time by comparing Calendly availability with your Google Calendar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetSync - Compare Calendly with Google Calendar",
    description: "Find the perfect meeting time by comparing Calendly availability with your Google Calendar.",
  },
  alternates: {
    canonical: "https://meetsync.prabalbanerjee.xyz",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          {children}
        </ClientSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
