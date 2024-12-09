"use client";
import React, { useState } from "react";
import { Standard } from "@/types";

type EditStandardProps = {
  standard: Standard;
  editStandard: (standard: Standard) => void;
};

const EditStandard = ({ standard, editStandard }: EditStandardProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
            }
          });
        }
      } else {
        editStandard({
          id: standard.id,
          title: title,
          path: filePath,
        });
      }
      closeModal();
    } catch (error) {
      console.log(error);
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
            <div className="fixed inset-60 w-2/4 mx-auto  items-center bg-black justify-center">
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
                  Edit Research Details
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
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="department"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Department:
                    </label>
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
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 mx-2 rounded"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Update Research
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
