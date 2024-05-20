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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {navLinks.map((link) => (
        <a href={link.href} key={link.title} className="text-2xl font-bold">
          {link.title}
        </a>
      ))}
    </main>
  );
}
