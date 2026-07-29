import React, { useRef, useState } from "react";
import Logo from "../assets/images/RH.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Navbar = () => {

  const [menuOpen, SetMenuOpen] = useState(false)


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
        className="fixed top-0 w-full  z-50"
      >
        <div className="main-container py-5 lg:py-8 flex justify-between items-center">
          <img src={Logo} className="h-8 lg:h-12 w-auto" alt="Logo" />
          <div
            onClick={() => SetMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 cursor-pointer group"
          >
            <span className={`inline-block w-8 lg:w-12 h-0.5 bg-white transition-all duration-300 ease-in-out 
              ${menuOpen ? 'rotate-45 translate-y-2' : ''}`
            }></span>
            <span className={`inline-block w-8 lg:w-12 h-0.5 bg-white transition-all duration-300 ease-in-out 
              ${menuOpen ? 'opacity-0' : 'opacity-100'}`
            }></span>
            <span className={`inline-block w-8 lg:w-12 h-0.5 bg-white transition-all duration-300 ease-in-out 
              ${menuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}></span>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fixed z-[40] inset-0 bg-black text-white flex flex-col items-center
      justify-center gap-4 lg:gap-8 overflow-y-auto py-9 transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`} onClick={() => SetMenuOpen(false)}>
        <Link to="/" className="menu-links">Home</Link>
        <Link to="/#about" className="menu-links">About</Link>
        <Link to="/#experience" className="menu-links">Experience</Link>
        <Link to="/projects" className="menu-links">Projects</Link>
        <Link to="/#github" className="menu-links">GitHub</Link>
        <Link to="mailto:rhanssap@gmail.com" className="menu-links">Contact</Link>
      </div>
    </>
  );
};

export default Navbar;
