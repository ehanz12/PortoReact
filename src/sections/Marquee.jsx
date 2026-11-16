import React, { useRef, useState } from 'react'
import logo2 from '../assets/images/logo2.svg'
import { prefersReducedMotion } from "../lib/motion";

const Marquee = () => {
  const PHRASE = "Where Data Logic and Performance Meet.";
  
  if (prefersReducedMotion()) return null;

  return (
    <div className='bg-black text-white border-t border-white/5 py-20 lg:py-32 overflow-hidden select-none'>
      <div className="relative flex overflow-x-hidden border-y border-white/5 py-4 lg:py-8 bg-zinc-950/20">
        <div className="animate-marquee-continuous flex whitespace-nowrap items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center mx-4 lg:mx-8">
              <span className="text-4xl sm:text-5xl lg:text-[6vw] font-heading font-bold uppercase tracking-tighter">
                {PHRASE}
              </span>
              <img 
                src={logo2} 
                alt="" 
                className="w-10 h-10 lg:w-[5vw] lg:h-[5vw] ml-8 lg:ml-16 opacity-50" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee-continuous2 flex whitespace-nowrap items-center py-4 lg:py-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center mx-4 lg:mx-8">
              <span className="text-4xl sm:text-5xl lg:text-[6vw] font-heading font-bold uppercase tracking-tighter">
                {PHRASE}
              </span>
              <img 
                src={logo2} 
                alt="" 
                className="w-10 h-10 lg:w-[5vw] lg:h-[5vw] ml-8 lg:ml-16 opacity-50" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-x-hidden mt-4 lg:mt-8">
        <div className="animate-marquee-reverse-continuous flex whitespace-nowrap items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center mx-4 lg:mx-8">
              <span className="text-4xl sm:text-5xl lg:text-[6vw] font-heading font-bold uppercase tracking-tighter gradient-text">
                {PHRASE}
              </span>
              <img 
                src={logo2} 
                alt="" 
                className="w-10 h-10 lg:w-[5vw] lg:h-[5vw] ml-8 lg:ml-16 opacity-30" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee-reverse-continuous2 flex whitespace-nowrap items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center mx-4 lg:mx-8">
              <span className="text-4xl sm:text-5xl lg:text-[6vw] font-heading font-bold uppercase tracking-tighter gradient-text">
                {PHRASE}
              </span>
              <img 
                src={logo2} 
                alt="" 
                className="w-10 h-10 lg:w-[5vw] lg:h-[5vw] ml-8 lg:ml-16 opacity-30" 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Marquee
