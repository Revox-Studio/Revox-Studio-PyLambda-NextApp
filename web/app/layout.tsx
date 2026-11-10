import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Momo_Signature } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const momoSignature = Momo_Signature({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-momo-signature',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PyLambda | Service testing, simplified",
  description:
    "Create your PyLambda account and get ready for a simpler service testing workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${momoSignature.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
