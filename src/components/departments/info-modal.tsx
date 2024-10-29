import React from "react";
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "../ui/credenza";

const ImportModalInfo = () => {
  return (
    <div>
      <Credenza>
        <CredenzaTrigger asChild>
          <button>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
          </button>
        </CredenzaTrigger>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Import Departments from CSV</CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody>
            The CSV file should contain a list of departments. It should have a
            header with id and name.
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <button>Close</button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </div>
  );
};

export default ImportModalInfo;
