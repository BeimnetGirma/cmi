"use client";
import useLoading from "@/hooks/useLoading";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import Spinner from "../ui/spinner";
import { Executive } from "@prisma/client";
import "react-quill/dist/quill.snow.css"; // For Quill's Snow theme
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";

type NewExecutiveProps = {
  createExecutive: (executive: any) => void;
};
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const NewExecutive = ({ createExecutive }: NewExecutiveProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [languageTab, setLanguageTab] = useState<"en" | "am">("en"); // Default to English
  //English
  const [headName, setFullName] = useState("");
  const [headTitle, setTitle] = useState("");
  const [dutiesDescription, setDescription] = useState("");
  const [departmentName, setDeptName] = useState("");
  //Amharic
  const [headNameAm, setFullNameAm] = useState("");
  const [headTitleAm, setTitleAm] = useState("");
  const [dutiesDescriptionAm, setDescriptionAm] = useState("");
  const [departmentNameAm, setDeptNameAm] = useState("");

  const [image, setFile] = useState<File>();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };
  const handleDescriptionChangeAm = (value: string) => {
    setDescriptionAm(value);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const missingFields = [];

    // English checks
    if (!departmentName.trim()) missingFields.push("Department Name (English)");
    if (!dutiesDescription.trim()) missingFields.push("Duties Description (English)");
    if (!headName.trim()) missingFields.push("Head Name (English)");
    if (!headTitle.trim()) missingFields.push("Title (English)");

    // Amharic checks
    if (!departmentNameAm.trim()) missingFields.push("የመምሪያ ስም (Amharic)");
    if (!dutiesDescriptionAm.trim()) missingFields.push("የተግባር መግለጫ (Amharic)");
    if (!headNameAm.trim()) missingFields.push("የኃላፊ ስም (Amharic)");
    if (!headTitleAm.trim()) missingFields.push("የኃላፊ የስራ መደብ (Amharic)");

    if (missingFields.length > 0) {
      toast.error("Please fill out the following fields:\n\n" + missingFields.join("\n"));
      return;
    }

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

        const newExecutive = {
          departmentName,
          dutiesDescription: DOMPurify.sanitize(dutiesDescription),
          headName,
          headTitle,
          departmentName_am: departmentNameAm,
          dutiesDescription_am: DOMPurify.sanitize(dutiesDescriptionAm),
          headName_am: headNameAm,
          headTitle_am: headTitleAm,
          imagePath: filePath,
        };
        console.log("New Executive Data:", newExecutive);

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
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closeModal}></div>

            {/* Scrollable modal container */}
            <div className="relative z-50 flex min-h-screen items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Add your modal content here */}
                <div className="flex space-x-2 mb-4">
                  <button className={`px-3 text-xs  py-1 rounded ${languageTab === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setLanguageTab("en")}>
                    English
                  </button>
                  <button className={`px-3  py-1 rounded ${languageTab === "am" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setLanguageTab("am")}>
                    አማርኛ
                  </button>
                </div>
                {languageTab === "en" && <h1 className="text-slate-900 text-3xl relative ">Add New Executive</h1>}
                {languageTab === "am" && <h1 className="text-slate-900 text-3xl relative ">አዲስ አስተዳደር አክል</h1>}

                <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
                  {languageTab === "en" && (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="deptName" className="block text-gray-700 text-sm font-bold mb-2">
                          Executive Name
                        </label>
                        <input
                          required
                          type="text"
                          id="deptName"
                          value={departmentName}
                          onChange={(e) => {
                            setDeptName(e.target.value);
                          }}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                          placeholder="Executive Name"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                          Executive Description:
                        </label>
                        <ReactQuill
                          id="description"
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                          placeholder="Enter Job Description"
                          onChange={handleDescriptionChange}
                          value={dutiesDescription}
                        />
                      </div>
                    </div>
                  )}
                  {languageTab === "am" && (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="deptNameAm" className="block text-gray-700 text-sm font-bold mb-2">
                          አስተዳደር ስም
                        </label>
                        <input
                          required
                          type="text"
                          id="deptNameAm"
                          value={departmentNameAm}
                          onChange={(e) => {
                            setDeptNameAm(e.target.value);
                          }}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                          placeholder="የአስተዳደር ስም ያስገቡ"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="descriptionAm" className="block text-gray-700 text-sm font-bold mb-2">
                          የአስተዳደር መግለጫ:
                        </label>
                        <ReactQuill
                          id="descriptionAm"
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                          placeholder="የስራ መግለጫ ያስገቡ"
                          onChange={handleDescriptionChangeAm}
                          value={dutiesDescriptionAm}
                        />
                      </div>
                    </div>
                  )}
                  <fieldset className="m-5 p-2 border-2 ">
                    {languageTab === "en" && (
                      <div>
                        <legend className="block text-gray-700 font-bold mb-2">Executive Head</legend>
                        <div className="mb-4">
                          <label htmlFor="headName" className="block text-gray-700 text-sm font-bold mb-2">
                            Full Name
                          </label>
                          <input
                            required
                            type="text"
                            id="headName"
                            value={headName}
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
                            value={headTitle}
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                            placeholder="Enter Title"
                          />
                        </div>
                      </div>
                    )}
                    {languageTab === "am" && (
                      <div>
                        <legend className="block text-gray-700 font-bold mb-2"> ዋና አስተዳዳሪ </legend>
                        <div className="mb-4">
                          <label htmlFor="headNameAm" className="block text-gray-700 text-sm font-bold mb-2">
                            ሙሉ ስም
                          </label>
                          <input
                            required
                            type="text"
                            id="headNameAm"
                            value={headNameAm}
                            onChange={(e) => {
                              setFullNameAm(e.target.value);
                            }}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                            placeholder="ሙሉ ስም"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="titleAm" className="block text-gray-700 text-sm font-bold mb-2">
                            ርእሰ
                          </label>
                          <input
                            required
                            type="text"
                            id="titleAm"
                            value={headTitleAm}
                            onChange={(e) => {
                              setTitleAm(e.target.value);
                            }}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                            placeholder="ርእሰ"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        {languageTab === "en" ? "Profile Picture:" : "የፕሮፋይል ፎቶ:"}
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
