import Navbar from "@/components/navbar";
import Image from "next/image";
import React from "react";

const blogs = [
  {
    img: "/assets/imgs/single-blog.png",
    title: "Blog title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
  },
  {
    img: "/assets/imgs/single-blog.png",
    title: "Blog title 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
  },
  {
    img: "/assets/imgs/single-blog.png",
    title: "Blog title 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.orem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
  },
];
const News = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <div className="relative">
          <Image
            src="/assets/imgs/blog-cover.png"
            className="object-cover w-full h-full"
            alt="news"
            width={1920}
            height={500}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-3xl font-bold">News</span>
          </div>
        </div>
      </div>
      <div className="flex-col py-10">
        <div className="font-semibold text-2xl text-blue-400 text-center">
          SCAFFOLDING SOLUTIONS
        </div>
        <div className="flex justify-center">
          {blogs.map((blog) => (
            <div key={blog.title} className="flex-col p-5 w-1/4">
              <Image
                src={blog.img}
                alt="Featured Image 1"
                className="rounded-t-xl"
                width={500}
                height={300}
              />
              <div className="px-9 pt-10 pb-14 bg-gray-500 rounded-b-lg">
                <div className="text-white space-y-4">
                  <h3 className="text-xl font-bold lead-xl bold">
                    {blog.title}
                  </h3>
                  <div className="text-lg font-light">{blog.description}</div>
                </div>
                <div className="flex justify-between pt-8">
                  <div className="flex flex-col justify-end">
                    <a
                      href="#"
                      className="py-3 px-6 bg-white text-primary-200 paragraph-m  rounded-full"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
