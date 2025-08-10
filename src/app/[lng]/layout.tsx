import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/ui/navbar";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import "../globals.css";
import React from "react";
import Footer from "@/components/ui/footer";
import { ClerkProvider } from "@clerk/nextjs";
import prisma from "@/db";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethiopian Construction Project Management Institute",
  description: "Institute for Construction Project Management in Ethiopia",
  icons: ["/assets/imgs/logo.png"],
};

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  };
}>) {
  const { lng = "en" } = params;

  const executives = await prisma.executive.findMany({
    select: {
      departmentName: true,
      departmentName_am: true,
      id: true,
    },
  });
  async function getNavServices() {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        slug: true,
        translations: {
          where: { language: { in: ["en", "am"] } },
          select: {
            language: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return services.map((service) => {
      const title_am = service.translations.find((t) => t.language === "am")?.title || "";
      const title_en = service.translations.find((t) => t.language === "en")?.title || "";

      return {
        id: service.id,
        slug: service.slug,
        title_am,
        title_en,
      };
    });
  }
  const services = await getNavServices();
  const announcements = await prisma.announcement.findMany();
  const resourceTypes = await prisma.resourceType.findMany();

  return (
    <ClerkProvider>
      <html lang={lng} dir={dir(lng)}>
        <body className={inter.className}>
          <NavBar services={services} executives={executives} announcements={announcements} resourceTypes={resourceTypes} params={{ lng }} />
          <div className="min-h-screen">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  params: { lng },
                } as React.Attributes);
              }
              return child;
            })}
          </div>
          <Footer params={{ lng }} />
        </body>
      </html>
    </ClerkProvider>
  );
}
