import React from 'react'

const Service = () => {
  return (
    <>
    <div className='bg-white text-black'>
        <div className="main-container pb-8 lg:pb-12">
            <h3>Service Detail</h3>
        </div>
    </div>

    <div className='relavite'>
        <div className='bg-black text-white pt-16 lg:pt-20 pb-160 sticky top-4'>
            <div className='main-container grid grid-cols-1 md:grid-cols-2 gap-6
            lg:gap-12 items-center'>
                {/* Left Side */}
                <div className='flex gap-6 lg:gap-8'>
                    <span className='text-gray-400 text-lg font-heading
                    tracking-wide block mb-4'>01</span>
                    <h2 className='text-[8vw] md:text-6xl font-heading font-bold leading-none'>
                        Fullstack  <br />Development
                    </h2>
                </div>
                {/* Right Side */}
                <div className="flex items-center">
                    <p className='text-lg lg:text-xl leading-relaxed'>
                        Saya membangun aplikasi web lengkap mulai dari sisi klien (frontend) yang responsif dan interaktif hingga sisi server (backend) yang menangani logika bisnis, pemrosesan data, serta komunikasi API secara efisien dan aman.
                    </p>
                </div>
            </div>
        </div>

        <div className='bg-[#E9E9F0] text-black pt-16 lg:pt-20 pb-92 sticky top-1/3'>
            <div className='main-container grid grid-cols-1 md:grid-cols-2 gap-6
            lg:gap-12 items-center'>
                {/* Left Side */}
                <div className='flex gap-6 lg:gap-8'>
                    <span className='text-gray-400 text-lg font-heading
                    tracking-wide block mb-4'>02</span>
                    <h2 className='text-[8vw] md:text-6xl font-heading font-bold leading-none'>
                        API  <br />Development
                    </h2>
                </div>
                {/* Right Side */}
                <div className="flex items-center">
                    <p className='text-lg lg:text-xl leading-relaxed'>
                        Saya merancang dan mengembangkan RESTful API untuk menghubungkan aplikasi dengan database maupun layanan eksternal. Saya memastikan API tersusun dengan baik, aman, dan mudah digunakan oleh aplikasi frontend atau mobile.
                    </p>
                </div>
            </div>
        </div>

        <div className='bg-white text-black py-16 lg:py-20 sticky top-2/3'>
            <div className='main-container grid grid-cols-1 md:grid-cols-2 gap-6
            lg:gap-12 items-center'>
                {/* Left Side */}
                <div className='flex gap-6 lg:gap-8'>
                    <span className='text-gray-400 text-lg font-heading
                    tracking-wide block mb-4'>03</span>
                    <h2 className='text-[8vw] md:text-6xl font-heading font-bold leading-none'>
                        Database <br /> Management
                    </h2>
                </div>
                {/* Right Side */}
                <div className="flex items-center">
                    <p className='text-lg lg:text-xl leading-relaxed'>
                        Saya mengelola dan menstrukturkan database untuk menyimpan, mengambil, serta memproses data secara efisien. Hal ini mencakup perancangan skema database, penulisan query yang optimal, serta menjaga konsistensi data demi aplikasi yang andal dan stabil.
                    </p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Service