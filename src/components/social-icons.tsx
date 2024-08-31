import Image from "next/image";
import React from "react";

const socialLinks = [
  {
    id: 1,
    icon: "/assets/icons/facebook.svg",
    link: "https://www.facebook.com/ECPMI/",
  },
];
const SocialLinks = () => {
  return (
    <div className="flex space-x-5">
      {socialLinks.map(({ link, icon, id }) => (
        <a href={link} key={id}>
          <Image width={25} height={25} src={icon} alt="social icon" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
