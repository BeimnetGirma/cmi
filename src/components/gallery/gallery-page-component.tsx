"use client";
import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
// import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Spinner from "../ui/spinner";

const GalleryPage = () => {
  const [image, setFile] = useState<File>();
  const [caption, setCaption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState("");
  const openDeleteModal = (id: string) => {
    setSelectedImageId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
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
      setLoading(true);
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
            images.push(data);
            toast.success("Research added successfully", {
              duration: 3000,
            });
            closeModal();
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: { preventDefault: () => void }) => {
    if (selectedImageId) {
      try {
        const response = await fetch(`/api/images/${selectedImageId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          toast.error("Failed to delete image.", {
            duration: 3000,
            description: response.statusText,
          });
          return;
        }
        setImages(images.filter((image) => image.id !== selectedImageId));
        toast.success("Image deleted successfully", {
          duration: 3000,
        });
        closeDeleteModal();
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Failed to delete image.", {
            duration: 3000,
            description: error.message,
          });
          console.error(error);
        }
      }
      closeDeleteModal();
    }
  };
  return (
    <div className="flex flex-col justify-center ">
      <Toaster position="top-right" richColors />
      <div className="relative flex items-center w-full mt-5">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-primary-main font-bold text-2xl">
          Gallery
        </h1>
        <div className="ml-auto">
          <button
            className="bg-green-600 text-white rounded-md py-2 px-6 mx-5"
            onClick={openModal}
          >
            Add Image
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 z-[9999]">
          <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-60 w-2/4 mx-auto items-center bg-black justify-center">
            <div className="absolute inset-0 bg-white "></div>
            <div className=" bg-white p-4 rounded-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-3xl relative ">
                Add New Image
              </h1>

              <section>
                <form
                  className="mt-8 relative"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="mb-4">
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
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
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
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
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <div className="flex space-x-2">
                        {loading && <Spinner />}
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
            <div
              key={index}
              className="relative group rounded-md overflow-hidden  transform transition-transform duration-300 hover:scale-105"
            >
              {/* Image */}
              <Image
                src={el.imagePath}
                alt={el.caption}
                height={600}
                width={500}
                className="block"
              />

              {/* Caption */}
              <div className="flex justify-center mt-2">
                <span className="text-sm text-slate-500 text-center">
                  {el.caption}
                </span>
              </div>

              {/* Delete Button */}
              <button
                className="absolute top-2 right-2 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => openDeleteModal(el.id)}
              >
                x
              </button>
            </div>
          ))}
        </section>
        {isDeleteOpen && (
          <div>
            <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
            <div className="fixed inset-60 w-2/4 mx-auto flex items-center bg-black justify-center">
              <div className="absolute inset-0 bg-white "></div>
              <div className=" bg-white p-4 rounded-lg">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={closeDeleteModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Add your modal content here */}
                <h1 className="text-slate-900 text-2xl relative ">Delete</h1>
                <hr className="relative" />
                <div className="relative mx-10 px-10">
                  <p className="text-red-600 text-l">
                    Are you sure you want to delete image captioned &quot;{" "}
                    {images.find((image) => image.id === selectedImageId)
                      ?.caption || "Unknown"}
                    &quot;? This action cannot be undone.{" "}
                  </p>
                </div>
                <hr className="relative mt-10" />
                <div className="flex relative justify-end mt-10">
                  <button
                    className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white  py-2 px-4 mx-2 rounded"
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
