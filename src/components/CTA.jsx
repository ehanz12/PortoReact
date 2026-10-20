import React from 'react'
import ButtonGradient from './ButtonGradient'

const CTA = () => {
  return (
    <div className="bg-black border-t border-white/5">
      <div className="main-container py-20 lg:py-28 h-full flex flex-col gap-8 justify-center items-center">
        <div className="relative bg-zinc-950/60 border border-white/10 rounded-3xl backdrop-blur-md px-8 py-12 lg:px-16 lg:py-16 max-w-4xl w-full text-center overflow-hidden">
          {/* Gradient glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-purple-600/10 blur-[80px] pointer-events-none" />
          <h4 className="relative text-2xl lg:text-4xl text-white leading-tight font-heading font-semibold">
            Freelance, kolaborasi, atau full-time?{" "}
            <span className="gradient-text">Mari kenalan.</span>
          </h4>
          <div className="relative mt-8">
            <ButtonGradient text={"Book a Call"} link={"mailto:rhanssap@gmail.com"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA
