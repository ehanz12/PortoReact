import React, { useRef, useState, useEffect } from "react";
import Logo from "../assets/images/RH.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [menuOpen, SetMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // GSAP hook to animate navbar on mount
  useGSAP(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []); // Run only once on mount

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    SetMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 lg:py-5">
          <Link to="/" className="z-50">
            <img src={Logo} className="h-8 lg:h-12 w-auto" alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">Home</Link>
            <Link to="/#about" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">About</Link>
            <Link to="/#experience" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">Experience</Link>
            <Link to="/projects" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">Projects</Link>
            <Link to="/#github" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">GitHub</Link>
            <a href="mailto:rhanssap@gmail.com" className="btn border text-lg font-medium rounded-full px-6 py-2 hover:text-white transition-colors duration-300">Contact</a>
          </div>

          <button
            onClick={() => SetMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 cursor-pointer z-50 p-2 -mr-2 lg:hidden"
            aria-label="Toggle Menu"
          >
            <span className={`inline-block w-8 lg:w-10 h-0.5 bg-white transition-all duration-300 ease-in-out 
              ${menuOpen ? 'rotate-45 translate-y-2' : ''}`
            }></span>
            <span className={`inline-block w-8 lg:w-10 h-0.5 bg-white transition-all duration-300 ease-in-out 
              ${menuOpen ? 'opacity-0' : 'opacity-100'}`
            }></span>
            <span className={`inline-block w-8 lg:w-10 h-0.5 bg-white transition-all duration-300 ease-in-out 
              ${menuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}></span>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div className={`fixed z-[40] inset-0 bg-black/95 text-white flex flex-col items-center
      justify-center gap-8 overflow-y-auto pt-24 pb-12 transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link to="/" onClick={(e) => e.stopPropagation()} className="menu-links">Home</Link>
        <Link to="/#about" onClick={(e) => e.stopPropagation()} className="menu-links">About</Link>
        <Link to="/#experience" onClick={(e) => e.stopPropagation()} className="menu-links">Experience</Link>
        <Link to="/projects" onClick={(e) => e.stopPropagation()} className="menu-links">Projects</Link>
        <Link to="/#github" onClick={(e) => e.stopPropagation()} className="menu-links">GitHub</Link>
        <Link to="mailto:rhanssap@gmail.com" onClick={(e) => e.stopPropagation()} className="menu-links">Contact</Link>
      </div>
    </>
  );
};

export default Navbar;
