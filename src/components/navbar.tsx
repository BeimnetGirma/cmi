import NavLinks from "@/route-links";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="lg:px-16 px-6 bg-white shadow-md flex flex-wrap items-center lg:py-0 py-5">
      <div className="flex-1 flex justify-between items-center">
        <a href="/" className="flex text-center text-lg font-semibold">
          <Image
            src="/assets/imgs/logo.jpeg"
            width="50"
            height="50"
            className="p-2"
            alt="ECMIP Logo"
          />
          <span>ECPMI</span>
        </a>
      </div>
      <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />
      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav className="flex space-x-5">
          <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">
            {NavLinks.map((link) => (
              <li className="py-2 lg:py-0" key={link.title}>
                <a
                  className="text-blue-400 hover:pb-4 hover:border-b-4 hover:border-blue-400"
                  href={link.href}
                >
                  <span className="font-semibold">{link.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <button className="bg-blue-400 text-white px-4 py-2 rounded-md">
            <a href="/login">Login</a>
          </button>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
