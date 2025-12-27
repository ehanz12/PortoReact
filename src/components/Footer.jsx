import React from "react";
import logo from "../assets/images/RH.svg";

const Footer = () => {
  return (
    <>
      {/* Divider */}
      <div className="max-w-375 m-auto h-px bg-white opacity-10"></div>

      <footer
        className="main-container grid md:grid-cols-2 lg:grid-cols-4 gap-10
        py-20"
      >
        <img src={logo} alt="" className="w-20" />
        <div>
          <h5 className="font-medium mb-5">Services</h5>
          <ul className="flex flex-col gap-2 text-base lg:text-lg">
            <li>
              <a href="">backend Service</a>
            </li>
            <li>
              <a href="">Api Development</a>
            </li>
            <li>
              <a href="">Database Development</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium mb-5">Accessbility</h5>
          <ul className="flex flex-col gap-2 text-base lg:text-lg">
            <li>
              <a href="">backend Development</a>
            </li>
            <li>
              <a href="">24/7 WhatApps & Email</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium mb-5">Contact</h5>
          <ul className="flex flex-col gap-2 text-base lg:text-lg">
            <li>
              <a href="">rhanssap@gmail.com</a>
            </li>
            <li>
              <a href="">+62 895 3455 70902</a>
            </li>
          </ul>
        </div>
      </footer>

      {/* Divider */}
      <div className="max-w-375 m-auto h-px bg-white opacity-10"></div>

      <div className="main-container grid md:grid-cols-2 gap-3 py-6 lg:py-8
      max-md:text-center">
        <div className="text-base lg:text-lg">@ 2025 RH | All rights reversed</div>
        <div className="flex gap-3 justify-center md:justify-end">
         <a href="apeeexx" target="_blank" rel="noopener noreferrer">
  <img
    src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/discord/default.svg"
    className="w-13 h-10 invert hover:scale-110 transition"
    alt="discord"
  />
</a>

<a
  href="https://www.instagram.com/rhanz_ap"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/instagram/default.svg"
    className="w-13 h-10 invert hover:scale-110 transition"
    alt="instagram"
  />
</a>

<a href="mailto:rhanssap@gmail.com">
  <img
    src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/gmail/default.svg"
    className="w-13 h-10 invert hover:scale-110 transition"
    alt="gmail"
  />
</a>

        </div>
      </div>
    </>
  );
};

export default Footer;
