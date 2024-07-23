"use client";
import { getPosts } from "@/app/ghost/posts";
import Card from "@/components/card";
import ImageWithTextOverlay from "@/components/image-overlay";
import SocialLinks from "@/components/social-icons";
import useLoading from "@/hooks/useLoading";
import Image from "next/image";
import React, { useEffect } from "react";
import { PostsOrPages } from "@tryghost/content-api";

const categories = [
  "All",
  "Quality System",
  "Safety System",
  "Environment System",
];

const News = () => {
  const [allNews, setAllNews] = React.useState<PostsOrPages[]>([]);
  const { startLoading, stopLoading, renderLoading } = useLoading();

  useEffect(() => {
    startLoading();
    getPosts()
      .then((data: void | PostsOrPages) => {
        if (data) {
          setAllNews(data as unknown as PostsOrPages[]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        stopLoading();
      });
  }, []);

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
        <div className="flex-col py-10">
          <div className="flex-col font-bold text-3xl text-blue-400 text-center my-12">
            <div>SCAFFOLDING SOLUTIONS</div>
            <div className="text-secondary-main text-sm">
              Building Smarter Together
            </div>
          </div>
          <div className="flex xs:flex-col-reverse flex-row space-x-4">
            {/* Blog list */}
            {renderLoading()}
            <div className="flex w-full md:w-3/4  px-5">
              <div className="relative grid gap-[4vmin] grid-cols-3 py-[4vmin] md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {allNews?.map((blog) => (
                  <React.Fragment key={blog.uuid}>
                    <Card {...blog} />
                  </React.Fragment>
                ))}
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
                <div>
                  <div className="text-black font-bold text-2xl py-4">
                    Categories
                  </div>
                  {/* categories */}
                  <div className="flex flex-col space-y-5">
                    {categories.map((category, indx) => (
                      <div
                        key={indx}
                        className="flex justify-between border-2 rounded-lg py-2 px-4 text-md cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out "
                      >
                        <div className="text-secondary-main text-sm">
                          {category}
                        </div>
                        <Image
                          src="/assets/icons/arrow-right.svg"
                          width={24}
                          height={24}
                          alt="arrow right icon"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-1 border-b-2 border-bg-secondary-main"></div>
                <div className="font-semibold text-lg">Follow us on </div>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
