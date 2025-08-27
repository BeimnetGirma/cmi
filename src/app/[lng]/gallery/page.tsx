"use client";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import { PageProps } from "@/types";

const Gallery: React.FC<PageProps> = ({ params: { lng } }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PrismaImage | null>(null);

  const openModal = (image: PrismaImage) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

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
    <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      <div className="w-full flex justify-center">
        <h1 className="text-primary-main font-bold text-2xl pt-6">{lng === "am" ? "የምስል ገፅ" : "Gallery"}</h1>
      </div>

      <Toaster position="top-right" richColors />

      <section className="w-full mt-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((el, index) => (
          <div key={index} className="rounded-md overflow-hidden px-1 mb-4 relative group cursor-pointer break-inside-avoid" onClick={() => openModal(el)}>
            <Image
              src={el.imagePath}
              alt={el.caption}
              height={600}
              width={500}
              className="rounded-xl transform group-hover:scale-105 transition-transform duration-300 w-full object-cover"
              sizes="(max-width: 640px) 100vw, 500px"
              priority={index < 3} // optionally prioritize first few images for faster load
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-2 px-3">
              <span className="text-sm text-center block">{el.caption}</span>
            </div>
          </div>
        ))}
      </section>

      {modalIsOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative p-4 rounded-lg shadow-lg max-w-full max-h-[90vh] w-full md:w-auto overflow-auto">
            <button className="absolute top-2 right-2 text-gray-200 hover:text-white z-50" onClick={closeModal} aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage.imagePath}
              alt={selectedImage.caption}
              height={1200}
              width={1200}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              sizes="(max-width: 768px) 90vw, 1200px"
            />
            <p className="mt-4 text-lg text-white text-center">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
