import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLenis } from "../lib/lenis";
import certificatesData from "../components/CertificatesData";

const Certificates = () => {
  const [activeCert, setActiveCert] = useState(null);

  // Ambil 3 sertifikat pilihan terbaik
  const previewCertificates = certificatesData.slice(0, 3);

  /* ── Lock scroll saat modal terbuka ── */
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

  /* ── Keyboard: ESC untuk menutup, panah kiri/kanan untuk navigasi ── */
  useEffect(() => {
    if (activeCert === null) return;

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
  }, [activeCert, previewCertificates.length]);

  return (
    <>
      <section id="certificates" className="bg-black text-white py-24 lg:py-36 border-t border-white/5 relative">
        {/* Section Header */}
        <div className="main-container mb-12 lg:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
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
                className="px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500 hover:text-black text-cyan-300 font-mono text-xs transition-all duration-300 shrink-0 flex items-center gap-2 group"
              >
                <span>Lihat Semua ({certificatesData.length})</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Featured Certificates Grid (Robust Clean Layout - Zero Glitch) */}
        <div className="main-container grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {previewCertificates.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => setActiveCert(index)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 bg-zinc-950/70 hover:bg-zinc-900/60 flex flex-col justify-between"
            >
              {/* Gambar Sertifikat dengan Fallback & Ratio Stabil */}
              <div className="relative aspect-[4/3] w-full bg-zinc-900 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 block"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-mono text-xs tracking-wider bg-black/60 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
                    Lihat Detail ↗
                  </span>
                </div>
              </div>

              {/* Detail Sertifikat */}
              <div className="p-5 flex-1 flex flex-col justify-between">
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
            </div>
          ))}
        </div>

        {/* CTA Bawah ke Halaman Seluruh Sertifikat */}
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
            {/* Tombol Tutup */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="Tutup sertifikat"
            >
              ✕
            </button>

            {/* Gambar Modal */}
            <div className="rounded-xl overflow-hidden border border-white/10 mb-4 bg-zinc-900 flex items-center justify-center">
              <img
                src={previewCertificates[activeCert].image}
                alt={previewCertificates[activeCert].title}
                className="w-full max-h-[70vh] object-contain mx-auto block"
              />
            </div>

            {/* Footer Modal Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  {previewCertificates[activeCert].title}
                </h4>
                <p className="text-white/50 text-xs mt-0.5">
                  {previewCertificates[activeCert].issuer} • {previewCertificates[activeCert].year}
                </p>
              </div>

              {/* Navigasi Modal */}
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
