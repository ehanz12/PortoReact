import React from 'react'
import Magnetic from './Magnetic'

const ButtonGradient = ({ text, link, className = "" }) => {
  return (
    <Magnetic strength={0.25}>
      <a href={link} className={`btn uppercase font-heading border-2 border-transparent
      text-center min-w-[200px] py-3 md:py-4 lg:py-3 rounded-full transition-all duration-300 ease-in-out relative overflow-hidden group ${className}`}>
        <span className="relative z-10">{text}</span>
        {/* Shine sweep saat hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
      </a>
    </Magnetic>
  )
}

export default ButtonGradient
