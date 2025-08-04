import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomePageProps } from "@/types";
import { useTranslation } from "@/app/i18n";
import { FeaturedPosts, Post } from "@/types/featured-posts";
import Carousel from "@/components/ui/carousel";

export const dynamic = "force-dynamic";

const Home: React.FC<HomePageProps> = async ({ params }) => {
  const { lng = "en" } = params;
  const { t } = await useTranslation(lng, "translation");
  const filter = `featured:true+tag:'lng-${lng}'`;

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
            <div className="text-slate-900 rounded-md mx-5">
              <p className="text-justify text-lg">{t("companyIntro")}</p>
              <div className="text-right">
                <button className="bg-primary-main  hover:bg-primary-light hover:text-secondary-light rounded-md transition-colors text-white px-4 py-2 my-6   ">
                  <Link href={`${lng}/services`}>{t("viewServices")}</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* About Us Section */}
        <div className="container mx-auto flex flex-col lg:flex-row-reverse  items-center justify-center  mt-20 ">
          <Image src="/assets/imgs/5.jpg" alt="About Us Image" className="rounded-lg justify-end" width={700} height={430} />
          <div className="py-8 px-4 pr-8">
            <h3 className="text-xl font-bold mb-4 text-primary-main">{t("aboutUs")}</h3>
            <p className="text-justify text-lg mb-4">{t("aboutUsIntro")}</p>
            <button className="bg-primary-main  hover:bg-primary-light hover:text-secondary-light rounded-md transition-colors text-white px-4 py-2 mt-2 ">
              <Link href={`${lng}/about`}>{t("readMore")}</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
