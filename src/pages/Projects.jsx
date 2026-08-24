import React, { useState } from "react";
import projects from "../components/ProjectsData";
import ProjectModal from "../components/ProjectModal";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="bg-white text-black">
      <div className="main-container py-28">
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl lg:text-[8vw] font-heading font-bold leading-none tracking-tight text-center mb-16">
          Projects
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project)}
              data-cursor="Lihat"
              className="group block overflow-hidden rounded-2xl text-left cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="mt-4">
                <h3 className="text-lg font-heading font-semibold">
                  {project.name}
                </h3>
              </div>
            </button>
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
