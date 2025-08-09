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
      <div className="w-[80vw] max-w-[80vw] mx-auto space-y-20">
        {/* About Us Section */}
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

      <div className="flex flex-row w-full mt-20 ">
        <Image src="/assets/imgs/left-wall.png" alt="Line Art" width={200} height={400} />
        <div className="flex-grow ">
          <div className="flex flex-col items-center justify-center py-8 w-full">
            <h4 className="text-xl font-bold mb-4 text-primary-main">{t("ourServices")}</h4>
            {/* Our Services */}

            <div className="flex flex-col items-center justify-center  w-10/12 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                {Array.from({ length: 5 }).map((_, i) => {
                  // calculate total rows
                  const totalRows = Math.ceil(5 / 3);
                  const col = i % 3; // 0, 1, 2
                  const row = Math.floor(i / 3); // 0, 1, 2

                  // Base border string
                  let borders = "";

                  // Add right border unless it's the last column
                  if (col < 2) borders += " border-r-2";
                  // Add bottom border unless it's the last row
                  if (row < totalRows - 1) borders += " border-b-2";

                  return (
                    <div className={`relative  group overflow-hidden h-64${borders}`} key={i}>
                      {/* Base icon + title (always visible) */}
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 p-4">Time Registration</h4>
                      </div>

                      {/* Hover overlay */}
                      <div className="m-3 shadow-3 absolute inset-0 bg-white translate-y-[110%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center hover:cursor-pointer">
                        {/* Keep title and icon visible on hover */}
                        <div className="flex flex-col items-center justify-center h-full p-1">
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 ">Time Registration</h4>
                          <p className="text-center text-sm">
                            Effortless time tracking for every team member. Just log machine hours, overtime, and allowances, then instantly view your project’s time breakdown.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Image src="/assets/imgs/right-wall.png" alt="Line Art" width={200} height={400} />
      </div>
    </>
  );
};

export default Home;
