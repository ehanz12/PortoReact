import React, { useRef, useState } from "react";
import ButtonGradient from "../components/ButtonGradient";
import ProjectModal from "../components/ProjectModal";
import projects from "../components/ProjectsData";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const [activeProject, setActiveProject] = useState(null);

  const workRef = useRef(null);
  const projectRef = useRef(null);

  useGSAP(
    () => {
      // 🔒 Disable GSAP on mobile & tablet
      if (window.innerWidth < 1024) return;
      if (!projectRef.current || !workRef.current) return;

      const projectWidth = projectRef.current.scrollWidth;
      const scrollDistance = projectWidth - window.innerWidth;

      gsap.to(projectRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: workRef.current,
          start: "center center",
          end: () => `+=${projectWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: workRef } // auto cleanup
  );

  return (
    <>
      <section
        ref={workRef}
        className="min-h-screen bg-white text-black py-24 lg:py-40 overflow-hidden"
      >
        {/* Title */}
        <div className="main-container pb-8 lg:pb-12 flex max-md:flex-col gap-6 justify-between items-start md:items-end">
          <div className="max-w-xl">
            <h3 className="mb-3">Pilih Proyek</h3>
            <p className="text-lg lg:text-xl">
              Kumpulan proyek web yang menunjukkan pengalaman saya dalam
              membangun logika aplikasi, API, dan sistem berbasis data.
            </p>
          </div>

          <ButtonGradient
            text="Explore All"
            link="/projects"
            className="btn-light"
          />
        </div>

        {/* Projects */}
        <div
          ref={projectRef}
          className="lg:block overflow-x-auto lg:overflow-visible will-change-transform"
        >
          <div className="flex gap-4 lg:gap-8 ms-4 lg:ms-[40%] mt-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="relative rounded-2xl min-w-60 lg:min-w-xl h-64 lg:h-96 
                           overflow-hidden group cursor-pointer shrink-0"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span
                  className="absolute top-4 right-4 bg-black text-white uppercase
                             font-heading px-5 py-1 rounded-full text-sm lg:text-lg"
                >
                  {project.name}
                </span>
              </button>
            ))}
          </div>
        </div>
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
