import React, { useState } from "react";
import projects from "../components/ProjectsData";
import ProjectModal from "../components/ProjectModal";
import TiltCard from "../components/TiltCard";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="bg-black text-white pt-28 pb-24 lg:pt-36">
      <div className="main-container">
        {/* Title */}
        <div className="mb-12 lg:mb-16">
          <h3 className="mb-3 text-white/40">Kumpulan Proyek</h3>
          <p className="font-heading font-bold text-3xl lg:text-5xl text-white">
            Projects
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <TiltCard key={project.id} maxTilt={8} scale={1.02} className="h-full">
              <button
                onClick={() => setActiveProject(project)}
                data-cursor="Lihat"
                className="group block w-full h-full overflow-hidden rounded-2xl text-left cursor-pointer border border-white/10 hover:border-purple-500/40 transition-colors duration-300 bg-zinc-950/60 backdrop-blur-md"
              >
                {/* Image */}
                <div className="relative h-64 lg:h-80 overflow-hidden bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="512"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>

                {/* Title + tech */}
                <div className="p-5 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-body bg-white/5 text-white/60 rounded border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                </div>
              </button>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};

export default Projects;
