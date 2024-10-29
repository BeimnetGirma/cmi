import React, { useState } from "react";
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
  CredenzaDescription,
} from "../ui/credenza";
import { Input } from "../ui/input";
import useLoading from "@/hooks/useLoading";
import { toast, Toaster } from "sonner";
import Papa from "papaparse";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import { createDepartment } from "./Departments";
import { Department } from "@/types";

const ImportFromCSV = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [file, setFile] = useState<File | null>(null);
  const handleParseComplete = async (results: Papa.ParseResult<unknown>) => {
    try {
      const createPromises = results.data.map((data: Department) => {
        return createDepartment({
          id: Number(data.id),
          name: data.name,
        } as Department);
      });
      await Promise.all(createPromises);
      toast.success("CSV file parsed and departments created successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      stopLoading();
    }
  };
  const handleCSVImport = async (e: any) => {
    e.preventDefault();
    try {
      if (!file) {
        toast.error("Please select a file");
        return;
      }
      startLoading();
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(file);
        const text = e.target?.result as string;
        Papa.parse<Department>(text, {
          header: true,
          complete: async (results) => {
            await handleParseComplete(results);
            // close the modal after successful import
            const close = document.querySelector(
              ".credenza-close"
            ) as HTMLButtonElement;
            close.click();
          },
          error: (error: Error) => {
            error instanceof Error && toast.error(error.message);
          },
        });
      };
      reader.readAsText(file as unknown as File);
    } catch (error) {
      error instanceof Error && toast.error(error.message as unknown as string);
    } finally {
      stopLoading();
    }
  };
  return (
    <div>
      <Toaster richColors position="top-right" />
      <Credenza>
        <CredenzaTrigger asChild>
          <button>Import</button>
        </CredenzaTrigger>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Import Departments from CSV</CredenzaTitle>
            <CredenzaDescription>
              The CSV file should contain a list of departments. It should have
              a header with id and name.
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <form className="flex space-x-2" onSubmit={handleCSVImport}>
              <Input
                id="picture"
                type="file"
                required
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="flex  justify-end">
                <Button
                  type="submit"
                  className="bg-primary-main flex space-x-2"
                >
                  {isLoading && <Spinner />} Import
                </Button>
              </div>
            </form>
          </CredenzaBody>
          <CredenzaFooter className="flex sm:justify-center">
            <CredenzaClose asChild>
              <button className="credenza-close">Close</button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </div>
  );
};

export default ImportFromCSV;
