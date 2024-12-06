"use client";
import { Image } from "@prisma/client";
// import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const GalleryPage = () => {
  const [image, setFile] = useState<File>();
  const [caption, setCaption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [images, setImages] = useState<Image[]>([]);
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
        console.log(data);

        setImages(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Failed to fetch images.", {
            duration: 3000,
            description: error.message,
          });
          console.error(error);
        }
      }
    };

    fetchImages();
  }, []);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!image) return;
    try {
      const formData = new FormData();
      formData.set("image", image);
      formData.set("caption", caption);
      formData.set("tag", "tag");
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        toast.error("Failed to save image.", {
          duration: 3000,
          description: response.statusText,
        });
        console.error(response);
        return;
      }
      if (response.ok) {
        await response.json().then((data) => {
          if (data) {
            // var filePath = data.path;
            images.push(data);

            toast.success("Research added successfully", {
              duration: 3000,
            });
            closeModal();
            // revalidatePath("/");
          }
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to save the image.", {
          duration: 10000,
          description: error.message,
        });
        console.error(error);
      }
    }
  };

  const getBlobUrl = (buffer: Buffer) => {
    const blob = new Blob([buffer], { type: "image/jpg" });
    return URL.createObjectURL(blob);
  };

  return (
    <div className="flex flex-col justify-center ">
      <Toaster position="top-right" richColors />
      <div className="relative flex items-center w-full mt-5">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-primary-main font-bold text-2xl">Gallery</h1>
        <div className="ml-auto">
          <button className="bg-green-600 text-white rounded-md py-2 px-6 mx-5" onClick={openModal}>
            Add Image
          </button>
        </div>
      </div>

      {isOpen && (
        <div>
          <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-60 w-2/4 mx-auto items-center bg-black justify-center">
            <div className="absolute inset-0 bg-white "></div>
            <div className=" bg-white p-4 rounded-lg">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-3xl relative ">Add New Image</h1>

              <section>
                <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-4">
                    <div className="mb-4">
                      <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Image:
                      </label>
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        required
                        onChange={(e) => {
                          setFile(e.target.files?.[0]);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      />
                    </div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                      Caption:
                    </label>
                    <input
                      required
                      type="text"
                      id="caption"
                      onChange={(e) => {
                        setCaption(e.target.value);
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Image Caption"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <div className="flex space-x-2">
                        <span>Save</span>
                      </div>
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}
      <div className="justify-center">
        <section className="columns-5 max-w-7xl mx-auto space-y-4 py-6">
          {images.map((el, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <img src={el.imagePath} alt={el.caption} height={600} width={500} />
              <div className="flex justify-center">
                <span className="text-sm text-slate-500 text-center">{el.caption}</span>
              </div>
              {/* <img src={`data:image/png;base64,${imageData}`} alt="Uploaded Image" /> */}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default GalleryPage;
