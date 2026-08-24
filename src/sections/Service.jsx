import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    id: '01',
    title: ['Fullstack', 'Development'],
    desc: 'Saya membangun aplikasi web lengkap mulai dari sisi klien (frontend) yang responsif dan interaktif hingga sisi server (backend) yang menangani logika bisnis, pemrosesan data, serta komunikasi API secara efisien dan aman.',
    bg: 'bg-black text-white',
    stickyTop: 'lg:top-4',
    pb: 'lg:pb-[40rem] pb-16',
  },
  {
    id: '02',
    title: ['API', 'Development'],
    desc: 'Saya merancang dan mengembangkan RESTful API untuk menghubungkan aplikasi dengan database maupun layanan eksternal. Saya memastikan API tersusun dengan baik, aman, dan mudah digunakan oleh aplikasi frontend atau mobile.',
    bg: 'bg-[#E9E9F0] text-black',
    stickyTop: 'lg:top-1/3',
    pb: 'lg:pb-[23rem] pb-16',
  },
  {
    id: '03',
    title: ['Database', 'Management'],
    desc: 'Saya mengelola dan menstrukturkan database untuk menyimpan, mengambil, serta memproses data secara efisien. Hal ini mencakup perancangan skema database, penulisan query yang optimal, serta menjaga konsistensi data demi aplikasi yang andal dan stabil.',
    bg: 'bg-white text-black',
    stickyTop: 'lg:top-2/3',
    pb: 'lg:pb-20 pb-16',
  },
]

const Service = () => {
  const rootRef = useRef(null);

  useGSAP(() => {
    services.forEach((s) => {
      const card = rootRef.current?.querySelector(`[data-service="${s.id}"]`);
      if (!card) return;

      /* Nomor: slide dari kiri */
      gsap.from(card.querySelector('.service-num'), {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 70%' },
      });

      /* Judul: reveal dari bawah (masked) */
      gsap.from(card.querySelectorAll('.service-title-line'), {
        yPercent: 110,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: card, start: 'top 65%' },
      });

      /* Deskripsi: fade up */
      gsap.from(card.querySelector('.service-desc'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 55%' },
      });
    });
  }, { scope: rootRef });

  return (
    <div ref={rootRef} id="services" className='bg-white'>
      <div className="main-container pt-8 lg:pt-12">
        <h3 className='text-black/40'>Service Detail</h3>
      </div>

      <div className='relative'>
        {services.map((s) => (
          <div key={s.id} data-service={s.id} className={`relative ${s.bg} pt-16 lg:pt-20 ${s.pb} ${s.stickyTop} lg:sticky overflow-hidden`}>
            <div className='main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start'>
              <div className='flex gap-6 lg:gap-8'>
                <span className='service-num text-gray-400 text-lg font-heading tracking-wide block mb-4 shrink-0'>{s.id}</span>
                <h2 className='text-[8vw] md:text-6xl font-heading font-bold leading-none'>
                  <span className='block overflow-hidden pb-1'>
                    <span className='service-title-line block'>{s.title[0]}</span>
                  </span>
                  <span className='block overflow-hidden pb-2'>
                    <span className='service-title-line block'>{s.title[1]}</span>
                  </span>
                </h2>
              </div>
              <div className="flex items-center">
                <p className='service-desc text-base md:text-lg lg:text-xl leading-relaxed'>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Service
