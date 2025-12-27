import React from "react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* modal */}
      <div
        className="
          relative bg-white text-black rounded-2xl
          w-full max-w-3xl mx-4
          max-h-[90vh] overflow-y-auto
          p-4 sm:p-6 lg:p-10
          z-10
        "
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 sm:top-4 sm:right-4
            text-xl font-bold
            hover:scale-110 transition
          "
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* title */}
        <h3
          className="
            text-xl sm:text-2xl lg:text-3xl
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
              object-cover
              rounded-xl
            "
          />
        </div>

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
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center
            px-5 py-2.5 sm:px-6 sm:py-3
            rounded-full border border-black
            text-sm sm:text-base
            hover:bg-black hover:text-white
            transition
          "
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectModal;
