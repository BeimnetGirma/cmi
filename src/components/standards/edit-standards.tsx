"use client";
import React, { useState } from "react";
import { Standard } from "@/types";
import { toast } from "sonner";

type EditStandardProps = {
  standard: Standard;
  editStandard: (standard: Standard) => void;
};

const EditStandard = ({ standard, editStandard }: EditStandardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(standard.title);
  const [filePath, setFilePath] = useState(standard.path);
  const [file, setFile] = useState<File>();

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
      toast.error("Please enter a title for the standard");
      return;
    }

    setIsLoading(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.set("file", file);
        const response = await fetch("/api/standard/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          await response.json().then((data) => {
            if (data) {
              editStandard({
                id: standard.id,
                title: title,
                path: data.path,
              });
              toast.success("Standard updated successfully");
            }
          });
        } else {
          throw new Error("File upload failed");
        }
      } else {
        editStandard({
          id: standard.id,
          title: title,
          path: filePath,
        });
        toast.success("Standard updated successfully");
      }
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update standard. Please try again.");
    } finally {
      setIsLoading(false);
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
                  Edit Standard Details
                </h1>

                <form className="mt-8 relative">
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      placeholder="Enter title"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="file"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      File:
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept=".pdf"
                      onChange={(e) => {
                        setFile(e.target.files?.[0]);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
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
                      className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-2 rounded flex items-center justify-center disabled:opacity-50 ${
                        isLoading ? "cursor-not-allowed" : ""
                      }`}
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        "Update Standard"
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

export default EditStandard;
