import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import sertifikat1 from "../assets/images/sertifikat1.webp";
import sertifikat2 from "../assets/images/sertifikat2.webp";
import sertifikat3 from "../assets/images/sertifikat3.webp";
import sertifikat4 from "../assets/images/sertifikat4.webp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const certificatesData = [
  {
    id: 1,
    image: sertifikat1,
    title: "Google Cloud Roadshows",
    issuer: "Google Developer Group Bogor",
    year: "2025",
    type: "Certificate of Attendance",
  },
  {
    id: 2,
    image: sertifikat2,
    title: "From Vision to Version 1.0",
    issuer: "CodeLamp Indonesia",
    year: "2025",
    type: "Webinar Participant",
  },
  {
    id: 3,
    image: sertifikat3,
    title: "Google I/O Extended Bogor",
    issuer: "GDG Bogor & Women Techmakers",
    year: "2025",
    type: "Certificate of Attendance",
  },
  {
    id: 4,
    image: sertifikat4,
    title: "Game Design: From Hobby to Hook",
    issuer: "CodeLamp Indonesia",
    year: "2025",
    type: "Webinar Participant",
  },
];

const Certificates = () => {
  const sectionRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);

  useGSAP(() => {
    gsap.from(".cert-title-anim", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.from(".cert-card", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cert-grid",
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} className="bg-white text-black py-24 lg:py-40">
        {/* Section Header */}
        <div className="main-container mb-12 lg:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="cert-title-anim">
              <h3 className="mb-3">Sertifikasi &amp; Pencapaian</h3>
              <p className="text-lg lg:text-xl text-black/60 max-w-lg">
                Bukti komitmen saya dalam terus belajar dan berkembang di dunia teknologi.
              </p>
            </div>
            <span className="cert-title-anim text-5xl lg:text-6xl font-heading font-bold text-black/5 select-none">
              {certificatesData.length} Cert
            </span>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="cert-grid main-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {certificatesData.map((cert) => (
            <button
              key={cert.id}
              className="cert-card group relative rounded-2xl overflow-hidden cursor-pointer text-left"
              onClick={() => setActiveCert(cert)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-heading text-sm uppercase tracking-widest bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2">
                    Lihat Detail
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-gray-50 border border-gray-100">
                <span className="text-xs font-heading uppercase tracking-wider text-black/40 block mb-1">
                  {cert.type}
                </span>
                <h4 className="font-heading font-semibold text-base leading-snug text-black mb-1">
                  {cert.title}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-black/50">{cert.issuer}</span>
                  <span className="text-xs font-heading font-bold text-black/30">{cert.year}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors font-heading text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Tutup <span className="text-lg">✕</span>
            </button>

            {/* Certificate image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full h-auto"
              />
            </div>

            {/* Certificate info */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <p className="text-white/40 text-sm font-body">{activeCert.type}</p>
                <h3 className="text-white font-heading font-bold text-xl">{activeCert.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-sm">{activeCert.issuer}</p>
                <p className="text-white font-heading font-semibold">{activeCert.year}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;
