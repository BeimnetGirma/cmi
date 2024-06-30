import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar";
import { dir } from "i18next";
import { languages } from "./i18n/settings";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethiopian Construction Project Management Institute",
  description: "Institute for Construction Project Management in Ethiopia",
};

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}
export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  };
}>) {
  return (
    <ClerkProvider>
      <html lang={lng}>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
