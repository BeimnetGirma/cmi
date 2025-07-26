"use client";
import { Announcement } from "@/types";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

type EditAnnouncementProps = {
  announcement: Announcement;
  editAnnouncement: (announcement: Announcement) => void;
};
const EditAnnouncement = ({ announcement, editAnnouncement }: EditAnnouncementProps) => {
  const [languageTab, setLanguageTab] = useState<"en" | "am">("en");
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(announcement.title);
  const [title_am, setTitle_am] = useState(announcement.title_am);
  const [link, setLink] = useState(announcement.link);
  const [description, setDescription] = useState(announcement.description);
  const [description_am, setDescription_am] = useState(announcement.description_am);
  const [filePath, setFilePath] = useState(announcement.attachment);
  const [file, setFile] = useState<File>();

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
    try {
      if (file) {
        const formData = new FormData();
        formData.set("file", file);
        const response = await fetch("/api/announcement/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          await response.json().then((data) => {
            if (data) {
              editAnnouncement({
                id: announcement.id,
                title: title,
                description: description,
                title_am: title_am,
                description_am: description_am,
                attachment: data.path,
                link: link,
              });
            }
          });
        }
      } else {
        editAnnouncement({
          id: announcement.id,
          title: title,
          title_am: title_am,
          attachment: filePath,
          description: description,
          description_am: description_am,
          link: link,
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
                {languageTab === "en" && <h1 className="text-slate-900 text-3xl relative ">Edit Announcement Details</h1>}
                {languageTab === "am" && <h1 className="text-slate-900 text-3xl relative ">ማስታወቂያ አዝምን</h1>}

                <form className="mt-8 relative">
                  {languageTab === "en" && (
                    <div>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
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
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                          Description:
                        </label>
                        <textarea
                          required
                          rows={6}
                          id="description"
                          value={description ?? ""}
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
                          type="text"
                          id="title_am"
                          value={title_am || ""}
                          onChange={(e) => {
                            setTitle_am(e.target.value);
                          }}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                          placeholder="Enter title"
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
                          value={description_am ?? ""}
                          onChange={(e) => {
                            setDescription_am(e.target.value);
                          }}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                          placeholder="Enter Announcement Description"
                        />
                      </div>
                    </div>
                  )}
                  <div className="mb-4">
                    <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">
                      {languageTab === "en" ? "Link:" : "መገኛ"}
                    </label>
                    <input
                      required
                      type="text"
                      id="link"
                      value={link ?? ""}
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Link"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
                      {languageTab === "en" ? "Attachment (PDF):" : "ተያያዥ (PDF):"}
                    </label>
                  </div>
                  <div className="mb-4">
                    {/* <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                      File:
                    </label> */}
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
                    <button className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 mx-2 rounded"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Update Announcement
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

export default EditAnnouncement;
