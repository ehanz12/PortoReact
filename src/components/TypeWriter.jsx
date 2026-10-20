import React, { useRef, useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";
import { SoundManager } from "./SoundManager";

const TypeWriter = ({
  text,
  speed = 40,
  delay = 0,
  className = "",
  as: Tag = "span", // eslint-disable-line no-unused-vars
  onComplete,
  showCursor = true,
}) => {
  const ref = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = text;
      setDone(true);
      onComplete?.();
      return;
    }

    el.textContent = "";
    let i = 0;
    let timeout;

    const type = () => {
      if (i < text.length) {
        el.textContent += text[i];
        SoundManager.type();
        i++;
        timeout = setTimeout(type, speed + Math.random() * speed * 0.5);
      } else {
        setDone(true);
        onComplete?.();
      }
    };

    timeout = setTimeout(type, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <Tag ref={ref} className={`${className} ${showCursor && !done ? "terminal-cursor" : ""}`}>
      {prefersReducedMotion() ? text : ""}
    </Tag>
  );
};

export default TypeWriter;
