import { PageProps, Department } from "@/types";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

const DepartmentMenu: React.FC<PageProps & { departments: Department[] }> = ({ departments, params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <>
      <DropdownMenu
        open={openDropdown}
        onOpenChange={() => {
          setOpenDropdown(false);
        }}
      >
        <section onMouseEnter={() => setOpenDropdown(true)} onMouseLeave={() => setOpenDropdown(false)}>
          <DropdownMenuTrigger asChild onMouseEnter={() => setOpenDropdown(true)}>
            <li className="py-4">
              <span className="hover:text-secondary-highlight transition-colors cursor-pointer ">{t("departments")}</span>
            </li>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 " onMouseLeave={() => setOpenDropdown(false)}>
            {departments.map((department, index) => (
              <DropdownMenuItem key={index} className="mt-2">
                <Link href={`/department/${department.name}`} className="hover:text-slate-500 ">
                  {department.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </section>
      </DropdownMenu>
      {/* <div className="relative" onMouseEnter={() => setShowDepartments(true)} onMouseLeave={() => setShowDepartments(false)}>
        <Link href="#" className={`text-slate-700 font-normal hover:text-slate-400  transition-colors`}>
          {t("departments").toUpperCase()}
        </Link>
        {showDepartments && (
          <div className="absolute top-full left-0 w-96 bg-white shadow-md rounded-md py-2">
            {departments.map((department, index) => (
              <Link
                href={{
                  pathname: "department",
                  query: { dept: department.name },
                }}
                key={index}
                className="block px-4 py-2 hover:text-slate-400 transition-colors"
              >
                {department.name}
              </Link>
            ))}
          </div>
        )}
      </div> */}
    </>
  );
};

export default DepartmentMenu;
