import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

type CardProps = {
  img: string;
  title: string;
  date: string;
  description: string;
  category: string;
  link: string;
};

const Card: React.FC<CardProps> = ({
  img,
  title,
  description,
  link,
  category,
  date,
}) => {
  const shadowStyle = {
    boxShadow: "0px 2px 1px 0px #00000040",
  };
  return (
    <div
      className="flex flex-col w-max-[380px] space-y-2 rounded-lg px-4 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
      style={shadowStyle}
    >
      <div className="aspect-auto">
        <Image
          src={img}
          className="!relative object-cover"
          alt="Featured Image 1"
          layout="fill"
        />
      </div>
      <div className="flex justify-between italic text-secondary-main text-sm px-2">
        <p>{category}</p>
        <p className="">{dayjs(date).format("DD MMMM YYYY")}</p>
      </div>
      <div className="flex-col space-y-2">
        <h2 className="font-bold text-black">{title}</h2>
        <p className="text-justify">{description}</p>
      </div>
      <div className="flex flex-col flex-1 justify-end ">
        <a
          href={link}
          className="text-primary-main underline font-semibold pb-5"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default Card;
