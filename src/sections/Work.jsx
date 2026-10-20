import React, { useRef, useState, useEffect } from "react";
import ButtonGradient from "../components/ButtonGradient";
import ProjectModal from "../components/ProjectModal";
import projects from "../components/ProjectsData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFinePointer } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const workRef = useRef(null);
  const previewRef = useRef(null);
  const hoveredIdRef = useRef(null);

  const [finePointer] = useState(() => isFinePointer());

  /* ── Animasi masuk: stagger baris ── */
  useGSAP(
    () => {
      gsap.from(".work-row", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: workRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: workRef }
  );

  /* ── Preview mengikuti kursor (desktop) — sekali setup, GSAP kelola transform ── */
  useEffect(() => {
    if (!finePointer) return;
    const el = previewRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.9, opacity: 0 });

    const setX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const setRot = gsap.quickTo(el, "rotation", { duration: 0.6, ease: "power3.out" });

    let lastRot = 0;
    let shown = false;

    const show = (x, y) => {
      if (shown) return;
      shown = true;
      gsap.set(el, { x, y });
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    const hide = () => {
      if (!shown) return;
      shown = false;
      gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.25, ease: "power2.in", overwrite: "auto" });
    };

    /* Dipanggil dari React (mouse enter/leave baris) via custom event */
    const onShow = (e) => show(e.detail.x, e.detail.y);
    const onHide = () => hide();

    const onMove = (e) => {
      if (hoveredIdRef.current === null) return;

      show(e.clientX, e.clientY);
      setX(e.clientX);
      setY(e.clientY);
      /* Rotasi mengikuti arah horizontal kursor (efek tilt) */
      const nx = e.clientX / window.innerWidth - 0.5;
      const targetRot = gsap.utils.clamp(-8, 8, nx * 16);
      lastRot += (targetRot - lastRot) * 0.2;
      setRot(lastRot);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("work-preview-show", onShow);
    window.addEventListener("work-preview-hide", onHide);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("work-preview-show", onShow);
      window.removeEventListener("work-preview-hide", onHide);
    };
  }, [finePointer]);

  const setHovered = (id, clientX, clientY) => {
    hoveredIdRef.current = id;
    setHoveredId(id);
    if (id !== null) {
      window.dispatchEvent(new CustomEvent("work-preview-show", { detail: { x: clientX, y: clientY } }));
    } else {
      window.dispatchEvent(new Event("work-preview-hide"));
    }
  };

  const hoveredProject = hoveredId !== null
    ? projects.find((p) => p.id === hoveredId)
    : null;

  return (
    <>
      <section
        ref={workRef}
        className="relative bg-black text-white py-24 lg:py-40 border-t border-white/5 overflow-hidden"
      >
        {/* Header */}
        <div className="main-container pb-10 lg:pb-16 flex max-md:flex-col gap-6 justify-between items-start md:items-end">
          <div className="max-w-xl">
            <h3 className="mb-3 text-white/40">Pilih Proyek</h3>
            <p className="font-heading font-bold text-3xl lg:text-5xl text-white">
              Proyek pilihan saya
            </p>
          </div>

          <ButtonGradient
            text="Explore All"
            link="/projects"
          />
        </div>

        {/* Daftar proyek */}
        <div className="main-container">
          <ul className="border-t border-white/10">
            {projects.map((project, index) => {
              const isDimmed = hoveredId !== null && hoveredId !== project.id;
              return (
                <li key={project.id} className="border-b border-white/10">
                  <button
                    onClick={() => setActiveProject(project)}
                    onMouseEnter={(e) => setHovered(project.id, e.clientX, e.clientY)}
                    onMouseLeave={() => setHovered(null)}
                    data-cursor="Lihat"
                    aria-label={`Buka detail ${project.name}`}
                    className={`work-row group w-full flex items-center gap-4 sm:gap-6 lg:gap-10 py-6 lg:py-8 text-left transition-opacity duration-300 ${
                      isDimmed ? "opacity-40" : "opacity-100"
                    }`}
                  >
                    {/* Thumbnail (mobile) / Nomor (desktop) */}
                    <img
                      src={project.image}
                      alt=""
                      aria-hidden="true"
                      className="lg:hidden w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                      loading="lazy"
                      decoding="async"
                      width="64"
                      height="64"
                    />
                    <span className="hidden lg:block w-12 text-sm font-heading text-white/30 shrink-0 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Nama + tech */}
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block font-heading font-bold uppercase text-2xl sm:text-3xl lg:text-5xl leading-none tracking-tight transition-all duration-300 ${
                          hoveredId === project.id
                            ? "gradient-text translate-x-1 lg:translate-x-3"
                            : "text-white group-hover:translate-x-1 lg:group-hover:translate-x-3"
                        }`}
                      >
                        {project.name}
                      </span>
                      <span className="block mt-2 text-xs sm:text-sm text-white/40 font-body truncate">
                        {project.techStack?.join(" · ")}
                      </span>
                    </span>

                    {/* Panah */}
                    <span
                      className={`hidden sm:flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border transition-all duration-300 shrink-0 ${
                        hoveredId === project.id
                          ? "border-purple-500/60 bg-purple-500/10 text-white translate-x-1"
                          : "border-white/15 text-white/40"
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7m0 0H8m9 0v9" />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Preview gambar melayang mengikuti kursor (desktop only) */}
        {finePointer && (
          <div
            ref={previewRef}
            aria-hidden="true"
            className="fixed top-0 left-0 z-30 w-[22rem] h-[15rem] xl:w-[26rem] xl:h-[17rem] rounded-2xl overflow-hidden border border-white/10 pointer-events-none will-change-transform"
          >
            {hoveredProject && (
              <>
                <img
                  src={hoveredProject.image}
                  alt=""
                  className="w-full h-full object-cover"
                  decoding="async"
                  width="416"
                  height="240"
                />
                {/* Overlay gradien + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-heading uppercase tracking-widest text-white/80">
                  Klik untuk detail
                </span>
              </>
            )}
          </div>
        )}
      </section>

      {/* Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
};

export default Work;
