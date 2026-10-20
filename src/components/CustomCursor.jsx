import React, { useRef, useEffect, useState } from "react";
import { isFinePointer } from "../lib/motion";

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select';
const LABEL_ATTR = "data-cursor";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(() => isFinePointer() && window.innerWidth >= 1024);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let rafId;
    let isIdle = false;
    let idleTimeout = null;
    let pendingDot = false;

    const loop = () => {
      if (isIdle) return;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!isIdle) return;
      isIdle = false;
      rafId = requestAnimationFrame(loop);
    };

    const scheduleIdle = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isIdle = true;
        cancelAnimationFrame(rafId);
      }, 2000);
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ringX = mouseX;
        ringY = mouseY;
      }

      startLoop();
      scheduleIdle();

      // Throttle DOM write via rAF flag agar tidak setiap mousemove mentah
      if (!pendingDot) {
        pendingDot = true;
        requestAnimationFrame(() => {
          dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
          pendingDot = false;
        });
      }
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const labelTarget = t.closest(`[${LABEL_ATTR}]`);
      const hoverTarget = t.closest(HOVER_SELECTOR);

      if (labelTarget) {
        ring.classList.add("is-label");
        ring.classList.remove("is-hover");
        const labelEl = ring.querySelector(".cursor-label");
        if (labelEl) {
          labelEl.textContent =
            labelTarget.getAttribute(LABEL_ATTR) || "Lihat";
        }
      } else if (hoverTarget) {
        ring.classList.add("is-hover");
        ring.classList.remove("is-label");
      } else {
        ring.classList.remove("is-hover", "is-label");
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onText = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      /* Perkecil dot saat hover teks biasa */
      if (!t.closest(HOVER_SELECTOR)) {
        dot.style.scale = "2.2";
      } else {
        dot.style.scale = "1";
      }
    };

    // Satu listener mouseover saja (gabung onOver + onText)
    const onHover = (e) => {
      onOver(e);
      onText(e);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onHover, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      clearTimeout(idleTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="cursor-label" />
      </div>
    </>
  );
};

export default CustomCursor;
