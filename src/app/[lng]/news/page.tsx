"use client";
import { getPosts } from "@/app/ghost/posts";
import Card from "@/components/card";
import ImageWithTextOverlay from "@/components/image-overlay";
import SocialLinks from "@/components/social-icons";
import Image from "next/image";
import React, { useEffect } from "react";

const blogs = [
  {
    id: 1,
    img: "/assets/imgs/single-blog.png",
    title: "Blog title 1",
    category: "Quality System",
    link: "/blog-title-1",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  // generate 3 more blogs
  {
    id: 2,
    img: "/assets/imgs/blog-1.png",
    title: "Blog title 2",
    category: "Quality System",
    link: "/blog-title-2",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  {
    id: 3,
    img: "/assets/imgs/blog-2.png",
    title: "Blog title 3",
    category: "Quality System",
    link: "/blog-title-3",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  {
    id: 4,
    img: "/assets/imgs/blog-3.png",
    title: "Blog title 4",
    category: "Quality System",
    link: "/blog-title-4",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  {
    id: 5,
    img: "/assets/imgs/blog-4.png",
    title: "Blog title 4",
    category: "Quality System",
    link: "/blog-title-4",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  //generate 5 more blogs
  {
    id: 6,
    img: "/assets/imgs/blog-1.png",
    title: "Blog title 5",
    category: "Quality System",
    link: "/blog-title-5",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  {
    id: 7,
    img: "/assets/imgs/blog-2.png",
    title: "Blog title 6",
    category: "Quality System",
    link: "/blog-title-6",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  {
    id: 8,
    img: "/assets/imgs/blog-3.png",
    title: "Blog title 7",
    category: "Quality System",
    link: "/blog-title-7",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  {
    id: 9,
    img: "/assets/imgs/blog-4.png",
    title: "Blog title 8",
    category: "Quality System",
    link: "/blog-title-8",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
  {
    id: 10,
    img: "/assets/imgs/blog-1.png",
    title: "Blog title 9",
    category: "Quality System",
    link: "/blog-title-9",
    date: "2022-10-10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet,",
  },
];

const categories = [
  "All",
  "Quality System",
  "Safety System",
  "Environment System",
];
const News = () => {
  useEffect(() => {
    getPosts().then((data) => {
      if (data) {
        console.log(data); //list of posts here
      }
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
            <div className="flex w-full md:w-3/4  px-5">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                {blogs.map((blog) => (
                  <React.Fragment key={blog.id}>
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
