import React, { useRef, useState, useEffect } from "react";
import Logo from "../assets/images/RH.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { onAppReady } from "../lib/motion";
import { getLenis } from "../lib/lenis";

gsap.registerPlugin(useGSAP);

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Certification", href: "/#certificates" },
  { label: "GitHub", href: "/#github" },
  { label: "Contact", href: "mailto:rhanssap@gmail.com" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const timelineRef = useRef(null);

  /* ── Entrance: tunggu preloader selesai ── */
  useGSAP(() => {
    const off = onAppReady(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    });
    const safety = setTimeout(() => {
      if (navRef.current && getComputedStyle(navRef.current).opacity === "0") {
        gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.5 });
      }
    }, 4000);
    return () => { off(); clearTimeout(safety); };
  }, []);

  /* ── Timeline menu fullscreen (stagger link + nomor) ── */
  useGSAP(() => {
    gsap.set(menuRef.current, { yPercent: -100 });
    const tl = gsap.timeline({ paused: true });

    tl.to(menuRef.current, {
      yPercent: 0,
      duration: 0.7,
      ease: "power4.inOut",
    })
      .fromTo(
        ".menu-link-row",
        { yPercent: 120 },
        { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.07 },
        "-=0.25"
      )
      .fromTo(
        ".menu-link-num",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07 },
        "<"
      );

    timelineRef.current = tl;
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;
    if (menuOpen) {
      timelineRef.current.timeScale(1).play();
    } else {
      timelineRef.current.timeScale(1.4).reverse();
    }
  }, [menuOpen]);

  /* ── Hide on scroll down / show on up + backdrop blur ── */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (!menuOpen) setHidden(y > lastY && y > 140);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  /* ── Lock scroll saat menu terbuka (Lenis-aware) + ESC close ── */
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Backdrop strip */}
      <div
        className={`fixed top-0 w-full h-20 z-[31] pointer-events-none bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        } ${hidden ? "-translate-y-full" : ""}`}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-[32] transition-transform duration-500 ease-out ${
          hidden ? "-translate-y-full" : ""
        }`}
      >
        <div className="main-container py-6 flex justify-between items-center">
          <Link to="/" aria-label="Beranda">
            <img src={Logo} alt="RH Logo" className="h-10 w-auto" />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            className="flex flex-col gap-1.5 cursor-pointer group p-2 -m-2"
          >
            <span
              className={`inline-block w-10 lg:w-12 h-0.5 bg-white transition-all duration-300 ease-in-out origin-center group-hover:w-6 ${
                menuOpen ? "rotate-45 translate-y-1 !w-10 lg:!w-12" : ""
              }`}
            />
            <span
              className={`inline-block w-10 lg:w-12 h-0.5 bg-white transition-all duration-300 ease-in-out origin-center ${
                menuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        ref={menuRef}
        className="fixed z-30 inset-0 bg-black text-white flex flex-col items-center justify-center will-change-transform"
      >
        <div className="flex flex-col items-center gap-5 sm:gap-7 md:gap-9">
          {MENU_LINKS.map((link, i) => {
            const inner = (
              <>
                <span className="menu-link-num text-xs sm:text-sm font-heading text-white/30 mr-3 align-super select-none">
                  0{i + 1}
                </span>
                <span className="inline-block transition-colors duration-300 group-hover:text-white/50 group-hover:italic">
                  {link.label}
                </span>
              </>
            );
            const cls =
              "group flex items-baseline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold uppercase";

            return (
              <div key={link.label} className="overflow-hidden py-0.5">
                <div className="menu-link-row will-change-transform">
                  {link.href.startsWith("mailto:") ? (
                    <a href={link.href} className={cls} onClick={() => setMenuOpen(false)}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={link.href} className={cls} onClick={() => setMenuOpen(false)}>
                      {inner}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="absolute bottom-8 text-white/25 text-xs tracking-widest uppercase">
          Reihan Aditya Putra — Fullstack Developer
        </p>
      </div>
    </>
  );
};

export default Navbar;
