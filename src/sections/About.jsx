import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const About = () => {

  const aboutRef = useRef(null);

  useGSAP(() => {
    SplitText.create(".about-text", {
      type: "lines, chars",
      onSplit(self) {
        gsap.set(self.chars, {
          opacity: 0.25
        })
        gsap.to(self.chars, {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1
          }
        })
      }
    })
  });

  return (
    <>
        <div ref={aboutRef} className='relative z-20 h-screen bg-white rounded-tl-[60px] rounded-tr-[60px]'>
            <div className='about-text main-container py-4 lg:py-12 h-full flex justify-center items-center text-black
            font-heading text-2xl leading-tight md:text-3xl xl:text-4xl'>
                Sebagai Backend Developer Junior, saya fokus membangun logika aplikasi yang solid, pengolahan data yang efisien, serta API yang terstruktur dengan baik. Saya memiliki pengalaman mengerjakan proyek backend sederhana dan terbiasa menerapkan kode yang bersih serta mudah dipelihara. Dengan semangat belajar dan kemampuan problem solving yang kuat, saya terus mengembangkan keterampilan backend untuk menciptakan sistem yang stabil, scalable, dan andal dalam mendukung aplikasi web modern.
            </div>
        </div>
    </>
  )
}

export default About