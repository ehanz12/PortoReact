import React from 'react'
import logo2 from '../assets/images/logo2.svg'

const Marquee = () => {
  return (
    <>
      <div className='bg-white text-black pb-28 lg:pb-44 overflow-hidden'>
        {/* Row 1 */}
        <div className='whitespace-nowrap animate-marquee text-6xl lg:text-[7vw]
        font-heading font-semibold'>
          <span className='flex gap-4 lg:gap-8 mx-8'>
            Where Data  <img src={logo2} alt="" className='marquee-logo1 w-[7vw]'/>
            Logic <img src={logo2} alt="" className='marquee-logo1 w-[7vw]'/>
            and Performance Meet.<img src={logo2} alt="" className='marquee-logo1 w-[7vw]'/>
            Where Data <img src={logo2} alt="" className='marquee-logo1 w-[7vw]'/>
            Logic <img src={logo2} alt="" className='marquee-logo1 w-[7vw]'/>
            and Performance Meet.<img src={logo2} alt="" className='marquee-logo1 w-[7vw]'/>
          </span>
        </div>
        {/* Row 2 */}
        <div className='whitespace-nowrap animate-marquee-reverse text-6xl lg:text-[7vw]
        font-heading font-semibold'>
          <span className='flex gap-4 lg:gap-8 mx-8'>
            Where Data  <img src={logo2} alt="" className='marquee-logo2 w-[7vw]'/>
            Logic <img src={logo2} alt="" className='marquee-logo2 w-[7vw]'/>
            and Performance Meet.<img src={logo2} alt="" className='marquee-logo2 w-[7vw]'/>
            Where Data <img src={logo2} alt="" className='marquee-logo2 w-[7vw]'/>
            Logic <img src={logo2} alt="" className='marquee-logo2 w-[7vw]'/>
            and Performance Meet.<img src={logo2} alt="" className='marquee-logo2 w-[7vw]'/>
          </span>
        </div>
      </div>
    </>
  )
}

export default Marquee