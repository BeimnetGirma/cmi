import Image from "next/image";
import Link from "next/link";
const NavBar = () => {
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
      title: "Support",
      href: "/support",
    },

    {
      title: "Contact Us",
      href: "/contact",
    },
  ];
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   {navLinks.map((link) => (
    //     <a href={link.href} key={link.title} className="text-2xl font-bold">
    //       {link.title}
    //     </a>
    //   ))}
    // </main>
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div>
          <a href="#" className="flex items-center space-x-2">
            {/* <image src="logo.png" alt="Logo" className="h-8"> */}
            <Image src="/assets/imgs/logo.svg" alt="Logo" width={100} height={100} />
            {/* <span className="font-bold text-lg text-indigo-600">Your Brand</span> */}
          </a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.title} className="text-slate-900 hover:text-indigo-600">
              {link.title}
            </Link>
          ))}
          <Link href={"/login"} className="g-gray-400 text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
