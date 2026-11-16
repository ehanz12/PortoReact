import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "../lib/lenis";
import TiltCard from "../components/TiltCard";
import certificatesData from "../components/CertificatesData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Certificates = () => {
  const sectionRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);

  // Ambil 3 sertifikat unggulan untuk halaman utama
  const previewCertificates = certificatesData.slice(0, 3);

  /* ── Lock scroll saat lightbox terbuka (Lenis-aware) ── */
  useEffect(() => {
    if (activeCert === null) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  /* ── Keyboard: ESC tutup, ←/→ navigasi ── */
  const lightboxOpen = activeCert !== null;

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setActiveCert(null);
      if (e.key === "ArrowRight")
        setActiveCert((i) => (i + 1) % previewCertificates.length);
      if (e.key === "ArrowLeft")
        setActiveCert((i) =>
          i === 0 ? previewCertificates.length - 1 : i - 1
        );
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, previewCertificates.length]);

  useGSAP(() => {
    gsap.from(".cert-title-anim", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });

    gsap.from(".cert-card", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cert-grid",
        start: "top 80%",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} id="certificates" className="bg-black text-white py-24 lg:py-36 border-t border-white/5 relative">
        {/* Section Header */}
        <div className="main-container mb-12 lg:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="cert-title-anim">
              <h3 className="mb-2 text-sm sm:text-base text-cyan-400 font-mono uppercase tracking-wider">
                Certifications &amp; Achievements
              </h3>
              <p className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
                Sertifikat Pilihan
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-white/50 max-w-sm font-body">
                Bukti kompetensi dan dedikasi dalam eksplorasi dunia cloud, backend, dan teknologi web.
              </p>
              <Link
                to="/certificates"
                className="px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black text-cyan-300 font-mono text-xs transition-all duration-300 shrink-0 flex items-center gap-2"
              >
                <span>Lihat Semua ({certificatesData.length})</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Featured Certificates Grid */}
        <div className="cert-grid main-container grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {previewCertificates.map((cert, index) => (
            <TiltCard key={cert.id} maxTilt={6} scale={1.01} className="h-full">
              <button
                className="cert-card group relative rounded-2xl overflow-hidden cursor-pointer text-left h-full w-full border border-white/10 hover:border-cyan-500/40 transition-all duration-300 bg-zinc-950/60 backdrop-blur-md flex flex-col justify-between"
                onClick={() => setActiveCert(index)}
              >
                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-zinc-900 w-full">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-mono text-xs uppercase tracking-widest bg-white/10 border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                      Perbesar Sertifikat ↗
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 border-t border-white/5 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 block mb-1.5">
                      {cert.type}
                    </span>
                    <h4 className="font-heading font-semibold text-base sm:text-lg leading-snug text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {cert.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <span className="text-xs text-white/50 truncate mr-2">{cert.issuer}</span>
                    <span className="text-xs font-mono font-bold text-white/30 shrink-0">{cert.year}</span>
                  </div>
                </div>
              </button>
            </TiltCard>
          ))}
        </div>

        {/* Bottom CTA to Full Certificates Page */}
        <div className="main-container text-center mt-12">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black font-heading text-xs uppercase tracking-wider text-white transition-all duration-300"
          >
            <span>Buka Semua Sertifikat &amp; Pencapaian</span>
            <span>↗</span>
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeCert !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="Tutup sertifikat"
            >
              ✕
            </button>

            {/* Certificate image */}
            <div className="rounded-xl overflow-hidden border border-white/10 mb-4 bg-zinc-900">
              <img
                src={previewCertificates[activeCert].image}
                alt={previewCertificates[activeCert].title}
                className="w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>

            {/* Info footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  {previewCertificates[activeCert].title}
                </h4>
                <p className="text-white/50 text-xs mt-0.5">
                  {previewCertificates[activeCert].issuer} • {previewCertificates[activeCert].year}
                </p>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveCert((i) =>
                      i === 0 ? previewCertificates.length - 1 : i - 1
                    )
                  }
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-mono transition-colors"
                >
                  ← Prev
                </button>
                <span className="text-xs font-mono text-white/40">
                  {activeCert + 1} / {previewCertificates.length}
                </span>
                <button
                  onClick={() =>
                    setActiveCert((i) => (i + 1) % previewCertificates.length)
                  }
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-mono transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;
