import Image from "next/image";
import React from "react";

const socialLinks = [
  {
    id: 1,
    icon: "/assets/icons/facebook.svg",
    link: "https://facebook.com",
  },
  {
    id: 3,
    icon: "/assets/icons/instagram.svg",
    link: "https://instagram.com",
  },
  {
    id: 4,
    icon: "/assets/icons/linkedin.svg",
    link: "https://linkedin.com",
  },
];
const SocialLinks = () => {
  return (
    <div className="flex space-x-5">
      {socialLinks.map(({ link, icon, id }) => (
        <a href={link} key={id}>
          <Image width={35} height={35} src={icon} alt="social icon" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
