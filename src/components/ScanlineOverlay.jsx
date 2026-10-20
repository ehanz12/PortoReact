import React from "react";

const ScanlineOverlay = ({ opacity = 0.03 }) => (
  <div
    className="fixed inset-0 pointer-events-none z-[50]"
    style={{
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, ${opacity}) 2px,
        rgba(0, 0, 0, ${opacity}) 4px
      )`,
    }}
    aria-hidden="true"
  />
);

export default ScanlineOverlay;
