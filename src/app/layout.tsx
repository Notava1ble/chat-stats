import type { Metadata } from "next";
import "./globals.css";
import { roboto, robotoMono } from "../lib/fonts";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Whatsapp Chat Statistics",
  description: "Analyze your WhatsApp chat data with ease.",
  icons: {
    icon: "/chat-stats/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
