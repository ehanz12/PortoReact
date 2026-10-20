import React, { useRef, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import GlitchText from "../components/GlitchText";
import projects from "../components/ProjectsData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".project-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-24 lg:py-36 bg-surface/30">
        <div className="cyber-container">
          <div className="mb-12">
            <div className="flex max-md:flex-col gap-6 justify-between items-start md:items-end">
              <div className="max-w-xl">
                <h2 className="section-title">
                  <GlitchText text="Proyek" trigger="viewport" />
                </h2>
                <p className="section-subtitle mt-3">Kumpulan proyek yang menunjukkan pengalaman saya dalam membangun aplikasi web.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                data-cursor="View"
                className={`project-card group relative rounded-xl overflow-hidden cursor-pointer text-left border border-accent/6 hover:border-accent/25 transition-all duration-300 ${
                  i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden bg-surface-light ${i === 0 ? "aspect-[16/10]" : "aspect-video"}`}>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tech?.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-void/70 text-accent/80 rounded border border-accent/10 backdrop-blur-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className={`font-heading font-bold text-white group-hover:text-accent transition-colors ${i === 0 ? "text-xl lg:text-2xl" : "text-base"}`}>
                    {project.name}
                  </h3>
                  {i === 0 && (
                    <p className="text-sm text-muted mt-1 line-clamp-2 max-w-md">{project.description}</p>
                  )}
                  <p className="text-accent font-mono text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details →
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
};

export default Projects;
