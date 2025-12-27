import React from 'react'

const ButtonGradient = ({text, link, className=""}) => {
  return (
    <>
            <a href={link} className={`btn uppercase font-heading border-2 border-transparent
            text-center min-w-51.25 py-3 md:py-4 lg:py-3  rounded-full transition-all duration-300 ease-in-out ${className}`}>{text}</a>
    </>
  )
}

export default ButtonGradient