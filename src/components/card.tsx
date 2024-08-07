import { PostOrPage } from "@tryghost/content-api";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { trimExcerpt } from "@/helpers";

const Card: React.FC<PostOrPage> = (props) => {
  const shadowStyle = {
    boxShadow: "0px 2px 1px 0px #00000040",
  };

  const { id, feature_image, title, excerpt, slug, authors, updated_at, tags } =
    props;
  return (
    <article
      key={id}
      className="flex flex-col min-h-56 w-max-[380px] space-y-2 rounded-lg px-4 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
      style={shadowStyle}
    >
      <div className="aspect-auto">
        <Image
          src={feature_image!}
          className="!relative object-cover w-full h-48"
          alt="Featured Image 1"
          layout="fill"
          onError={() => console.log("Image not found")}
        />
      </div>
      <div className="flex justify-between italic text-secondary-main text-sm px-2">
        <p>
          {
            // map tags and give styles for each tag
            tags?.map((tag) => (
              <span key={tag.id} className="text-primary-main">
                {tag.name}
              </span>
            ))
          }
        </p>
        <p className="">{dayjs(updated_at).format("DD MMMM YYYY")}</p>
      </div>
      <div className="flex-col space-y-2">
        <div className="font-bold text-black text-2xl">{title}</div>
        <p className="text-justify">{trimExcerpt(excerpt!)}</p>
      </div>
      <div className="flex flex-col flex-1 justify-end ">
        <a
          href={`news/${slug}`}
          className="text-primary-main underline font-semibold pb-5"
        >
          Read More
        </a>
      </div>
    </article>
  );
};

export default Card;
