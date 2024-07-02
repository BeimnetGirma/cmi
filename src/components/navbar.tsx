"use client";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import { SignOutButton, useUser } from "@clerk/nextjs";

const NavBar = () => {
  const { user, isLoaded } = useUser();
  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Researches",
      href: "/research",
    },
    {
      title: "Support",
      href: "/support",
    },

    {
      title: "Contact Us",
      href: "/contact",
    },
  ];
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div>
          <a href="#" className="flex items-center space-x-2">
            <Image src="/assets/imgs/logo.png" alt="Logo" width={80} height={80} />
          </a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.title} className="text-slate-900 hover:text-indigo-600">
              {link.title}
            </Link>
          ))}
          <LanguageSelector />

          {isLoaded && user ? (
            <SignOutButton redirectUrl="/">
              <button className="g-gray-400 text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors">Sign Out</button>
            </SignOutButton>
          ) : (
            <Link href={"/login"} className="g-gray-400 text-white rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
