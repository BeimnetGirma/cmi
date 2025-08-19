"use client";
import useLoading from "@/hooks/useLoading";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Spinner from "../ui/spinner";
import { ServiceTranslationInput, SubServiceTranslationInput, SubServiceInput, ServiceFormInput } from "@/types";
import { createService } from "./services";
type NewServiceProps = {
  createService: (payload: any) => Promise<boolean>;
  editService?: (payload: any) => Promise<boolean>;
  existingService?: ServiceFormInput | null;
};

const LANGS = ["en", "am"];

const NewService = ({ createService, editService, existingService }: NewServiceProps) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);

  const [slug, setSlug] = useState(existingService?.slug ?? "");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [backgroundFile, setBackgroundFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>(existingService?.imageUrl ?? undefined);
  const [backgroundPreview, setBackgroundPreview] = useState<string | undefined>(existingService?.backgroundImageUrl ?? undefined);

  // Ensure translations array always contains en + am
  const buildInitialTranslations = (from?: ServiceTranslationInput[]) => {
    return LANGS.map((lang) => {
      const found = from?.find((t) => t.language === lang);
      return {
        id: found?.id,
        language: lang,
        title: found?.title ?? "",
        summary: found?.summary ?? "",
        content: found?.content ? (typeof found.content === "string" ? found.content : JSON.stringify(found.content)) : "",
      };
    });
  };

  const [translations, setTranslations] = useState<ServiceTranslationInput[]>(buildInitialTranslations(existingService?.translations));

  // Subservices: ensure each subservice has translations for en & am
  const buildInitialSubservices = (from?: SubServiceInput[]) => {
    if (!from || from.length === 0) {
      return [
        {
          id: undefined,
          order: 1,
          link: "",
          translations: LANGS.map((lang) => ({ language: lang, title: "", description: "" })),
        } as SubServiceInput,
      ];
    }
    return from.map((ss, idx) => ({
      id: ss.id,
      order: ss.order ?? idx + 1,
      link: ss.link ?? "",
      translations: LANGS.map((lang) => {
        const found = ss.translations?.find((t) => t.language === lang);
        return {
          id: found?.id,
          language: lang,
          title: found?.title ?? "",
          description: found?.description ?? "",
        } as SubServiceTranslationInput;
      }),
    }));
  };

  const [subservices, setSubservices] = useState<SubServiceInput[]>(buildInitialSubservices(existingService?.subservices));

  // If existingService changes after mount, re-populate
  useEffect(() => {
    if (existingService) {
      setSlug(existingService.slug ?? "");
      setImagePreview(existingService.imageUrl ?? undefined);
      setBackgroundPreview(existingService.backgroundImageUrl ?? undefined);
      setTranslations(buildInitialTranslations(existingService.translations));
      setSubservices(buildInitialSubservices(existingService.subservices));
    }
  }, [existingService]);

  // Helpers
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(String(reader.result));
    };
    reader.readAsDataURL(file);
  }
  function handleBackgroundChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBackgroundFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackgroundPreview(String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  // Slug helper from english title (if empty)
  useEffect(() => {
    const enTitle = translations.find((t) => t.language === "en")?.title ?? "";
    if (!slug && enTitle) {
      const s = enTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setSlug(s);
    }
    // only run when en title changes or slug empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translations[0]?.title]);

  function updateTranslation(lang: string, field: keyof ServiceTranslationInput, value: any) {
    setTranslations((prev) => prev.map((t) => (t.language === lang ? { ...t, [field]: value } : t)));
  }

  function addSubservice() {
    setSubservices((prev) => [
      ...prev,
      {
        id: undefined,
        order: prev.length + 1,
        link: "",
        translations: LANGS.map((lang) => ({ language: lang, title: "", description: "" })),
      },
    ]);
  }

  function removeSubservice(index: number) {
    setSubservices((prev) => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 })));
  }

  function updateSubserviceField(index: number, field: keyof SubServiceInput, value: any) {
    setSubservices((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function updateSubserviceTranslation(index: number, lang: string, field: keyof SubServiceTranslationInput, value: any) {
    setSubservices((prev) =>
      prev.map((s, i) =>
        i === index
          ? {
              ...s,
              translations: s.translations.map((st) => (st.language === lang ? { ...st, [field]: value } : st)),
            }
          : s
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startLoading?.();

    try {
      // 1) Upload image if a new file was chosen
      let imagePath = imagePreview ?? null; // fallback to existing preview/url or null
      if (imageFile) {
        const uploadFd = new FormData();
        uploadFd.set("image", imageFile);
        const res = await fetch(`/api/service/`, { method: "POST", body: uploadFd });
        if (!res.ok) {
          const text = await res.text();
          toast.error("Image upload failed: " + (text || res.statusText));
          stopLoading?.();
          return;
        }
        const json = await res.json();
        if (!json?.success) {
          toast.error("Image upload failed.");
          stopLoading?.();
          return;
        }
        imagePath = json.imagePath;
      }
      // 2) Upload background image if a new file was chosen
      let backgroundImagePath = backgroundPreview ?? null;
      if (backgroundFile) {
        const uploadFd = new FormData();
        uploadFd.set("image", backgroundFile);
        const res = await fetch(`/api/service/`, { method: "POST", body: uploadFd });
        if (!res.ok) {
          const text = await res.text();
          toast.error("Background image upload failed: " + (text || res.statusText));
          stopLoading?.();
          return;
        }
        const json = await res.json();
        if (!json?.success) {
          toast.error("Background image upload failed.");
          stopLoading?.();
          return;
        }
        backgroundImagePath = json.imagePath;
        console.log("************************************************************");
        console.log("************************************************************");
        console.log("************************************************************");
        console.log(backgroundImagePath);
      }

      // 2) Build payload that matches the Prisma nested create/update shape
      const payload: any = {
        slug: slug || undefined,
        imageUrl: imagePath ?? undefined,
        backgroundImageUrl: backgroundImagePath ?? undefined,
        translations: translations.map((t) => ({
          language: t.language,
          title: t.title,
          summary: t.summary ?? undefined,
          content: t.content ? (isJsonString(t.content) ? tryParseJson(t.content) : t.content) : undefined,
        })),
        subservices: subservices.map((s, idx) => ({
          order: s.order ?? idx + 1,
          link: s.link ?? undefined,
          translations: s.translations.map((st) => ({
            language: st.language,
            title: st.title,
            description: st.description ?? undefined,
          })),
        })),
      };

      // If editing, include id
      if (existingService?.id && editService) {
        payload.id = existingService.id;
        console.log(payload);

        const ok = await editService(payload);
        if (ok) {
          toast.success("Service updated.");
          closeModal();
        } else {
          toast.error("Failed to update service.");
        }
      } else {
        const ok = await createService(payload);
        if (ok) {
          toast.success("Service created.");
          // reset form
          setSlug("");
          setImageFile(undefined);
          setImagePreview(undefined);
          setBackgroundFile(undefined);
          setBackgroundPreview(undefined);
          setTranslations(buildInitialTranslations([]));
          setSubservices(buildInitialSubservices([]));
          closeModal();
        } else {
          toast.error("Failed to create service.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error. See console.");
    } finally {
      stopLoading?.();
    }
  }
  return (
    <div>
      <Toaster position="top-right" richColors />
      <div className="flex flex-row justify-end">
        {existingService ? (
          <button onClick={openModal}>
            <svg className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" /> <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /> <line x1="16" y1="5" x2="19" y2="8" />
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

            <h2 className="mb-4 text-2xl font-semibold text-slate-900">{existingService ? "Edit Service" : "Add New Service"}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-blue-500"
                    placeholder="auto-generated from English title if left empty"
                  />
                </div>

                <div className="flex-col">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Icon / Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full" />
                    {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 w-20 h-20 object-contain" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Background Image</label>
                    <input type="file" accept="image/*" onChange={handleBackgroundChange} className="mt-1 block w-full" />
                    {backgroundPreview && <img src={backgroundPreview} alt="preview" className="mt-2 w-20 h-20 object-contain" />}
                  </div>
                </div>
              </div>

              {/* Translations */}
              <div className="grid grid-cols-2 gap-4">
                {translations.map((t) => (
                  <div key={t.language} className="space-y-3 border p-3 rounded">
                    <h3 className="text-sm font-semibold uppercase">{t.language === "en" ? "English" : "Amharic"}</h3>

                    <div>
                      <label className="block text-xs font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={t.title}
                        onChange={(e) => updateTranslation(t.language, "title", e.target.value)}
                        className="mt-1 block w-full rounded-md border px-2 py-2 focus:outline-blue-500"
                        required={t.language === "en"} // require english at least
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700">Summary</label>
                      <input
                        type="text"
                        value={t.summary ?? ""}
                        onChange={(e) => updateTranslation(t.language, "summary", e.target.value)}
                        className="mt-1 block w-full rounded-md border px-2 py-2 focus:outline-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700">Content</label>
                      <textarea
                        value={t.content ?? ""}
                        onChange={(e) => updateTranslation(t.language, "content", e.target.value)}
                        className="mt-1 block w-full rounded-md border px-2 py-2 focus:outline-blue-500"
                        rows={5}
                        required={t.language === "en"}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Subservices */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Subservices</h3>
                  <button type="button" onClick={addSubservice} className="text-blue-600 underline">
                    + Add Subservice
                  </button>
                </div>

                {subservices.map((ss, idx) => (
                  <div key={ss.id ?? `temp-${idx}`} className="rounded border p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700">Link (optional)</label>
                        <input
                          type="url"
                          value={ss.link ?? ""}
                          onChange={(e) => updateSubserviceField(idx, "link", e.target.value)}
                          placeholder="https://example.com"
                          className="mt-1 block w-full rounded-md border px-2 py-2"
                        />
                      </div>

                      <div className="ml-3">
                        <label className="block text-xs font-medium text-gray-700">Order</label>
                        <input
                          type="number"
                          value={ss.order ?? idx + 1}
                          onChange={(e) => updateSubserviceField(idx, "order", Number(e.target.value))}
                          className="mt-1 w-20 rounded-md border px-2 py-2"
                        />
                      </div>

                      <div className="ml-3">
                        <button type="button" className="text-red-500 mt-6" onClick={() => removeSubservice(idx)}>
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                      {ss.translations.map((st) => (
                        <div key={st.language} className="space-y-2 border rounded p-2">
                          <h4 className="text-sm font-medium uppercase">{st.language === "en" ? "EN" : "AM"}</h4>
                          <div>
                            <label className="block text-xs">Title</label>
                            <input
                              type="text"
                              value={st.title}
                              onChange={(e) => updateSubserviceTranslation(idx, st.language, "title", e.target.value)}
                              className="mt-1 block w-full rounded-md border px-2 py-2"
                              required={st.language === "en"}
                            />
                          </div>
                          <div>
                            <label className="block text-xs">Description</label>
                            <textarea
                              value={st.description ?? ""}
                              onChange={(e) => updateSubserviceTranslation(idx, st.language, "description", e.target.value)}
                              className="mt-1 block w-full rounded-md border px-2 py-2"
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="rounded border px-4 py-2">
                  Cancel
                </button>
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
                  <div className="flex items-center gap-2">
                    {isLoading && <Spinner />}
                    <span>{existingService ? "Save Changes" : "Add Service"}</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

/* Helpers */
function isJsonString(s: any) {
  if (typeof s !== "string") return false;
  try {
    JSON.parse(s);
    return true;
  } catch {
    return false;
  }
}
function tryParseJson(s: any) {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}

export default NewService;
