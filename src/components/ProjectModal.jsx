import React, { useEffect } from "react";
import { getLenis } from "../lib/lenis";

const ProjectModal = ({ project, onClose }) => {
  /* ── Lock scroll saat modal terbuka (Lenis-aware) ── */
  useEffect(() => {
    if (!project) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div
        className="
          relative bg-white text-black rounded-2xl
          w-full max-w-3xl mx-4
          max-h-[90vh] overflow-y-auto
          p-4 sm:p-6 lg:p-10
          z-10 animate-scale-in
        "
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 sm:top-4 sm:right-4
            w-9 h-9 rounded-full border border-black/10
            flex items-center justify-center
            hover:bg-black hover:text-white hover:rotate-90
            transition-all duration-300
          "
          aria-label="Tutup modal"
        >
          ✕
        </button>

        {/* title */}
        <h3
          className="
            text-xl sm:text-2xl lg:text-3xl pr-10
            font-heading font-bold
            mb-3 sm:mb-4
          "
        >
          {project.name}
        </h3>

        {/* image */}
        <div className="w-full mb-4 sm:mb-6">
          <img
            src={project.image}
            alt={project.name}
            className="
              w-full
              max-h-60 sm:max-h-72 lg:max-h-96
              object-cover object-top
              rounded-xl
            "
          />
        </div>

        {/* tech stack */}
        {project.techStack?.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-heading font-semibold uppercase tracking-widest mb-2 sm:mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="
                    inline-flex items-center
                    px-3 py-1 rounded-full border border-black/20
                    bg-black/5 text-xs sm:text-sm font-medium
                    transition-colors duration-200 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 hover:border-purple-300
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* description */}
        <p
          className="
            text-sm sm:text-base lg:text-lg
            leading-relaxed
            mb-6
          "
        >
          {project.description}
        </p>

        {/* action */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 sm:px-6 sm:py-3
              rounded-full border border-black
              text-sm sm:text-base font-heading uppercase tracking-wide
              hover:bg-black hover:text-white
              transition-all duration-300
              group
            "
          >
            View Project
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7m0 0H8m9 0v9" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
