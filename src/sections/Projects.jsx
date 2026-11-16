import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import projects from "../components/ProjectsData";
import ProjectModal from "../components/ProjectModal";
import TiltCard from "../components/TiltCard";
import ButtonGradient from "../components/ButtonGradient";
import { prefersReducedMotion } from "../lib/motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Highlight text yang cocok dengan pencarian
const HighlightText = ({ text = "", highlight = "" }) => {
  if (!highlight.trim()) return <>{text}</>;
  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-cyan-400/25 text-cyan-200 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

// Counter angka berhitung saat terlihat di layar
const ImpactCounter = ({ targetNumber = 100, unit = "%", label = "" }) => {
  const [val, setVal] = useState(0);
  const elementRef = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVal(targetNumber);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1200;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * targetNumber);
            setVal(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setVal(targetNumber);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [targetNumber]);

  return (
    <div ref={elementRef} className="text-left font-mono">
      <span className="text-base sm:text-lg font-bold text-cyan-400">
        {targetNumber > 0 ? val.toLocaleString() + unit : unit}
      </span>
      {label && <span className="block text-[10px] text-white/40">{label}</span>}
    </div>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("portfolio_section_view") || "grid";
  });
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const sectionRef = useRef(null);
  const cardRefs = useRef({});

  // Animasi GSAP muncul saat scroll
  useGSAP(
    () => {
      gsap.from(".proj-header-anim", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  // Debounce search input 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Handle URL sync untuk modal (?project=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pId = params.get("project");
    if (pId && !activeProjectId) {
      setActiveProjectId(Number(pId));
    }
  }, []);

  const handleToggleView = (mode) => {
    setViewMode(mode);
    localStorage.setItem("portfolio_section_view", mode);
  };

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category || "Fullstack"));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat =
        activeCategory === "All" || (p.category || "Fullstack") === activeCategory;
      const q = debouncedSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack?.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [activeCategory, debouncedSearch]);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || null;
  }, [activeProjectId]);

  const currentIndex = activeProject ? projects.findIndex((p) => p.id === activeProject.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) setActiveProjectId(projects[currentIndex - 1].id);
  }, [hasPrev, currentIndex]);

  const handleNext = useCallback(() => {
    if (hasNext) setActiveProjectId(projects[currentIndex + 1].id);
  }, [hasNext, currentIndex]);

  const handleCopyProjectLink = (e, projectId) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?project=${projectId}#projects`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleResetFilter = () => {
    setActiveCategory("All");
    setSearchInput("");
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-20 bg-black text-white py-24 lg:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Toast Alert Feedback */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 bg-cyan-400 text-black px-4 py-2.5 rounded-xl font-mono text-xs font-bold shadow-2xl transition-all duration-300 pointer-events-none flex items-center gap-2 ${
          copiedLink ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span>✓</span> Tautan proyek disalin!
      </div>

      <div className="main-container">
        {/* Section Header */}
        <div className="proj-header-anim mb-10 lg:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-mono text-cyan-400 tracking-wider uppercase">
                Featured Projects
              </h3>
            </div>
            <p className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
              Koleksi Proyek Pilihan
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-white/50 max-w-sm font-body">
              Aplikasi web dan sistem fullstack interaktif dengan performa optimal, filter responsif, dan animasi fluid.
            </p>
            <ButtonGradient text="Explore All" link="/projects" className="shrink-0 text-xs py-2 px-6" />
          </div>
        </div>

        {/* ── Toolbar: Filter Chips, Search, Grid/List Switcher ── */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Chips Multi-Select */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="radiogroup"
              aria-label="Filter kategori proyek"
            >
              {categories.map((cat) => {
                const count =
                  cat === "All"
                    ? projects.length
                    : projects.filter((p) => (p.category || "Fullstack") === cat).length;
                const isSelected = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 border active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isSelected
                        ? "bg-white text-black font-semibold border-white shadow-md"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-black/15 text-black font-bold" : "bg-white/10 text-white/50"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Search + View Switcher */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari nama, teknologi..."
                  aria-label="Cari proyek"
                  className="w-full bg-zinc-950/80 border border-white/15 focus:border-cyan-400 focus:outline-none rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder:text-white/30 transition-colors"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    aria-label="Bersihkan pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Grid / List Mode */}
              <div
                className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 shrink-0"
                role="group"
                aria-label="Opsi layout"
              >
                <button
                  type="button"
                  onClick={() => handleToggleView("grid")}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Tampilan grid"
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-white/15 text-white shadow" : "text-white/40 hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleView("list")}
                  aria-pressed={viewMode === "list"}
                  aria-label="Tampilan list"
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-white/15 text-white shadow" : "text-white/40 hover:text-white"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Aria-live announcement */}
          <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-1">
            <span role="status" aria-live="polite">
              Menampilkan {filteredProjects.length} dari {projects.length} project
            </span>
            {(activeCategory !== "All" || debouncedSearch) && (
              <button
                type="button"
                onClick={handleResetFilter}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Reset Filter ↺
              </button>
            )}
          </div>
        </div>

        {/* ── Empty State ── */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h4 className="text-base font-heading font-bold text-white mb-1">
              Tidak ada proyek yang sesuai
            </h4>
            <p className="text-xs text-white/50 mb-4 max-w-sm mx-auto">
              Coba sesuaikan kata kunci atau ganti filter kategori.
            </p>
            <button
              type="button"
              onClick={handleResetFilter}
              className="px-4 py-2 rounded-xl bg-white text-black font-heading font-semibold text-xs hover:bg-white/90 transition-all cursor-pointer shadow"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          /* ── Project Cards Grid / List ── */
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                : "flex flex-col gap-4"
            }
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[project.id] = el)}
                style={{
                  transitionDelay: `${Math.min(idx * 50, 300)}ms`,
                }}
                className="animate-fade-in"
              >
                <TiltCard maxTilt={6} scale={1.01} className="h-full">
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`Buka detail proyek ${project.name}`}
                    onClick={() => setActiveProjectId(project.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveProjectId(project.id);
                      }
                    }}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-cyan-500/40 focus-visible:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 transition-all duration-250 ease-out bg-zinc-950/70 backdrop-blur-md cursor-pointer active:scale-[0.985] flex ${
                      viewMode === "grid" ? "flex-col h-full" : "flex-col md:flex-row items-center gap-6 p-4"
                    }`}
                  >
                    {/* Media Thumbnail */}
                    <div
                      className={`relative overflow-hidden bg-zinc-900 shrink-0 ${
                        viewMode === "grid" ? "h-52 sm:h-60 w-full" : "h-44 w-full md:w-64 rounded-xl"
                      }`}
                    >
                      <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-within:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      {/* Category Badge & Copy Link */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 border border-white/15 text-cyan-300 backdrop-blur-md">
                          {project.category || "Fullstack"}
                        </span>

                        <button
                          type="button"
                          aria-label={`Salin tautan ${project.name}`}
                          onClick={(e) => handleCopyProjectLink(e, project.id)}
                          className="w-7 h-7 rounded-full bg-black/60 hover:bg-white hover:text-black border border-white/15 text-white/80 flex items-center justify-center text-xs transition-colors backdrop-blur-md"
                        >
                          🔗
                        </button>
                      </div>

                      {/* Hover action prompt */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                        <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-heading font-semibold shadow-md">
                          Buka Detail ↗
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          {project.techStack?.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-white/60 rounded border border-white/10"
                            >
                              <HighlightText text={tech} highlight={debouncedSearch} />
                            </span>
                          ))}
                        </div>

                        {/* Project Name */}
                        <h4 className="text-lg font-heading font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                          <HighlightText text={project.name} highlight={debouncedSearch} />
                        </h4>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] text-white/60 font-body leading-relaxed line-clamp-2 mb-4">
                          <HighlightText text={project.description} highlight={debouncedSearch} />
                        </p>
                      </div>

                      {/* Impact Number Counter & Links */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                        <ImpactCounter
                          targetNumber={project.impactNumber || 100}
                          unit={project.impactUnit || "%"}
                          label={project.impactLabel || "Impact"}
                        />

                        {/* Isolated Action Links */}
                        <div className="flex items-center gap-2">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Buka live demo ${project.name}`}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                            >
                              Demo ↗
                            </a>
                          )}
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Buka repository ${project.name}`}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/15 text-white/70 hover:bg-white/10 transition-colors"
                            >
                              Repo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Bottom Sheet */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProjectId(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
        triggerRef={{ current: cardRefs.current[activeProjectId] }}
      />
    </section>
  );
};

export default ProjectsSection;
