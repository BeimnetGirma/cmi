"use client";
import useLoading from "@/hooks/useLoading";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import Spinner from "../ui/spinner";

import { manual as IManual } from "@prisma/client";

type NewStandardProps = {
  createStandard: (standard: IManual) => void;
};

const NewStandard = ({ createStandard }: NewStandardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!file) return;
    try {
      startLoading();
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch(`/api/standard/`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        stopLoading();
        toast.error("Failed to upload the standard.", {
          duration: 3000,
          description: response.statusText,
        });
        console.error(response);
        return;
      }

      const data = await response.json();
      if (data.success) {
        const filePath = data.path;
        const originalName = file.name;
        const newStandard: IManual = {
          id: Math.random(),
          title: title,
          path: JSON.stringify({
            filePath,
            originalName,
          }),
        };
        createStandard(newStandard);
        toast.success("Research uploaded successfully", {
          duration: 3000,
        });
        closeModal();
      }
    } catch (error) {
      stopLoading();
      if (error instanceof Error) {
        toast.error("Failed to publish the research.", {
          duration: 3000,
          description: error.message,
        });
        console.error(error);
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors />
      <div className="flex flex-row justify-end">
        <button
          className="bg-green-600 text-white rounded-md py-4  m-2 px-10 item-center"
          onClick={openModal}
        >
          New
        </button>
      </div>
      {isOpen && (
        <div>
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
                Add New Standard
              </h1>

              <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
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
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                    placeholder="Enter title"
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
                    required
                    onChange={(e) => {
                      setFile(e.target?.files?.[0]);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <div className="flex space-x-2">
                      {isLoading && <Spinner />}
                      <span>Add Standard</span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewStandard;
