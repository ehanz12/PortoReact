import React from "react";

const CyberGrid = ({ className = "" }) => (
  <div
    className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
    aria-hidden="true"
    style={{
      backgroundImage: `
        linear-gradient(rgba(212, 168, 83, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(212, 168, 83, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
    }}
  />
);

export default CyberGrid;
