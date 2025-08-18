"use client";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import Spinner from "../ui/spinner";

interface EventProps {
  createEvent: (data: any) => Promise<boolean>;
  editEvent?: (data: any) => Promise<boolean>;
  existingEvent?: any;
}

const NewEvent: React.FC<EventProps> = ({ createEvent, editEvent, existingEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [titleEn, setTitleEn] = useState("");
  const [titleAm, setTitleAm] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAm, setDescriptionAm] = useState("");
  const [bannerEn, setBannerEn] = useState<File | null>(null);
  const [bannerAm, setBannerAm] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [endDate, setEndDate] = useState("");

  const [bannerEnPreview, setBannerEnPreview] = useState<string | null>(null);
  const [bannerAmPreview, setBannerAmPreview] = useState<string | null>(null);

  useEffect(() => {
    if (existingEvent) {
      setTitleEn(existingEvent.title_en);
      setTitleAm(existingEvent.title_am || "");
      setDescriptionEn(existingEvent.description_en);
      setDescriptionAm(existingEvent.description_am || "");
      setLink(existingEvent.link || "");
      setEndDate(existingEvent.endDate ? new Date(existingEvent.endDate).toISOString().slice(0, 10) : "");
      setBannerEnPreview(existingEvent.banner_en || null);
      setBannerAmPreview(existingEvent.banner_am || null);
    }
  }, [existingEvent]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFileChange = (setter: any, previewSetter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setter(file);
    if (file) {
      previewSetter(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload function adapted from service upload
      const uploadFile = async (file: File | null): Promise<string | undefined> => {
        if (!file) return undefined;

        const uploadFd = new FormData();
        uploadFd.set("image", file);

        const res = await fetch(`/api/service/`, { method: "POST", body: uploadFd });
        if (!res.ok) {
          const text = await res.text();
          toast.error("Image upload failed: " + (text || res.statusText));
          return undefined;
        }
        const json = await res.json();
        if (!json?.success) {
          toast.error("Image upload failed.");
          return undefined;
        }

        return json.imagePath; // <- same as your service logic
      };

      // Try upload both banners
      const bannerEnPath = (await uploadFile(bannerEn)) || bannerEnPreview;
      const bannerAmPath = (await uploadFile(bannerAm)) || bannerAmPreview;

      const eventData = {
        id: existingEvent?.id,
        title_en: titleEn,
        title_am: titleAm,
        description_en: descriptionEn,
        description_am: descriptionAm,
        banner_en: bannerEnPath,
        banner_am: bannerAmPath,
        link: link || null,
        endDate,
      };

      const success = existingEvent ? await editEvent!(eventData) : await createEvent(eventData);

      if (success) {
        toast.success(existingEvent ? "Event updated!" : "Event created!");
        setIsOpen(false);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error. See console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" richColors />
      <div className="flex flex-row justify-end">
        {existingEvent ? (
          <button onClick={openModal}>
            <svg className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </button>
        ) : (
          <button className="bg-green-600 text-white rounded-md py-4 m-2 px-10" onClick={openModal}>
            New
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/50" onClick={closeModal}></div>

          <div className="fixed inset-12 z-40 mx-auto w-3/5 max-h-[76vh] overflow-auto rounded-lg bg-white p-6">
            <button className="absolute top-4 right-6 text-gray-600" onClick={closeModal} aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="mb-4 text-2xl font-semibold text-slate-900">{existingEvent ? "Edit Event" : "Add New Event"}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Titles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title (EN)</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title (AM)</label>
                  <input
                    type="text"
                    value={titleAm}
                    onChange={(e) => setTitleAm(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
                  <textarea
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (AM)</label>
                  <textarea
                    value={descriptionAm}
                    onChange={(e) => setDescriptionAm(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                    rows={4}
                  />
                </div>
              </div>

              {/* Banners */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banner (EN)</label>
                  <input type="file" accept="image/*" onChange={handleFileChange(setBannerEn, setBannerEnPreview)} className="mt-1 block w-full" />
                  {bannerEnPreview && <img src={bannerEnPreview} alt="EN preview" className="mt-2 w-32 h-32 object-contain" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banner (AM)</label>
                  <input type="file" accept="image/*" onChange={handleFileChange(setBannerAm, setBannerAmPreview)} className="mt-1 block w-full" />
                  {bannerAmPreview && <img src={bannerAmPreview} alt="AM preview" className="mt-2 w-32 h-32 object-contain" />}
                </div>
              </div>

              {/* End date and link */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Optional Link</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="rounded border px-4 py-2">
                  Cancel
                </button>
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white flex items-center gap-2">
                  {isLoading && <Spinner />}
                  {existingEvent ? "Save Changes" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default NewEvent;
