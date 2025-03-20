"use client";
import React, { useEffect } from "react";
import { PostOrPage } from "@tryghost/content-api";
import SocialLinks from "@/components/ui/social-icons";
import useLoading from "@/hooks/useLoading";
import Image from "next/image";
import { getSinglePost } from "@/app/ghost/posts";
import dayjs from "dayjs";
import SafeHTML from "@/components/ui/safe-html";
import Link from "next/link";
import ImageWithTextOverlay from "@/components/ui/image-overlay";
import { toast } from "sonner";

export const NewsPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { startLoading, stopLoading, renderLoading } = useLoading();
  const [news, setNews] = React.useState<PostOrPage>();

  useEffect(() => {
    startLoading();
    getSinglePost(slug)
      .then((data: void | PostOrPage) => {
        if (data) {
          setNews(data as unknown as PostOrPage);
        }
      })
      .catch((error) => {
        toast.error("Error fetching news");
      })
      .finally(() => {
        stopLoading();
      });
  }, [slug, startLoading, stopLoading]);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <ImageWithTextOverlay
          imgUrl="/assets/imgs/blog-cover.png"
          width={1920}
          height={500}
          text="News"
        />
      </div>
      <div className="container mx-auto">
        <div className="flex-col md:flex-row py-10">
          <div className="flex-col font-bold text-xl text-blue-400  my-12">
            <div>
              <Link href="/news">Blogs {`>`}</Link>
              <span className="text-secondary-main text-sm pl-2">
                {news?.title}
              </span>
            </div>
          </div>
          {renderLoading()}
          <article className="flex xs:flex-col-reverse md:flex-row space-x-4">
            <div className="flex w-full md:w-3/4  px-5">
              <div className="flex flex-col space-y-5">
                <div className="font-bold text-2xl">{news?.title}</div>
                <div className="text-secondary-main text-sm">
                  {dayjs(news?.updated_at).format("MMMM DD, YYYY")}
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="aspect-auto">
                    <Image
                      src={
                        news?.feature_image || "/assets/imgs/default-image.png"
                      }
                      className="!relative object-cover w-full h-96"
                      alt="Featured Image"
                      layout="fill"
                      priority
                    />
                  </div>
                  <div className="text-secondary-main text-sm news-content">
                    {news?.html && <SafeHTML html={news?.html || ""} />}
                  </div>
                </div>
              </div>
            </div>
            {/* Search articles */}
            <div className="flex flex-col space-y-5 px-4 xs:w-full md:w-1/4">
              {/* implement search articles */}
              <div className="flex flex-col space-y-10">
                <div>
                  <div className="font-bold text-2xl">Search Articles</div>
                  {/* search input */}
                  <div className="flex items-center align-middle w-min-[270px] space-y-2  border-2 border-gray-300 rounded-lg  ">
                    <input
                      type="text"
                      placeholder="Search articles here"
                      className="w-full outline-none border-none bg-transparent text-sm py-4 px-2"
                    />
                    <Image
                      className="cursor-pointer mr-2"
                      src="/assets/icons/search.svg"
                      alt="search logo"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                {/* line */}
                <div className="border-1 border-b-2 border-bg-secondary-main"></div>
                <div className="font-semibold text-lg">Follow us on </div>
                <SocialLinks />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
