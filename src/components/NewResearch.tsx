"use client";
import useLoading from "@/hooks/useLoading";
import { Department, Research } from "@/types";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import Spinner from "./ui/spinner";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
type NewResearchProps = {
  departments: Department[];
  createResearch: (research: Research) => void;
};

const NewResearch = ({ departments, createResearch }: NewResearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState<Date | undefined>(new Date());
  const [file, setFile] = useState<File>();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!file) return;
    try {
      startLoading();
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        stopLoading();
        toast.error("Failed to publish the research.", {
          duration: 3000,
          description: response.statusText,
        });
        console.error(response);
        return;
      }
      if (response.ok) {
        await response.json().then((data) => {
          if (data) {
            var filePath = data.path;
            const research: Research = {
              title: title,
              deptId: parseInt(department),
              year: new Date(year),
              path: filePath,
            };
            createResearch(research);
            toast.success("Research added successfully", {
              duration: 3000,
            });
            closeModal();
          }
        });
      }
    } catch (error) {
      stopLoading();
      if (error instanceof Error) {
        toast.error("Failed to publish the research.", {
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
        <button
          className="bg-green-600 text-white rounded-md py-4  m-2 px-10 item-center"
          onClick={openModal}
        >
          New
        </button>
      </div>
      {isOpen && (
        <div>
          <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-60 w-2/4 mx-auto items-center bg-black justify-center">
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
                Add New Research
              </h1>

              <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title:
                  </label>
                  <input
                    required
                    type="text"
                    id="title"
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

                  <select
                    required
                    name="department"
                    id="department"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    defaultValue={0}
                  >
                    <option selected disabled>
                      Select Department
                    </option>
                    {departments.map((dept, index) => (
                      <option value={dept.id} key={index}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="year"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Year:
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !year && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {year ? format(year, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={year}
                        onSelect={setYear}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    required
                    onChange={(e) => {
                      setFile(e.target.files?.[0]);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <div className="flex space-x-2">
                      {isLoading && <Spinner />}
                      <span>Add Research</span>
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

export default NewResearch;
