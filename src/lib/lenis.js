import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance = null;

export const initLenis = () => {
  if (lenisInstance) return lenisInstance;

  // Skip Lenis on touch devices - use native smooth scroll
  if (window.matchMedia('(pointer: coarse)').matches) return null;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  /* Anchor smooth scroll via Lenis (#about, /#experience, dst.) */
  document.addEventListener("click", handleAnchorClick);

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const destroyLenis = () => {
  document.removeEventListener("click", handleAnchorClick);
  if (!lenisInstance) return;
  gsap.ticker.remove((time) => lenisInstance?.raf(time * 1000));
  lenisInstance.destroy();
  lenisInstance = null;
};

export const scrollToTarget = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: -80,
      duration: 1.4,
      ...options,
    });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document
      .querySelector(typeof target === "string" ? target : "")
      ?.scrollIntoView({ behavior: "smooth" });
  }
};

const handleAnchorClick = (e) => {
  const anchor = e.target.closest('a[href*="#"]');
  if (!anchor || anchor.target === "_blank") return;

  const href = anchor.getAttribute("href");
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;

  const path = href.slice(0, hashIndex);
  const hash = href.slice(hashIndex);

  /* Hash di halaman yang sama → tangani manual via Lenis */
  const currentPath = window.location.pathname;
  const isSamePage =
    path === "" || path === currentPath || path === "/index.html";

  if (isSamePage && hash.length > 1) {
    e.preventDefault();
    scrollToTarget(hash);
  }
};
