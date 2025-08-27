"use client";
import { FeaturedPosts, Post } from "@/types/featured-posts";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
type CarouselProps = {
  posts: FeaturedPosts;
};
const Carousel = ({ posts }: CarouselProps) => {
  useEffect(() => {
    const init = async () => {
      const { Carousel, initTWE } = await import("tw-elements");
      initTWE({ Carousel });
    };
    init();
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      className="relative w-full overflow-hidden h-[50vh]" // Updated height
      data-twe-carousel-init
      data-twe-ride="carousel"
    >
      <div className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0" data-twe-carousel-indicators>
        <button
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide-to="0"
          data-twe-carousel-active
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[100ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide-to="1"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[100ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-twe-target="#carouselExampleCaptions"
          data-twe-slide-to="2"
          className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[100ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="relative w-full overflow-hidden h-[50vh] after:clear-both after:block after:content-['']">
        {" "}
        {posts?.posts?.map((post: Post, index) => (
          <div
            key={index}
            className={`relative float-left -mr-[100%] w-full h-[50vh] transition-transform duration-[100ms] ease-in-out motion-reduce:transition-none ${
              index != 0 ? "hidden" : ""
            }`}
            {...(index === 0 ? { "data-twe-carousel-active": "" } : {})}
            data-twe-carousel-item
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className="absolute top-0 bottom-0 right-0 left-0 h-full"
              style={{
                backgroundImage: `url(${post.feature_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(10px)",
                backfaceVisibility: "hidden",
                zIndex: -1,
              }}
            />
            <Link href={`news/${post.slug}`}>
              <div className="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-30 z-1 "></div>
              <div
                className="flex justify-center items-center"
                style={{
                  height: "-webkit-fill-available",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={1000}
                  height={500}
                  src={post.feature_image}
                  className="relative block mx-auto py-10 object-contain transition-transform duration-300 ease-in-out transform hover:scale-125 hover:shadow-lg"
                  alt="..."
                />
              </div>
              <div className="absolute inset-x-[15%] bottom-40 top-60 hidden text-center w-1/2 mx-auto text-black md:block bg-black opacity-30 z-10"></div>
              <div className="absolute inset-x-[15%] bottom-40 py-5 text-center w-1/2 mx-auto text-white md:block z-20">
                <h5 className="text-3xl font-bold py-4">{post.title}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselExampleCaptions"
        data-twe-slide="prev"
      >
        <span className="inline-block h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
      </button>

      <button
        className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
        type="button"
        data-twe-target="#carouselExampleCaptions"
        data-twe-slide="next"
      >
        <span className="inline-block h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
