"use client";
import useLoading from "@/hooks/useLoading";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import Spinner from "../ui/spinner";
import { Executive } from "@prisma/client";
type NewExecutiveProps = {
  createExecutive: (executive: any) => void;
};

const NewExecutive = ({ createExecutive }: NewExecutiveProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [headName, setFullName] = useState("");
  const [headTitle, setTitle] = useState("");
  const [dutiesDescription, setDescription] = useState("");
  const [departmentName, setDeptName] = useState("");
  const [image, setFile] = useState<File>();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      startLoading();
      const formData = new FormData();
      if (image) {
        formData.set("image", image);
      } else {
        throw new Error("No file selected");
      }
      const response = await fetch(`/api/profile/`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        stopLoading();
        toast.error("Failed to upload the profile picture.", {
          duration: 3000,
          description: response.statusText,
        });
        console.error(response);
        return;
      }

      const data = await response.json();
      if (data.success) {
        const filePath = data.imagePath;

        console.log("Saving profile ", filePath);

        const newExecutive = {
          departmentName,
          dutiesDescription,
          headName,
          headTitle,
          imagePath: filePath,
        };
        createExecutive(newExecutive);
        toast.success("Excutive added successfully", {
          duration: 3000,
        });
        closeModal();
      }
    } catch (error) {
      stopLoading();
      if (error instanceof Error) {
        toast.error("Failed to create the excutive profile.", {
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
    <>
      <div>
        <Toaster position="top-right" richColors />
        <div className="flex flex-row justify-end">
          <button className="bg-green-600 text-white rounded-md py-4  m-2 px-10 item-center" onClick={openModal}>
            New
          </button>
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
                <h1 className="text-slate-900 text-3xl relative ">Add New Executive</h1>

                <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-4">
                    <label htmlFor="deptName" className="block text-gray-700 text-sm font-bold mb-2">
                      Executive Name
                    </label>
                    <input
                      required
                      type="text"
                      id="deptName"
                      onChange={(e) => {
                        setDeptName(e.target.value);
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                      Executive Description:
                    </label>
                    <textarea
                      required
                      id="description"
                      rows={4}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      placeholder="Enter Job Description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <fieldset className="m-5 p-2 border-2 ">
                    <legend className="block text-gray-700 font-bold mb-2">Executive Head</legend>
                    <div className="mb-4">
                      <label htmlFor="headName" className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        id="headName"
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        placeholder="Enter Full Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                      </label>
                      <input
                        required
                        type="text"
                        id="title"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        placeholder="Enter Title"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Profile Picture:
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        required
                        onChange={(e) => {
                          setFile(e.target.files?.[0]);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      />
                    </div>
                  </fieldset>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <div className="flex space-x-2">
                        {isLoading && <Spinner />}
                        <span>Add Executive</span>
                      </div>
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

export default NewExecutive;
