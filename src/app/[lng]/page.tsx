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

      {/* Our Services */}

      <div className="flex flex-col items-center justify-center p-8 pl-40 bg-slate-50">
        <h3 className="text-xl font-bold mb-4 text-primary-main">
          {t("ourServices")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 p-4">
              {t("preConstructionPhase")}
            </h4>
            <p className="text-center w-3/4 pb-10">
              Effortless time tracking for every team member. Just log machine
              hours, overtime, and allowances, then instantly view your projects
              time breakdown.
            </p>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-cyan-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 p-4">
              {t("constructionPhase")}
            </h4>
            <p className="text-center w-3/4 pb-10">
              Complete checklists with templates adapted to all industries. Can
              be easily customized and customized.
            </p>
          </div>

          <div className="p-4   flex flex-col items-center justify-center  border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-orange-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">
              {t("postConstructionPhase")}
            </h4>
            <p className="text-center w-3/4 pb-10">
              Get mobile-friendly forms with options for signing directly on
              mobile. We also have a form builder where you can freely build all
              the forms you need.
            </p>
          </div>
        </div>
      </div>

      {/* Our Clients */}
      <div className="pb-20">
        <h2 className="text-xl font-bold text-primary-main text-center mt-10 mb-5 p-0">
          {t("ourClients").toUpperCase()}
        </h2>
        <ClientsSlider />
      </div>
    </>
  );
};

export default Home;
