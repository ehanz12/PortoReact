import React from 'react'

const services = [
  {
    id: '01',
    title: ['Fullstack', 'Development'],
    desc: 'Saya membangun aplikasi web lengkap mulai dari sisi klien (frontend) yang responsif dan interaktif hingga sisi server (backend) yang menangani logika bisnis, pemrosesan data, serta komunikasi API secara efisien dan aman.',
    bg: 'bg-black text-white',
    stickyTop: 'lg:top-4',
    pb: 'lg:pb-160 pb-16',
  },
  {
    id: '02',
    title: ['API', 'Development'],
    desc: 'Saya merancang dan mengembangkan RESTful API untuk menghubungkan aplikasi dengan database maupun layanan eksternal. Saya memastikan API tersusun dengan baik, aman, dan mudah digunakan oleh aplikasi frontend atau mobile.',
    bg: 'bg-[#E9E9F0] text-black',
    stickyTop: 'lg:top-1/3',
    pb: 'lg:pb-92 pb-16',
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
  return (
    <div className='bg-white'>
      <div className="main-container pt-8 lg:pt-12">
        <h3 className='text-black/40'>Service Detail</h3>
      </div>

      <div className='relative'>
        {services.map((s) => (
          <div key={s.id} className={`relative ${s.bg} pt-16 lg:pt-20 ${s.pb} ${s.stickyTop} lg:sticky`}>
            <div className='main-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-start'>
              <div className='flex gap-6 lg:gap-8'>
                <span className='text-gray-400 text-lg font-heading tracking-wide block mb-4 shrink-0'>{s.id}</span>
                <h2 className='text-[8vw] md:text-6xl font-heading font-bold leading-none'>
                  {s.title[0]}<br />{s.title[1]}
                </h2>
              </div>
              <div className="flex items-center">
                <p className='text-base md:text-lg lg:text-xl leading-relaxed'>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Service
