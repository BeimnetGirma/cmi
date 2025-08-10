import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageProps } from "@/types";
import { useTranslation } from "@/app/i18n";
import { FeaturedPosts, Post } from "@/types/featured-posts";
import Carousel from "@/components/ui/carousel";
import prisma from "@/db";
import ServiceGrid from "@/components/ui/service-grid";
import StatsCard from "@/components/ui/stats-card";
import { FaUsers, FaProjectDiagram, FaFileAlt } from "react-icons/fa";

export const dynamic = "force-dynamic";

const Home: React.FC<HomePageProps> = async ({ params }) => {
  const { lng = "en" } = params;

  const { t } = await useTranslation(lng, "translation");
  const filter = `featured:true+tag:'lng-${lng}'`;

  await prisma.visitorCount.upsert({
    where: { id: 1 },
    update: { count: { increment: 1 } },
    create: { id: 1, count: 1 },
  });

  const visitors_stat = await prisma.visitorCount.findUnique({ where: { id: 1 } });
  const projects_stat = 18;
  const documents_stat = 12;

  const featuredPosts = await fetch(
    `${process.env.NEXT_PUBLIC_GHOST_URL}/ghost/api/v4/content/posts/?key=${process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY}&filter=${encodeURIComponent(
      filter
    )}&include=authors&limit=3`,
    {
      cache: "no-cache",
    }
  )
    .then((res) => {
      return res.json() as Promise<FeaturedPosts>;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  return (
    <>
      {!!featuredPosts?.posts?.length && <Carousel posts={featuredPosts} />}
      <div className="w-[80vw] max-w-[80vw] mx-auto space-y-20">
        {/* Hero */}

        {/* <div className="text-center font-bold text-2xl">
            ECMI - Deploy to test
          </div> */}
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center mt-20">
          <Image src="/assets/imgs/1-no-bg.png" className="rounded-lg" alt="Hero Image" width={700} height={500} />
          <div className="flex flex-col pl-8 items-end justify-center ">
            <h2 className="text-4xl text-center text-primary-main font-bold  mb-5">{t("companyName")}</h2>
            <div className="text-slate-900 rounded-md mx-5 w-5/6">
              <p className="text-justify text-lg">{t("companyIntro")}</p>
              <div className="text-right">
                <button className="bg-primary-main hover:scale-105  rounded-md  duration-200 text-white px-4 py-2 mt-2">
                  <Link href={`${lng}/services`}>{t("viewServices")}</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image src="/assets/imgs/floor.png" alt="Floor" className="mt-5" width={1700} height={430} />
      </div>

      {/* About Us Section */}
      <div className="flex flex-row w-full mt-28 ">
        <Image src="/assets/imgs/left-wall.png" alt="Line Art" width={200} height={400} />
        <div className="flex-grow">
          <div className="container mx-auto flex flex-col lg:flex-row-reverse  items-center justify-center  mt-20 ">
            <Image src="/assets/imgs/5.jpg" alt="About Us Image" className="rounded-lg justify-end" width={700} height={430} />
            <div className="flex flex-col py-8 px-4 pr-8">
              <h3 className="text-xl font-bold mb-4 text-primary-main">{t("aboutUs")}</h3>

              <div className="w-3/4">
                <p className="text-justify text-lg mb-4">{t("aboutUsIntro")}</p>
                <div className="flex justify-end">
                  <button className="bg-primary-main hover:scale-105  rounded-md  duration-200 text-white px-4 py-2 mt-2">
                    <Link href={`${lng}/about`}>{t("readMore")}</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image src="/assets/imgs/right-wall.png" alt="Line Art" width={200} height={400} />
      </div>

      {/* Our Services */}
      <div className="w-[80vw] max-w-[80vw] mx-auto space-y-20">
        <ServiceGrid params={{ lng }} />
      </div>
      <div>
        <Image src="/assets/imgs/floor.png" alt="Floor" className="mt-5" width={1700} height={430} />
      </div>
      <div className="w-[70vw] max-w-[70vw] mx-auto space-y-20 mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatsCard params={{ lng }} title="Visitors" value={visitors_stat?.count || 0} icon={<FaUsers size={100} />} />
          <StatsCard params={{ lng }} title="Projects" value={projects_stat} icon={<FaProjectDiagram size={100} />} />
          <StatsCard params={{ lng }} title="Documents" value={documents_stat} icon={<FaFileAlt size={100} />} />
        </div>
      </div>
      <div>
        <Image src="/assets/imgs/floor.png" alt="Floor" className="mt-5" width={1700} height={430} />
      </div>
    </>
  );
};

export default Home;
