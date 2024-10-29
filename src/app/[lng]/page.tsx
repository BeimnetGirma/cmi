import React from "react";
import Image from "next/image";
import Link from "next/link";
import ClientsSlider from "@/components/clients-slider";
import { HomePageProps } from "@/types";
import { useTranslation } from "@/app/i18n";
import { FeaturedPosts, Post } from "@/types/featured-posts";
import Carousel from "@/components/Carousel";

const Home: React.FC<HomePageProps> = async ({ params }) => {
  const { lng = "en" } = params;
  const { t } = await useTranslation(lng, "translation");

  const featuredPosts = await fetch(
    `${process.env.NEXT_PUBLIC_GHOST_URL}/api/v4/content/posts/?key=${process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY}&filter=featured:true&include:author&limit=3`,
    {
      cache: "no-cache",
    }
  )
    .then((res) => res.json() as Promise<FeaturedPosts>)
    .catch((err) => {
      console.error(err);
      return null;
    });

  return (
    <>
      {!!featuredPosts?.posts?.length && (
        <div className="p-5">
          <Carousel posts={featuredPosts} />
        </div>
      )}
      {/* Hero */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center mt-20">
        <Image
          src="/assets/imgs/1.jpg"
          className="rounded-lg"
          alt="Hero Image"
          width={800}
          height={500}
        />
        <div className="flex flex-col items-end justify-center ">
          <h2 className="text-4xl text-center text-primary-main font-bold  mb-5">
            {t("companyName")}
          </h2>
          <div className="text-slate-900 rounded-md mx-5">
            <p className="text-justify">{t("companyIntro")}</p>
            <div className="text-right">
              <button className="bg-primary-main  hover:bg-blue-600 rounded-md transition-colors text-white px-4 py-2 my-6   ">
                <Link href={`${lng}/services`}>{t("viewServices")}</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* About Us Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center p-8 my-20 ">
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold mb-4 text-primary-main">
            {t("aboutUs")}
          </h3>
          <p className="text-left mb-4">{t("aboutUsIntro")}</p>
          <button className="bg-primary-main  hover:bg-blue-600 rounded-md transition-colors text-white px-4 py-2 mt-2 ">
            <Link href={`${lng}/about`}>{t("readMore")}</Link>
          </button>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center">
          <Image
            src="/assets/imgs/5.jpg"
            alt="About Us Image"
            className="rounded-lg justify-end"
            width={500}
            height={330}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
