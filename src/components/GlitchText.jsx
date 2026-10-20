import React, { useRef, useEffect, useCallback } from "react";
import { prefersReducedMotion } from "../lib/motion";

const GlitchText = ({
  text,
  as: Tag = "span", // eslint-disable-line no-unused-vars
  trigger = "viewport",
  intensity = 1,
  className = "",
}) => {
  const ref = useRef(null);
  const animRef = useRef(null);

  const glitch = useCallback(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);

    let frame = 0;
    const maxFrames = 6;
    const orig = text;

    const step = () => {
      frame++;
      if (frame > maxFrames) {
        el.textContent = orig;
        el.style.transform = "";
        el.style.textShadow = "";
        return;
      }

      const displace = (Math.random() - 0.5) * 4 * intensity;
      el.style.transform = `translateX(${displace}px)`;
      el.style.textShadow = `${displace}px 0 rgba(212,168,83,0.7), ${-displace}px 0 rgba(192,139,92,0.7)`;

      let output = "";
      for (let i = 0; i < orig.length; i++) {
        if (orig[i] === " ") { output += " "; continue; }
        if (Math.random() < 0.3 * intensity) {
          output += String.fromCharCode(33 + Math.floor(Math.random() * 94));
        } else {
          output += orig[i];
        }
      }
      el.textContent = output;

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
  }, [text, intensity]);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    if (trigger === "hover") {
      el.addEventListener("mouseenter", glitch);
      return () => el.removeEventListener("mouseenter", glitch);
    }

    if (trigger === "click") {
      el.addEventListener("click", glitch);
      return () => el.removeEventListener("click", glitch);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          glitch();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(animRef.current); };
  }, [glitch, trigger]);

  return (
    <Tag ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {text}
    </Tag>
  );
};

export default GlitchText;
