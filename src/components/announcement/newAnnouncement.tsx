"use client";
import useLoading from "@/hooks/useLoading";
import { Announcement } from "@/types";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

import Spinner from "../ui/spinner";

type NewAnnouncementProps = {
  createAnnouncement: (announcement: Announcement) => void;
};

const NewAnnouncement = ({ createAnnouncement }: NewAnnouncementProps) => {
  const [languageTab, setLanguageTab] = useState<"en" | "am">("en");
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [title_am, setTitle_am] = useState("");
  const [description_am, setDescription_am] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const missingFields = [];
    if (!title) missingFields.push("Title");
    if (!title_am) missingFields.push("ርዕስ");
    if (!description_am) missingFields.push("መግለጫ");
    if (!description) missingFields.push("Description");
    if (!link) missingFields.push("Link");
    if (!file) missingFields.push("File");
    if (missingFields.length > 0) {
      toast.error(`Please fill in the following fields: ${missingFields.join(", ")}`, {
        duration: 3000,
      });
      return;
    }
    var attachment_filePath = "";
    var attachment_originalName = "";

    try {
      if (file) {
        startLoading();
        const formData = new FormData();
        formData.set("file", file);
        const response = await fetch(`/api/announcement/`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          stopLoading();
          toast.error("Failed to upload the attachment.", {
            duration: 3000,
            description: response.statusText,
          });
          console.error(response);
          return;
        }
        const data = await response.json();
        if (data.success) {
          attachment_filePath = data.path;
          attachment_originalName = file.name;
        }
      }
      const filePath = attachment_filePath;
      const originalName = attachment_originalName;
      const newAnnouncement: Announcement = {
        title: title,
        description,
        title_am,
        description_am,
        link,
        attachment: JSON.stringify({
          filePath,
          originalName,
        }),
      };
      await createAnnouncement(newAnnouncement);
      toast.success("Announcement posted successfully", {
        duration: 3000,
      });
      closeModal();
    } catch (error) {
      stopLoading();
      if (error instanceof Error) {
        toast.error("Failed to post the announcement.", {
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
              {languageTab === "en" && <h1 className="text-slate-900 text-3xl relative ">Add New Announcement</h1>}
              {languageTab === "am" && <h1 className="text-slate-900 text-3xl relative ">አዲስ ማስታወቂያ አክል</h1>}

              <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
                {languageTab === "en" && (
                  <div>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title:
                      </label>
                      <input
                        required
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
                      <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description:
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={description}
                        id="description"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        placeholder="Enter Announcement Description"
                      />
                    </div>
                  </div>
                )}
                {languageTab === "am" && (
                  <div>
                    <div className="mb-4">
                      <label htmlFor="title_am" className="block text-gray-700 text-sm font-bold mb-2">
                        ርዕስ:
                      </label>
                      <input
                        required
                        type="text"
                        id="title_am"
                        onChange={(e) => {
                          setTitle_am(e.target.value);
                        }}
                        value={title_am}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        placeholder="ርዕስ ያስገቡ"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description_am" className="block text-gray-700 text-sm font-bold mb-2">
                        መግለጫ:
                      </label>
                      <textarea
                        required
                        rows={6}
                        id="description_am"
                        onChange={(e) => {
                          setDescription_am(e.target.value);
                        }}
                        value={description_am}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        placeholder="መግለጫ ያስገቡ"
                      />
                    </div>
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
                    {languageTab === "en" ? "Link:" : "መገኛ"}
                  </label>
                  <input
                    type="text"
                    id="link"
                    maxLength={200}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                    placeholder={languageTab === "en" ? "Enter link" : "መገኛ ያስገቡ"}
                  />
                </div>
                <label className="block text-gray-500 text-sm font-semibold mb-2 ml-3">OR</label>
                <div className="mb-4">
                  <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                    {languageTab === "en" ? "Attachment (PDF):" : "ተያያዥ (PDF):"}
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".pdf"
                    onChange={(e) => {
                      setFile(e.target?.files?.[0]);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <div className="flex space-x-2">
                      {isLoading && <Spinner />}
                      <span>Post Announcement</span>
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

export default NewAnnouncement;
