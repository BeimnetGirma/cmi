"use client";
import React, { useState } from "react";
import { Service as IService } from "@/types";
import useLoading from "@/hooks/useLoading";
import Spinner from "../ui/spinner";
import { toast } from "sonner";

type EditServiceProps = {
  service: IService;
  editService: (service: IService) => void;
};

const EditService = ({ service, editService }: EditServiceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(service.title);
  const [imagePath, setFilePath] = useState(service.image);
  const [content, setContent] = useState(service.content || "");
  const [link, setLink] = useState(service.link || "");
  const [image, setFile] = useState<File>();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Form validation
    if (!title.trim()) {
      toast.error("Please enter a title for the service");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter content for the service");
      return;
    }

    startLoading();

    try {
      if (image) {
        const formData = new FormData();
        formData.set("image", image);

        const response = await fetch("/api/service/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          await response.json().then((data) => {
            if (data) {
              editService({
                id: service.id,
                title: title,
                image: data.imagePath,
                content: content,
                link: link,
              });
              toast.success("Service updated successfully");
            }
          });
        } else {
          throw new Error("Image upload failed");
        }
      } else {
        editService({
          id: service.id,
          title: title,
          image: imagePath,
          content: content,
          link: link,
        });
        toast.success("Service updated successfully");
      }
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update service. Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <button onClick={openModal}>
        <svg
          className="h-8 w-8 text-yellow-500"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
          <line x1="16" y1="5" x2="19" y2="8" />
        </svg>
      </button>
      <div>
        {isOpen && (
          <div>
            <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
            <div className="fixed inset-60 w-2/4 mx-auto items-center bg-black justify-center">
              <div className="absolute inset-0 bg-white "></div>
              <div className="bg-white p-4 rounded-lg">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                  disabled={isLoading}
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
                  Edit Service Details
                </h1>

                <form className="mt-8 relative" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Title:
                    </label>
                    <input
                      required
                      type="text"
                      id="title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      value={title}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      placeholder="Enter title"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="content"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Content:
                    </label>
                    <textarea
                      required
                      id="content"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      placeholder="Enter content"
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                      disabled={isLoading}
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="file"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Cover Image:
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={(e) => {
                        setFile(e.target?.files?.[0]);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="link"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Link:
                    </label>
                    <input
                      type="text"
                      id="link"
                      value={link}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      placeholder="Enter link"
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2 disabled:opacity-50"
                      onClick={closeModal}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Spinner />
                          <span className="ml-2">Updating...</span>
                        </div>
                      ) : (
                        "Update Service"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditService;
