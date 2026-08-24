import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/RH.svg";
import Magnetic from "./Magnetic";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/ehanz12",
    icon: (
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.442 22 12.017 22 6.484 17.522 2 12 2z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rhanz_ap",
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" strokeWidth="1.8" stroke="currentColor" />
        <circle cx="12" cy="12" r="4.2" fill="none" strokeWidth="1.8" stroke="currentColor" />
        <circle cx="17.3" cy="6.7" r="1.3" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/62895345570902",
    icon: (
      <path d="M12 2a10 10 0 00-8.62 15.06L2 22l5.08-1.33A10 10 0 1012 2zm0 18.2c-1.55 0-3-.44-4.23-1.2l-.3-.18-3.02.79.81-2.94-.2-.31A8.2 8.2 0 1112 20.2zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.56.12s-.65.8-.79.97c-.15.16-.29.19-.53.06a6.7 6.7 0 01-1.97-1.21 7.4 7.4 0 01-1.36-1.7c-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.03-.43s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.3-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.18.2-.57.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:rhanssap@gmail.com",
    icon: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="none" strokeWidth="1.8" stroke="currentColor" />
        <path d="M3.5 6.5L12 13l8.5-6.5" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

const useLocalTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Jakarta",
        }).format(new Date())
      );

    format();
    const interval = setInterval(format, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

const Footer = () => {
  const time = useLocalTime();
  const ctaRef = useRef(null);

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Divider */}
      <div className="max-w-[375px] m-auto h-px bg-white opacity-10" />

      {/* Giant CTA */}
      <div ref={ctaRef} className="main-container pt-20 lg:pt-28 pb-10">
        <a
          href="mailto:rhanssap@gmail.com"
          className="block group text-center"
          data-cursor="Email"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-white/40 mb-4 font-heading">
            Punya proyek menarik?
          </p>
          <h2 className="giant-cta font-heading font-bold uppercase leading-none text-4xl sm:text-6xl lg:text-[7vw] select-none">
            Mari Bekerja Sama →
          </h2>
        </a>
      </div>

      {/* Divider */}
      <div className="max-w-[375px] m-auto h-px bg-white opacity-10" />

      <div className="main-container grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-20">
        <div className="flex flex-col gap-4">
          <img src={logo} alt="RH Logo" className="w-20" />
          <p className="text-white/40 text-sm leading-relaxed max-w-[220px] font-body">
            Fullstack Developer Junior — membangun web end-to-end dengan kode yang bersih dan andal.
          </p>
        </div>

        <div>
          <h5 className="font-medium mb-5">Services</h5>
          <ul className="flex flex-col gap-2 text-base lg:text-lg text-white/60">
            <li>
              <a href="/#services" className="hover:text-white transition-colors duration-300">Fullstack Development</a>
            </li>
            <li>
              <a href="/#services" className="hover:text-white transition-colors duration-300">API Development</a>
            </li>
            <li>
              <a href="/#services" className="hover:text-white transition-colors duration-300">Database Management</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-5">Navigasi</h5>
          <ul className="flex flex-col gap-2 text-base lg:text-lg text-white/60">
            <li>
              <a href="/#about" className="hover:text-white transition-colors duration-300">Tentang Saya</a>
            </li>
            <li>
              <a href="/projects" className="hover:text-white transition-colors duration-300">Projects</a>
            </li>
            <li>
              <a href="/#certificates" className="hover:text-white transition-colors duration-300">Sertifikat</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-5">Kontak</h5>
          <ul className="flex flex-col gap-2 text-base lg:text-lg text-white/60">
            <li>
              <a href="mailto:rhanssap@gmail.com" className="hover:text-white transition-colors duration-300">rhanssap@gmail.com</a>
            </li>
            <li>
              <a href="https://wa.me/62895345570902" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">+62 895 3455 70902</a>
            </li>
            <li className="flex items-center gap-2 mt-1 text-sm text-white/40 font-body">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Bogor, Indonesia — {time} WIB
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[375px] m-auto h-px bg-white opacity-10" />

      <div className="main-container flex flex-col md:flex-row gap-4 items-center justify-between py-6 lg:py-8">
        <p className="text-sm lg:text-base text-white/40">
          © 2025 Reihan Aditya Putra — All rights reserved
        </p>

        <div className="flex gap-3">
          {SOCIALS.map((social) => (
            <Magnetic key={social.label} strength={0.4}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-black hover:bg-white hover:border-white transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {social.icon}
                </svg>
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
