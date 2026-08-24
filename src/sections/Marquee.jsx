import React, { useRef } from 'react'
import logo2 from '../assets/images/logo2.svg'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, isFinePointer } from "../lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PHRASE = (
  <>
    Where Data <Img />
    Logic <Img />
    and Performance Meet.<Img />
    Where Data <Img />
    Logic <Img />
    and Performance Meet.<Img />
  </>
);

function Img() {
  return <img src={logo2} alt="" className="w-[5vw] lg:w-[7vw]" loading="lazy" decoding="async" />;
}

const Marquee = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // Skip GSAP ticker on mobile - use CSS animation instead
    if (!isFinePointer()) return;

    let velocity = 0;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        velocity = self.getVelocity();
      },
    });

    const setX1 = gsap.quickSetter(row1Ref.current, "xPercent");
    const setX2 = gsap.quickSetter(row2Ref.current, "xPercent");
    const setSkew = gsap.quickTo(row1Ref.current, "skewX", { duration: 0.4 });

    let pos1 = 0;
    let pos2 = 0;

    const tick = () => {
      const boost = gsap.utils.clamp(-5, 5, velocity / 900);
      velocity *= 0.95;

      const speed = 0.35 + Math.abs(boost);
      const dir = boost >= 0 ? 1 : -1;

      pos1 = gsap.utils.wrap(-50, 0, pos1 - speed * dir);
      pos2 = gsap.utils.wrap(-50, 0, pos2 + speed * dir);

      setX1(pos1);
      setX2(pos2);
      setSkew(gsap.utils.clamp(-8, 8, velocity / 250));
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // Mobile uses CSS animation, desktop uses GSAP ticker
  const useCssAnimation = !isFinePointer();

  return (
    <div className='bg-white text-black pb-28 lg:pb-44 overflow-hidden'>
      {/* Row 1 */}
      <div className='whitespace-nowrap text-4xl sm:text-5xl lg:text-[7vw] font-heading font-semibold overflow-hidden'>
        <span
          ref={row1Ref}
          className={`flex gap-3 lg:gap-8 mx-4 lg:mx-8 items-center will-change-transform ${
            useCssAnimation ? 'animate-marquee' : ''
          }`}
        >
          {PHRASE}
        </span>
      </div>
      {/* Row 2 */}
      <div className='whitespace-nowrap text-4xl sm:text-5xl lg:text-[7vw] font-heading font-semibold overflow-hidden'>
        <span
          ref={row2Ref}
          className={`flex gap-3 lg:gap-8 mx-4 lg:mx-8 items-center will-change-transform ${
            useCssAnimation ? 'animate-marquee-reverse' : ''
          }`}
        >
          {PHRASE}
        </span>
      </div>
    </div>
  )
}

export default Marquee
