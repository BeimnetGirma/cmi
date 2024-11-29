import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const renameFile = (file: File) => {
  const removedSpaces = file.name.replace(/\s/g, "_");
  return removedSpaces;
};
