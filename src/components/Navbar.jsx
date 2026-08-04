import React, { useRef } from "react";
import Logo from "../assets/images/RH.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    to: "/#about",
    label: "About",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    to: "/#experience",
    label: "Exp.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    to: "/projects",
    label: "Proj.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    to: "/#github",
    label: "GitHub",
    icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.442 22 12.017 22 6.484 17.522 2 12 2z",
  },
];

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();

  useGSAP(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const isActive = (item) => {
    if (item.external) return false;
    if (item.to === "/") return location.pathname === "/" && !location.hash;
    if (item.to.startsWith("/#")) {
      const hash = item.to.replace("/#", "#");
      return location.hash === hash;
    }
    return location.pathname === item.to;
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 lg:py-5">
          <Link to="/" className="z-50">
            <img src={Logo} className="h-8 lg:h-12 w-auto" alt="Logo" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">Home</Link>
            <Link to="/#about" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">About</Link>
            <Link to="/#experience" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">Experience</Link>
            <Link to="/projects" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">Projects</Link>
            <Link to="/#github" className="text-white/70 hover:text-white transition-colors duration-300 text-lg font-medium">GitHub</Link>
            <a href="mailto:rhanssap@gmail.com" className="btn border text-lg font-medium rounded-full px-6 py-2 hover:text-white transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="relative bg-black/90 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-around items-stretch px-1 pt-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const shared = "flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-lg transition-all duration-300 min-w-0 flex-1 relative";
              const textClasses = active
                ? "gradient-text text-[10px] font-heading font-semibold tracking-wider uppercase"
                : "text-white/50 text-[10px] font-heading font-semibold tracking-wider uppercase";
              const iconClasses = active
                ? "text-transparent [&>path]:fill-current"
                : "text-white/40";

              const content = (
                <>
                  {active && (
                    <span className="absolute -top-px left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-[#FF4D6D] via-[#7B2FF7] to-[#2F86F7] shadow-[0_0_6px_rgba(123,47,247,0.5)]" />
                  )}
                  <svg className={`w-5 h-5 ${iconClasses} transition-colors duration-300`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                  <span className={textClasses}>{item.label}</span>
                </>
              );

              return item.external ? (
                <a key={item.label} href={item.to} className={shared}>
                  {content}
                </a>
              ) : (
                <Link key={item.label} to={item.to} className={shared}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
