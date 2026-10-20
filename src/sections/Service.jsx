import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "../components/TiltCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    id: '01',
    title: ['Fullstack', 'Development'],
    desc: 'Web end-to-end: frontend responsif, backend yang solid.',
  },
  {
    id: '02',
    title: ['API', 'Development'],
    desc: 'RESTful API yang aman, terstruktur, dan mudah dipakai.',
  },
  {
    id: '03',
    title: ['Database', 'Management'],
    desc: 'Skema rapi dan query optimal untuk data yang andal.',
  },
]

const Service = () => {
  const rootRef = useRef(null);

  useGSAP(() => {
    gsap.from(".service-card", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".service-grid", start: "top 75%", once: true },
    });
  }, { scope: rootRef });

  return (
    <div ref={rootRef} id="services" className='bg-black border-t border-white/5 py-24 lg:py-32'>
      <div className="main-container">
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="mb-3 text-white/40">Service Detail</h3>
            <p className="font-heading font-bold text-3xl lg:text-5xl text-white">
              Yang saya kerjakan
            </p>
          </div>
        </div>

        <div className='service-grid grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8'>
          {services.map((s) => (
            <TiltCard key={s.id} maxTilt={8} scale={1.02} className="h-full">
              <div
                data-service={s.id}
                className="service-card group relative h-full bg-zinc-950/60 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-md transition-colors duration-500 hover:border-purple-500/40 overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/20 group-hover:via-purple-500/10 group-hover:to-blue-500/20 transition-all duration-500 pointer-events-none" />

                <span className='relative block text-5xl lg:text-6xl font-heading font-bold text-white/10 group-hover:text-purple-500/40 transition-colors duration-500 mb-6'>
                  {s.id}
                </span>

                <h2 className='relative text-3xl lg:text-4xl font-heading font-bold leading-none text-white mb-4'>
                  <span className='block overflow-hidden pb-1'>
                    <span className='service-title-line block'>{s.title[0]}</span>
                  </span>
                  <span className='block overflow-hidden pb-2'>
                    <span className='service-title-line block text-stroke'>{s.title[1]}</span>
                  </span>
                </h2>

                <p className='service-desc relative text-sm lg:text-base text-white/50 leading-relaxed'>
                  {s.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Service
