import prisma from "@/db";
import Link from "next/link";
import React from "react";
import Department from "@/components/Department";
import NewDepartment from "@/components/NewDepartment";
import { revalidatePath } from "next/cache";

type Department = { Department_Name: string };
const Departments = async () => {
  const departments = await prisma.department.findMany();
  async function createDepartment(newDepartment: Department) {
    "use server";

    try {
      await prisma.department.create({ data: newDepartment });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function editDepartment(oldDepartment: Department, newDepartment: Department) {
    "use server";

    try {
      await prisma.department.update({
        where: { Department_Name: oldDepartment.Department_Name },
        data: {
          Department_Name: newDepartment.Department_Name,
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteDepartment(departmentName: string) {
    "use server";
    console.log(departmentName);

    try {
      await prisma.department.delete({
        where: { Department_Name: departmentName },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col justify-center ">
      <div className="text-center">
        <h1 className="text-3xl text-blue-400  my-12">Departments</h1>
      </div>
      <div className="justify-end px-52">
        <NewDepartment createDepartment={createDepartment} />
        <table className="table-auto mx-auto w-1/2 my-4 border border-collapse ">
          <thead>
            <tr>
              <th className="p-6 font-bold border">Id</th>
              <th className="p-6 font-bold border">Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <Department key={index} department={department} index={index} editDepartment={editDepartment} deleteDepartment={deleteDepartment} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;
