import React from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Service from '../sections/Service'
import Work from '../sections/Work'
import Marquee from '../sections/Marquee'
import CTA from '../components/CTA'
import Certificates from '../sections/Certificates'


const Home = () => {
  return (
    <>
      <Hero /> 
      <About />
      <Service/>
      <Work/> 
      <Certificates />
      <Marquee/>
      <CTA />
    </>
  )
}

export default Home