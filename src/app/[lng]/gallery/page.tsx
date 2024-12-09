"use client";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
const Gallery = () => {
  const [images, setImages] = useState<PrismaImage[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) {
          toast.error("Failed to fetch images.", {
            duration: 3000,
            description: response.statusText,
          });
          return;
        }
        const data = await response.json();

        setImages(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Failed to fetch images.", {
            duration: 3000,
            description: error.message,
          });
        }
      }
    };

    fetchImages();
  }, []);
  return (
    <div className="justify-center">
      <div className="w-full">
        <div className="flex justify-center">
          <h1 className="text-primary-main font-bold text-2xl ml-28 pt-6">
            Gallery
          </h1>
        </div>
      </div>
      <Toaster position="top-right" richColors />
      <div className="justify-center">
        <section className="columns-5 max-w-7xl mx-auto space-y-4 py-6">
          {images.map((el, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <Image
                src={el.imagePath}
                alt={el.caption}
                height={600}
                width={500}
              />
              <div className="flex justify-center">
                <span className="text-sm text-slate-500 text-center">
                  {el.caption}
                </span>
              </div>
              {/* <img src={`data:image/png;base64,${imageData}`} alt="Uploaded Image" /> */}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Gallery;
