"use client";
import useLoading from "@/hooks/useLoading";
import { Executive } from "@prisma/client";
import React, { useState } from "react";
import Spinner from "../ui/spinner";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";
import { toast, Toaster } from "sonner";

type EditProfileProps = {
  executive: Executive;
  editProfile: (executive: Executive) => void;
};
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditExecutive = ({ executive, editProfile }: EditProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [languageTab, setLanguageTab] = useState<"en" | "am">("en"); // Default to English
  const [headName, setFullName] = useState(executive.headName);
  const [headTitle, setTitle] = useState(executive.headTitle);
  const [dutiesDescription, setDescription] = useState(executive.dutiesDescription);
  const [departmentName, setDeptName] = useState(executive.departmentName);
  const [headName_am, setFullNameAm] = useState(executive.headName_am);
  const [headTitle_am, setTitleAm] = useState(executive.headTitle_am);
  const [dutiesDescription_am, setDescriptionAm] = useState(executive.dutiesDescription_am);
  const [departmentName_am, setDeptNameAm] = useState(executive.departmentName_am);
  const [imagePath, setImagePath] = useState(executive.imagePath);
  const [image, setImage] = useState<File>();
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
    if (!(departmentName_am ?? "").trim()) missingFields.push("የመምሪያ ስም (Amharic)");
    if (!(dutiesDescription_am ?? "").trim()) missingFields.push("የተግባር መግለጫ (Amharic)");
    if (!(headName_am ?? "").trim()) missingFields.push("የኃላፊ ስም (Amharic)");
    if (!(headTitle_am ?? "").trim()) missingFields.push("የኃላፊ የስራ መደብ (Amharic)");

    if (missingFields.length > 0) {
      toast.error("Please fill out the following fields:\n\n" + missingFields.join("\n"));
      return;
    }
    try {
      if (image) {
        const formData = new FormData();
        formData.set("image", image);
        const response = await fetch("/api/profile", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          await response.json().then((data) => {
            if (data) {
              editProfile({
                departmentName: departmentName,
                dutiesDescription: DOMPurify.sanitize(dutiesDescription),
                headName: headName,
                headTitle: headTitle,
                departmentName_am: departmentName_am,
                dutiesDescription_am: DOMPurify.sanitize(dutiesDescription_am || ""),
                headName_am: headName_am,
                headTitle_am: headTitle_am,
                imagePath: data.imagePath,
                id: executive.id,
                createdAt: executive.createdAt,
                updatedAt: executive.updatedAt,
              });
            }
          });
        }
      } else {
        editProfile({
          departmentName: departmentName,
          dutiesDescription: DOMPurify.sanitize(dutiesDescription),
          headName: headName,
          headTitle: headTitle,
          departmentName_am: departmentName_am,
          dutiesDescription_am: DOMPurify.sanitize(dutiesDescription_am || ""),
          headName_am: headName_am,
          headTitle_am: headTitle_am,
          imagePath: imagePath,
          id: executive.id,
          createdAt: executive.createdAt,
          updatedAt: executive.updatedAt,
        });
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Toaster position="top-right" richColors />
      <button onClick={openModal}>
        <svg className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" /> <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /> <line x1="16" y1="5" x2="19" y2="8" />
        </svg>
      </button>
      <div>
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
                {languageTab === "en" && <h1 className="text-slate-900 text-3xl relative ">Update Executive</h1>}
                {languageTab === "am" && <h1 className="text-slate-900 text-3xl relative ">አስተዳደር አዘምን</h1>}

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
                          placeholder="Enter Full Name"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                          Executive Description:
                        </label>
                        <ReactQuill
                          id="description"
                          value={dutiesDescription}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                          placeholder="Enter Job Description"
                          onChange={handleDescriptionChange}
                        />
                      </div>
                    </div>
                  )}
                  {languageTab === "am" && (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="deptNameAm" className="block text-gray-700 text-sm font-bold mb-2">
                          የአስተዳደር ስም
                        </label>
                        <input
                          required
                          type="text"
                          id="deptNameAm"
                          value={departmentName_am || ""}
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
                          value={dutiesDescription_am}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                          placeholder="የአስተዳደር መግለጫ ያስገቡ"
                          onChange={handleDescriptionChangeAm}
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
                        <legend className="block text-gray-700 font-bold mb-2">ዋና አስተዳዳሪ </legend>
                        <div className="mb-4">
                          <label htmlFor="headNameAm" className="block text-gray-700 text-sm font-bold mb-2">
                            ሙሉ ስም
                          </label>
                          <input
                            required
                            type="text"
                            id="headNameAm"
                            value={headName_am || ""}
                            onChange={(e) => {
                              setFullNameAm(e.target.value);
                            }}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                            placeholder="ዋና አስተዳዳሪ ሙሉ ስም ያስገቡ"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="titleAm" className="block text-gray-700 text-sm font-bold mb-2">
                            አስተዳዳሪ ርዕስ
                          </label>
                          <input
                            required
                            type="text"
                            id="titleAm"
                            value={headTitle_am || ""}
                            onChange={(e) => {
                              setTitleAm(e.target.value);
                            }}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                            placeholder="ዋና አስተዳዳሪ ርዕስ ያስገቡ"
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
                        onChange={(e) => {
                          setImage(e.target.files?.[0]);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      />
                    </div>
                  </fieldset>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <div className="flex space-x-2">
                        {isLoading && <Spinner />}
                        <span>Update Profile</span>
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

export default EditExecutive;
