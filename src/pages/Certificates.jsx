import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import certificatesData from "../components/CertificatesData";
import TiltCard from "../components/TiltCard";
import { getLenis } from "../lib/lenis";

const CertificatesPage = () => {
  const [activeCert, setActiveCert] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Kategori filter
  const types = useMemo(() => {
    const list = new Set(certificatesData.map((c) => c.type));
    return ["All", ...Array.from(list)];
  }, []);

  const filteredCerts = useMemo(() => {
    return certificatesData.filter((c) => {
      const matchType = selectedType === "All" || c.type === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.year.includes(q);

      return matchType && matchSearch;
    });
  }, [selectedType, searchQuery]);

  /* ── Lock scroll saat modal lightbox terbuka ── */
  useEffect(() => {
    if (activeCert === null) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setActiveCert(null);
      if (e.key === "ArrowRight")
        setActiveCert((i) => (i + 1) % filteredCerts.length);
      if (e.key === "ArrowLeft")
        setActiveCert((i) => (i === 0 ? filteredCerts.length - 1 : i - 1));
    };

    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeCert, filteredCerts.length]);

  return (
    <section className="bg-black text-white pt-28 pb-28 lg:pt-36 min-h-screen">
      <div className="main-container">
        {/* Header Section */}
        <div className="mb-10 lg:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                to="/"
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                ← Kembali ke Beranda
              </Link>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
              Semua Sertifikasi &amp; Lisensi
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-white/50 max-w-sm font-body">
            Dokumentasi lengkap pelatihan, seminar, dan pencapaian kompetensi dalam bidang rekayasa perangkat lunak.
          </p>
        </div>

        {/* Toolbar: Filter Type & Search Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {types.map((t) => {
              const isSelected = selectedType === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? "bg-white text-black font-semibold border-white shadow"
                      : "bg-white/5 text-white/60 border-white/10 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari sertifikat, penerbit..."
              className="w-full bg-zinc-950/80 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder:text-white/30 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCerts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 p-8">
            <div className="text-4xl mb-3">📜</div>
            <h4 className="text-base font-heading font-bold text-white mb-1">
              Tidak ada sertifikat yang ditemukan
            </h4>
            <p className="text-xs text-white/50 mb-4">
              Coba gunakan kata kunci pencarian lain atau pilih kategori "All".
            </p>
            <button
              onClick={() => {
                setSelectedType("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-white text-black font-heading font-semibold text-xs hover:bg-white/90 transition-all cursor-pointer shadow"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCerts.map((cert, index) => (
              <div
                key={cert.id}
                onClick={() => setActiveCert(index)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer text-left h-full w-full border border-white/10 hover:border-cyan-500/40 transition-all duration-300 bg-zinc-950/70 hover:bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 w-full">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 block"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-mono text-xs uppercase tracking-widest bg-black/60 border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                      Lihat Sertifikat ↗
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeCert !== null && filteredCerts[activeCert] && (
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
                src={filteredCerts[activeCert].image}
                alt={filteredCerts[activeCert].title}
                className="w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>

            {/* Info footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                  {filteredCerts[activeCert].title}
                </h4>
                <p className="text-white/50 text-xs mt-0.5">
                  {filteredCerts[activeCert].issuer} • {filteredCerts[activeCert].year}
                </p>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveCert((i) =>
                      i === 0 ? filteredCerts.length - 1 : i - 1
                    )
                  }
                  className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white hover:text-black text-xs font-mono transition-colors"
                >
                  ← Prev
                </button>
                <span className="text-xs font-mono text-white/40">
                  {activeCert + 1} / {filteredCerts.length}
                </span>
                <button
                  onClick={() =>
                    setActiveCert((i) => (i + 1) % filteredCerts.length)
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
    </section>
  );
};

export default CertificatesPage;
