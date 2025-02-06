"use client";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
interface EditHomePageProp {
  lng: string;
}
const EditHomePage = ({ ...EditHomePageProp }) => {
  const [data, setData] = useState<{
    companyName?: any;
    companyIntro?: any;
    aboutUs?: any;
    aboutUsIntro?: any;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/" + EditHomePageProp.lng);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const updateTranslation = () => {
    fetch("http://localhost:3000/api/" + EditHomePageProp.lng, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Translation Updated Successfully");
      })
      .catch((err) => {
        console.error("error");
        toast.error("Error Updating Translation");
      });
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    updateTranslation();
  };

  return (
    <div className="flex flex-col justify-center ">
      <div className="text-center">
        <h1 className="text-3xl text-blue-400  my-12">Update Home Page </h1>
      </div>
      <Toaster position="top-right" richColors />
      <div className="justify-end w-2/3 mx-auto px-52">
        {data && (
          <form onSubmit={handleSubmit} className="mt-8 relative">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Home Page Title:
              </label>
              <input
                type="text"
                value={data.companyName}
                onChange={(e) => {
                  setData({ ...data, companyName: e.target.value });
                }}
                id="home-title"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                placeholder="Enter title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="home-intro"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Home Page Introduction
              </label>
              <textarea
                id="home-intro"
                rows={10}
                value={data.companyIntro}
                onChange={(e) => {
                  setData({ ...data, companyIntro: e.target.value });
                }}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                placeholder="Enter introduction"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="home-about-title"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                About Section Title
              </label>
              <input
                type="text"
                value={data.aboutUs}
                onChange={(e) => {
                  setData({ ...data, aboutUs: e.target.value });
                }}
                id="home-about-title"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                placeholder="Enter Section Title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="home-about-content"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                About Section Content
              </label>
              <textarea
                id="home-about-content"
                rows={10}
                value={data.aboutUsIntro}
                onChange={(e) => {
                  setData({ ...data, aboutUsIntro: e.target.value });
                }}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                placeholder="Enter Section Content"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 mx-2 rounded"
              >
                Update Home Page
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditHomePage;
