import React from "react";
import Magnetic from "./Magnetic";
import { SoundManager } from "./SoundManager";

const ButtonCyber = ({ text, href, onClick, variant = "green", className = "" }) => {
  const base = "relative inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider rounded transition-all duration-300 group overflow-hidden";

  const variants = {
    green: "border border-accent/50 text-accent hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(212,168,83,0.2)]",
    cyan: "border border-accent-copper/50 text-accent-copper hover:bg-accent-copper/10 hover:shadow-[0_0_20px_rgba(192,139,92,0.2)]",
    filled: "bg-accent text-void border border-accent hover:bg-accent-copper hover:border-accent-copper hover:shadow-[0_0_20px_rgba(192,139,92,0.3)]",
  };

  const inner = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
      <span className="relative z-10">{text}</span>
      <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </>
  );

  const handleClick = (e) => {
    SoundManager.command();
    onClick?.(e);
  };

  if (href) {
    return (
      <Magnetic strength={0.3}>
        <a
          href={href}
          className={`${base} ${variants[variant]} ${className}`}
          onClick={handleClick}
        >
          {inner}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={0.3}>
      <button
        className={`${base} ${variants[variant]} ${className}`}
        onClick={handleClick}
      >
        {inner}
      </button>
    </Magnetic>
  );
};

export default ButtonCyber;
