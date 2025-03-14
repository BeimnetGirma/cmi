"use client";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface EditPageContentProp {
  lng: string;
}
const EditPageContents = ({ ...EditPageContentProp }) => {
  const [data, setData] = useState<{
    companyName?: any;
    companyIntro?: any;
    aboutUs?: any;
    aboutUsIntro?: any;
    mission?: any;
    missionContent?: any;
    vision?: any;
    visionContent?: any;
    values?: any;
    valuesContent?: any;
    backgroundTitle?: any;
    backgroundContent?: any;
    powerAndDutiesTitle?: any;
    powerAndDutiesContent?: any;
    powerAndDutiesDetail?: any;
  } | null>(null);
  const [powerAndDutiesDetailText, setPowerAndDutiesDetailText] = useState("");
  const [language, setLanguage] = useState(EditPageContentProp.lng);

  const fetchData = async () => {
    const response = await fetch("/api/" + language);
    const data = await response.json();
    setData(data);

    if (data.powerAndDutiesDetail) {
      setPowerAndDutiesDetailText(data.powerAndDutiesDetail.details.join("\n"));
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  const updateTranslation = () => {
    // Convert text area back into an array (split by new lines)
    const updatedPowerAndDuties = powerAndDutiesDetailText
      .split("\n")
      .map((line) => line.trim()) // Remove extra spaces
      .filter((line) => line !== ""); // Remove empty lines

    const updatedData = {
      ...data,
      powerAndDutiesDetail: { details: updatedPowerAndDuties },
    };

    fetch("http://localhost:3000/api/" + EditPageContentProp.lng, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        toast.success("Translation Updated Successfully");
      })
      .catch((err) => {
        console.error("error");
        toast.error("Error Updating Translation");
      });
  };
  const handlePowerAndDutiesDetailChange = (e: any) => {
    setPowerAndDutiesDetailText(e.target.value);
    // setData({ ...data, powerAndDutiesDetail: { details: e.target.value.split("\n") } });
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    updateTranslation();
  };

  return (
    <div className="flex flex-col justify-center ">
      <div className="text-center">
        <h1 className="text-3xl text-blue-400  my-12">Update Static Page Cotents</h1>
      </div>
      <div className="flex justify-center mb-4">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
        >
          <option value="en">English</option>
          <option value="am">Amharic</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <Toaster position="top-right" richColors />

      <div className="justify-end w-2/3 mx-auto px-52">
        {data && (
          <form onSubmit={handleSubmit} className="mt-8 relative">
            <Tabs defaultValue="home" className=" justify-center text-center">
              <TabsList className="p-6">
                <TabsTrigger value="home" className="p-3">
                  Home Page
                </TabsTrigger>
                <TabsTrigger value="about" className="p-3">
                  About Us Page
                </TabsTrigger>
              </TabsList>
              <TabsContent value="home">
                <div>
                  <div className="text-left">
                    <h1 className="text-2xl text-blue-400  my-5">Home Page</h1>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
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
                    <label htmlFor="home-intro" className="block text-gray-700 text-sm font-bold mb-2">
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
                    <label htmlFor="home-about-title" className="block text-gray-700 text-sm font-bold mb-2">
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
                    <label htmlFor="home-about-content" className="block text-gray-700 text-sm font-bold mb-2">
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
                </div>
              </TabsContent>
              <TabsContent value="about">
                <div>
                  <div className="text-left">
                    <h1 className="text-2xl text-blue-400  my-5">About Us Page</h1>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="box1-title" className="block text-gray-700 text-sm font-bold mb-2">
                      Box 1 Title:
                    </label>
                    <input
                      type="text"
                      value={data.mission}
                      onChange={(e) => {
                        setData({ ...data, mission: e.target.value });
                      }}
                      id="box1-title"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="box-1-content" className="block text-gray-700 text-sm font-bold mb-2">
                      Box 1 Content
                    </label>
                    <textarea
                      id="box-1-content"
                      rows={5}
                      value={data.missionContent}
                      onChange={(e) => {
                        setData({ ...data, missionContent: e.target.value });
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Section Content"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="box2-title" className="block text-gray-700 text-sm font-bold mb-2">
                      Box 2 Title:
                    </label>
                    <input
                      type="text"
                      value={data.vision}
                      onChange={(e) => {
                        setData({ ...data, vision: e.target.value });
                      }}
                      id="box2-title"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="box-2-content" className="block text-gray-700 text-sm font-bold mb-2">
                      Box 2 Content
                    </label>
                    <textarea
                      id="box-2-content"
                      rows={5}
                      value={data.visionContent}
                      onChange={(e) => {
                        setData({ ...data, visionContent: e.target.value });
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Section Content"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="box3-title" className="block text-gray-700 text-sm font-bold mb-2">
                      Box 3 Title:
                    </label>
                    <input
                      type="text"
                      value={data.values}
                      onChange={(e) => {
                        setData({ ...data, values: e.target.value });
                      }}
                      id="box3-title"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="box-3-content" className="block text-gray-700 text-sm font-bold mb-2">
                      Box 3 Content
                    </label>
                    <textarea
                      id="box-3-content"
                      rows={5}
                      value={data.valuesContent}
                      onChange={(e) => {
                        setData({ ...data, valuesContent: e.target.value });
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Section Content"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="background-title" className="block text-gray-700 text-sm font-bold mb-2">
                      Background Title:
                    </label>
                    <input
                      type="text"
                      value={data.backgroundTitle}
                      onChange={(e) => {
                        setData({ ...data, backgroundTitle: e.target.value });
                      }}
                      id="background-title"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="background-content" className="block text-gray-700 text-sm font-bold mb-2">
                      Background Content
                    </label>
                    <textarea
                      id="background-content"
                      rows={5}
                      value={data.backgroundContent}
                      onChange={(e) => {
                        setData({ ...data, backgroundContent: e.target.value });
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Section Content"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="powersandduties-title" className="block text-gray-700 text-sm font-bold mb-2">
                      Powers and Duties Title:
                    </label>
                    <input
                      type="text"
                      value={data.powerAndDutiesTitle}
                      onChange={(e) => {
                        setData({ ...data, powerAndDutiesTitle: e.target.value });
                      }}
                      id="powersandduties-title"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="powersandduties-content" className="block text-gray-700 text-sm font-bold mb-2">
                      Powers and Duties Introduction
                    </label>
                    <textarea
                      id="powersandduties-content"
                      rows={3}
                      value={data.powerAndDutiesContent}
                      onChange={(e) => {
                        setData({ ...data, powerAndDutiesContent: e.target.value });
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Section Content"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="powersandduties-details" className="block text-gray-700 text-sm font-bold mb-2">
                      Powers and Duties Details
                    </label>
                    <textarea
                      id="powersandduties-details"
                      rows={data.powerAndDutiesDetail ? data.powerAndDutiesDetail.details.length : 5}
                      value={powerAndDutiesDetailText}
                      onChange={handlePowerAndDutiesDetailChange}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Section Content"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <button
                type="reset"
                className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2"
                onClick={() => {
                  fetchData();
                  toast.info("Changes reverted");
                }}
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 mx-2 rounded">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPageContents;
