"use client";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";

const Gallery = () => {
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
    <div className="justify-center">
      <div className="w-full">
        <div className="flex justify-center">
          <h1 className="text-primary-main font-bold text-2xl ml-28 pt-6">Gallery</h1>
        </div>
      </div>
      <Toaster position="top-right" richColors />
      <div className="justify-center">
        <section className="columns-4 max-w-7xl mx-auto space-y-4 py-6">
          {images.map((el, index) => (
            <div key={index} className="rounded-md overflow-hidden px-1 relative group" onClick={() => openModal(el)}>
              <Image src={el.imagePath} alt={el.caption} height={600} width={500} className="rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="flex justify-center absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm text-center">{el.caption}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
      {modalIsOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className=" p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <div className="relative">
              <button className="absolute -top-7 -right-1 text-gray-50 hover:text-gray-700" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image src={selectedImage.imagePath} alt={selectedImage.caption} height={1200} width={1200} />
            </div>
            <p className="mt-4 text-lg text-white text-center">{selectedImage.caption}</p>
            {/* <button onClick={closeModal} className="mt-6 px-6 py-3 bg-primary-main text-white rounded-lg">
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
