import Navbar from "@/components/navbar";
import Image from "next/image";
import React from "react";

const News = () => {
  return (
    <div className="flex">
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
            <span className="text-white text-lg font-bold">Blog Title 1</span>
          </div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-blue-400">
          News {">"}
          Blogs Title #1 If the blog title is longer
        </div>
      </div>
    </div>
  );
};

export default News;
