import React, { useRef, useState, useEffect } from "react";
import Logo from "../assets/images/RH.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation();
  const navRef = useRef(null);

  //gsap hook
  useGSAP(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.6,
    })
  });

  // close menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 w-full mix-blend-difference z-[31]"
      >
        <div className="main-container py-6 flex justify-between items-center">
          <Link to="/">
            <img src={Logo} alt="RH Logo" className="h-10 w-auto" />
          </Link>
          <div onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 cursor-pointer">
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
      justify-center gap-5 sm:gap-7 md:gap-9 overflow-y-auto transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0 ' : '-translate-y-full'}`} onClick={() => setMenuOpen(false)}>
        <Link to="/" className="menu-links text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase transition-colors duration-300 hover:text-white/50">Home</Link>
        <Link to="/#experience" className="menu-links text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase transition-colors duration-300 hover:text-white/50">Experience</Link>
        <Link to="/projects" className="menu-links text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase transition-colors duration-300 hover:text-white/50">Projects</Link>
        <Link to="/#certificates" className="menu-links text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase transition-colors duration-300 hover:text-white/50">Certification</Link>
        <Link to="/#github" className="menu-links text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase transition-colors duration-300 hover:text-white/50">GitHub</Link>
        <a href="mailto:rhanssap@gmail.com" className="menu-links text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase transition-colors duration-300 hover:text-white/50">Contact</a>
      </div>
    </>
  );
};

export default Navbar;
