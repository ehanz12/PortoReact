import React, { useEffect, useRef, useState } from "react";
import { getLenis } from "../lib/lenis";

const ProjectModal = ({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  triggerRef = null,
}) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Touch swipe support for mobile bottom sheet / drawer
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);
  const sheetContentRef = useRef(null);

  /* ── 1. Lock scroll saat modal terbuka (Lenis & document.body) ── */
  useEffect(() => {
    if (!project) return;

    const lenis = getLenis();
    lenis?.stop();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Simpan trigger elemen sebelumnya untuk dikembalikan fokusnya saat close
    const previousActiveElement = document.activeElement;

    // Auto focus ke tombol close saat modal terbuka
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      lenis?.start();
      document.body.style.overflow = originalOverflow;

      // Kembalikan fokus ke pemicu kartu asal (A11y requirement)
      if (triggerRef?.current) {
        triggerRef.current.focus();
      } else if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [project, triggerRef]);

  /* ── 2. Keyboard Navigation: Escape, ArrowLeft, ArrowRight & Focus Trap ── */
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && onPrev && hasPrev) {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "ArrowRight" && onNext && hasNext) {
        e.preventDefault();
        onNext();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, onPrev, onNext, hasPrev, hasNext]);

  /* Reset image index saat ganti project */
  useEffect(() => {
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [project?.id]);

  /* ── 3. Touch Gestures (Swipe down to close on mobile bottom-sheet) ── */
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchCurrentY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    touchCurrentY.current = e.touches[0].clientY;
    const diff = touchCurrentY.current - touchStartY.current;
    if (diff > 0 && sheetContentRef.current) {
      sheetContentRef.current.style.transform = `translateY(${Math.min(diff * 0.7, 180)}px)`;
    }
  };

  const onTouchEnd = () => {
    const diff = touchCurrentY.current - touchStartY.current;
    if (diff > 90) {
      onClose();
    } else if (sheetContentRef.current) {
      sheetContentRef.current.style.transform = "";
    }
    touchStartY.current = 0;
    touchCurrentY.current = 0;
  };

  /* ── 4. Copy Link Toast ── */
  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=${project.id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  if (!project) return null;

  const gallery = project.gallery || [project.image];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-250 animate-fade-in p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      ref={modalRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Toast Alert for Copy Link (Screen reader announcement) */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[60] bg-cyan-500 text-black px-4 py-2 rounded-full font-mono text-xs font-bold shadow-2xl transition-all duration-300 pointer-events-none ${
          copied ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        ✓ Tautan proyek berhasil disalin ke clipboard!
      </div>

      {/* Modal / Bottom Sheet Container */}
      <div
        ref={sheetContentRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="
          relative bg-zinc-950 text-white border-t sm:border border-white/15
          rounded-t-3xl sm:rounded-2xl
          w-full max-w-3xl
          max-h-[88vh] sm:max-h-[90vh] overflow-y-auto
          p-5 sm:p-8 lg:p-10
          shadow-[0_0_80px_rgba(0,0,0,0.9)]
          animate-scale-in
          transition-transform duration-200 ease-out
        "
      >
        {/* Mobile Swipe Handle Pill */}
        <div className="w-12 h-1.5 bg-white/25 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/25 px-2.5 py-0.5 rounded-full">
              ID // 0{project.id}
            </span>
            <span className="text-xs font-mono text-white/40">
              {project.category || "Fullstack"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next buttons */}
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                aria-label="Proyek sebelumnya"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-xs transition-colors"
              >
                ←
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                aria-label="Proyek berikutnya"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-xs transition-colors"
              >
                →
              </button>
            )}

            {/* Copy Project Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Salin tautan proyek"
              className="px-2.5 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-mono text-white/80 transition-colors flex items-center gap-1.5"
            >
              <span>🔗</span>
              <span className="hidden sm:inline">Salin Link</span>
            </button>

            {/* Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              aria-label="Tutup jendela detail (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Title */}
        <h3
          id="modal-project-title"
          className="text-2xl sm:text-3xl font-heading font-bold mb-4 tracking-tight"
        >
          {project.name}
        </h3>

        {/* Gallery / Main Image */}
        <div className="w-full mb-6 rounded-xl overflow-hidden border border-white/15 bg-zinc-900 relative group">
          <button
            type="button"
            onClick={() => setIsZoomed((z) => !z)}
            aria-label={isZoomed ? "Perkecil gambar" : "Perbesar gambar"}
            className="w-full block relative cursor-zoom-in"
          >
            <img
              src={gallery[activeImageIndex] || project.image}
              alt={`${project.name} preview`}
              className={`w-full max-h-72 sm:max-h-96 object-cover object-top transition-transform duration-300 ease-out ${
                isZoomed ? "scale-125 cursor-zoom-out" : "scale-100"
              }`}
              loading="eager"
              decoding="async"
            />
          </button>

          {/* Zoom hint overlay */}
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white/60 pointer-events-none">
            {isZoomed ? "Klik untuk normal" : "Klik untuk zoom"}
          </div>
        </div>

        {/* Impact metric if available */}
        {project.impact && (
          <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 block uppercase tracking-wider">
                Key Performance Impact
              </span>
              <span className="text-xl sm:text-2xl font-heading font-bold text-white">
                {project.impact}
              </span>
            </div>
            <span className="text-2xl text-cyan-400">⚡</span>
          </div>
        )}

        {/* Tech Stack Chips */}
        {project.techStack?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2.5">
              Teknologi &amp; Arsitektur
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md border border-white/10 bg-white/5 text-white/80 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2.5">
            Deskripsi Proyek
          </h4>
          <p className="text-sm sm:text-base leading-relaxed text-white/70 font-body">
            {project.description}
          </p>
        </div>

        {/* Action Buttons: Demo & Repo */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 rounded-xl bg-white hover:bg-white/90 text-black font-heading font-semibold text-xs sm:text-sm text-center transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <span>Kunjungi Live Demo</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/40 font-mono text-xs text-center flex-1">
              Internal / Confidential Project
            </span>
          )}

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs sm:text-sm text-center transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Repository</span>
              <span aria-hidden="true">⌨</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
