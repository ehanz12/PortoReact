import React, { useRef, useState } from "react";
import Logo from "../assets/images/RH.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Navbar = () => {

  const [menuOpen, SetMenuOpen] =  useState(false)


  const navRef = useRef(null);
  //gsap hook
  useGSAP(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.6,
    })
  });

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 w-full mix-blend-difference z-31"
      >
        <div className="main-container py-6 flex justify-between items-center">
          <img src={Logo} className="h-10 w-auto" />
          <div onClick={() => SetMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 cursor-pointer">
            <span className={`inline-block w-10 lg:w-12 h-0.5 bg-white transition-all duration-300 ease-in-out origin-center
              ${menuOpen ? 'rotate-45 translate-y-1' : ''}`
              }></span>
            <span className={`inline-block w-10 lg:w-12 h-0.5 bg-white transition-all duration-300 ease-in-out origin-center
              ${menuOpen ? '-rotate-45 -translate-y-1' : ''}
              `}></span>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fixed z-30 inset-0 bg-black text-white flex flex-col items-center
      justify-center gap-8 transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0 ' : '-translate-y-full'}`} onClick={() => SetMenuOpen(false)}>
      <Link to="/" className="menu-links">Home</Link>
      <Link to="/#about" className="menu-links">About</Link>
      <Link to="/projects" className="menu-links">Projects</Link>
      <Link to="mailto:rhanssap@gmail.com" className="menu-links">Contact</Link>
      </div>
    </>
  );
};

export default Navbar;
