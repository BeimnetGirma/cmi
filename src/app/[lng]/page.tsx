import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageProps } from "@/types";
// import { useTranslation } from "@/app/i18n";
import { FeaturedPosts, Post } from "@/types/featured-posts";
import Carousel from "@/components/ui/carousel";
import prisma from "@/db";
import ServiceGrid from "@/components/ui/service-grid";
import StatsCard from "@/components/ui/stats-card";
import { FaUsers, FaProjectDiagram, FaFileAlt, FaEye, FaCertificate, FaCubes, FaSearch } from "react-icons/fa";

export const dynamic = "force-dynamic";

const Home: React.FC<HomePageProps> = async ({ params }) => {
  const { lng = "en" } = params;

  // const { t } = await useTranslation(lng, "translation");
  const filter = `featured:true+tag:'lng-${lng}'`;

  await prisma.visitorCount.upsert({
    where: { id: 1 },
    update: { count: { increment: 1 } },
    create: { id: 1, count: 1 },
  });
  const events = await prisma.event.findMany({
    where: {
      endDate: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      title_en: true,
      title_am: true,
      banner_en: true,
      banner_am: true,
      link: true,
    },
  });

  // prisma query
  const translations = await prisma.translation.findMany({
    where: { language: lng },
  });

  const dict: Record<string, string> = Object.fromEntries(translations.map((t) => [t.key, t.value as string]));
  function createTranslator(dict: Record<string, string>) {
    return (key: string) => dict[key] || key;
  }

  const t = createTranslator(dict);

  const visitors_stat = await prisma.visitorCount.findUnique({ where: { id: 1 } });
  const traineeCount = await prisma.traineeCount.findUnique({ where: { id: 1 } });
  const pmpCount = await prisma.pMPCount.findUnique({ where: { id: 1 } });
  const bIMCount = await prisma.bIMCount.findUnique({ where: { id: 1 } });
  const researchCount = await prisma.researchCount.findUnique({ where: { id: 1 } });

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

      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-10 lg:mt-20">
          <Image src="/assets/imgs/1-no-bg.png" className="rounded-lg w-full max-w-lg h-auto" alt="Hero Image" width={700} height={500} />
          <div className="flex flex-col lg:pl-8 items-center lg:items-end justify-center text-center lg:text-right">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary-main font-bold mb-5">{t("companyName")}</h2>
            <div className="text-slate-900 rounded-md lg:mx-5 lg:w-5/6">
              <p className="text-justify text-base sm:text-lg">{t("companyIntro")}</p>
              <div className="mt-4">
                <Link href={`${lng}/services`} className="bg-primary-main hover:scale-105 rounded-md duration-200 text-white px-4 py-2 inline-block">
                  {t("viewServices")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Image */}
      <div className="w-full overflow-hidden">
        <Image src="/assets/imgs/floor.png" alt="Floor" className="mt-5 w-full h-auto" width={1700} height={430} />
      </div>

      {/* About Us Section */}
      <div className="flex flex-col lg:flex-row w-full mt-10 lg:mt-16">
        <Image src="/assets/imgs/left-wall.png" className="hidden lg:block " alt="Line Art" width={200} height={400} />

        <div className="flex-grow flex items-center justify-center">
          <div className="container mx-2 flex flex-col aboutbreak:flex-row-reverse items-center justify-center gap-8 px-0 sm:px-6 aboutbreak:px-8 mt-10 aboutbreak:mt-20">
            <Image src="/assets/imgs/5.jpg" alt="About Us Image" className="rounded-lg w-full max-w-lg h-auto" width={700} height={430} />
            <div className="flex flex-col py-4 aboutbreak:py-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-primary-main">{t("aboutUs")}</h3>
              <div className="aboutbreak:w-3/4">
                <p className="text-justify text-base sm:text-lg mb-4">{t("aboutUsIntro")}</p>
                <div className="flex justify-center aboutbreak:justify-end">
                  <Link href={`${lng}/about`} className="bg-primary-main hover:scale-105 rounded-md duration-200 text-white px-4 py-2 inline-block">
                    {t("readMore")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image src="/assets/imgs/right-wall.png" className="hidden lg:block " alt="Line Art" width={200} height={400} />
      </div>

      {/* Our Services */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-20">
        <ServiceGrid params={{ lng }} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {events[0] && (
          <a href={events[0].link ? events[0].link : ""}>
            <Image
              src={(lng === "am" && events[0].banner_am) || (lng === "en" && events[0].banner_en) || events[0].banner_en || events[0].banner_am || ""}
              alt=""
              width={1920}
              height={200}
              className="w-full h-auto max-h-72 object-cover"
            />
          </a>
        )}
      </div>

      {/* Floor Image */}
      <div className="w-full overflow-hidden">
        <Image src="/assets/imgs/floor.png" alt="Floor" className="mt-5 w-full h-auto" width={1700} height={430} />
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 space-y-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatsCard lng={lng} title="Visitors" value={visitors_stat?.count || 0} icon={<FaEye size={80} className="mx-auto" />} params={{ lng: "en" }} />
          <StatsCard lng={lng} title="Trainees" value={traineeCount?.count || 0} icon={<FaUsers size={80} className="mx-auto" />} params={{ lng: "en" }} />
          <StatsCard lng={lng} title="PMP" value={pmpCount?.count || 0} icon={<FaCertificate size={80} className="mx-auto" />} params={{ lng: "en" }} />
          <StatsCard lng={lng} title="BIM" value={bIMCount?.count || 0} icon={<FaCubes size={80} className="mx-auto" />} params={{ lng: "en" }} />
          <StatsCard lng={lng} title="Research" value={researchCount?.count || 0} icon={<FaSearch size={80} className="mx-auto" />} params={{ lng: "en" }} />
        </div>
      </div>

      {/* Floor Image */}
      <div className="w-full overflow-hidden">
        <Image src="/assets/imgs/floor.png" alt="Floor" className="mt-5 w-full h-auto" width={1700} height={430} />
      </div>
    </>
  );
};
export default Home;
