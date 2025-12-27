import React, { useRef } from "react";
import ButtonGradient from "../components/ButtonGradient";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Hero = () => {
  const heroRef = useRef(null);

  //pin hero section
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    SplitText.create(heroRef.current.querySelector("h1"), {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 100,
          opacity: 0,
          stagger: 0.1,
        });
      },
    });

    SplitText.create(heroRef.current.querySelector("h2"), {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 100,
          opacity: 0,
          stagger: 0.15,
          delay: 0.3,
        });
      },
    });

    gsap.from(".gradien-btn", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
      clearProps: "opacity,transform",
  });
}, { scope: heroRef });

  return (
    <>
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="main-container min-h-screen flex flex-col lg:justify-center items-start lg:py-12 max-lg:pt-40">
          <h1 className="text-3xl lg:text-[3.2vw] uppercase font-heading font-semibold">
            Reihan Aditya
          </h1>
          <h2 className="text-5xl sm:text-6xl lg:text-[8vw] uppercase font-heading font-bold leading-none tracking-tight mt-3 mb-6">
            Backend
            <br />
            <span className="text-stroke cursor-pointer">Developer</span>
          </h2>
          <ButtonGradient
            text={"Let's Talk"}
            link={"mailto:rhanssap@gmail.com"}
            className="gradien-btn"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
