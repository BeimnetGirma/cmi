"use client";
import { getPosts, searchPosts } from "@/app/ghost/posts";
import Card from "@/components/card";
import ImageWithTextOverlay from "@/components/image-overlay";
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
  const [search, setSearch] = React.useState<string>("");
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

  // search articles
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      startLoading();
      const result = await searchPosts(search);
      setAllNews(result as unknown as PostsOrPages[]);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (search === "") {
      getPosts().then((data: void | PostsOrPages) => {
        if (data) {
          setAllNews(data as unknown as PostsOrPages[]);
        }
      });
    }
  }, [search]);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <ImageWithTextOverlay
          imgUrl="/assets/imgs/blog-cover.png"
          width={1920}
          height={300}
          text="News"
        />
      </div>
      <div className="container mx-auto">
        <div className="flex-col py-10">
          <div className="flex xs:flex-col space-x-4">
            {/* Blog list */}
            {renderLoading()}
            {/* Search articles */}
            <div className="flex flex-col space-y-5 px-4 xs:w-full md:w-full">
              {/* implement search articles */}
              <div className="flex flex-col space-y-10">
                <div>
                  {/* <div className="font-bold text-2xl">Search Articles</div> */}
                  {/* search input */}
                  <div className="flex items-center align-middle w-min-[270px] space-y-2  border-2 border-gray-300 rounded-lg  ">
                    <form className="w-full" onSubmit={handleSearch}>
                      <input
                        type="text"
                        placeholder="Search articles here"
                        className="w-full outline-none border-none bg-transparent text-sm py-4 px-2"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                    <Image
                      className="cursor-pointer mr-2"
                      src="/assets/icons/search.svg"
                      alt="search logo"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full md:w-full  px-5">
              <div className="relative grid  gap-[4vmin] py-[4vmin] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {allNews?.map((blog) => (
                  <React.Fragment key={blog.uuid}>
                    <Card {...blog} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
