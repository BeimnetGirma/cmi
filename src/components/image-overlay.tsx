import Image from "next/image";
import React from "react";

const ImageWithTextOverlay = ({
  imgUrl,
  width,
  height,
  text,
}: {
  imgUrl: string;
  width: number;
  height: number;
  text: string;
}) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={imgUrl}
          className="object-cover w-full"
          alt="news"
          width={width}
          height={200}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white text-3xl font-bold">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageWithTextOverlay;
