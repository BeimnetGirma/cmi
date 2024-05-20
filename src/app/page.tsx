import Navbar from "@/components/navbar";
import Image from "next/image";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "login",
    href: "/login",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
export default function Home() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-between p-24"></main>
    </>
  );
}
