import React from "react";

const HeroSceneFallback = ({ dimmed = false }) => (
  <div
    className={`hero-scene-fallback${dimmed ? " is-dimmed" : ""}`}
    aria-hidden="true"
  >
    <div className="hero-scene-orb">
      <span className="hero-scene-ring ring-1" />
      <span className="hero-scene-ring ring-2" />
      <span className="hero-scene-ring ring-3" />
      <span className="hero-scene-core" />
    </div>
  </div>
);

export default HeroSceneFallback;
