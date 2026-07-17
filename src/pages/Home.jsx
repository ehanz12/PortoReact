import React from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Experience from '../sections/Experience'
import Service from '../sections/Service'
import Work from '../sections/Work'
import Certificates from '../sections/Certificates'
import GithubContributions from '../sections/GithubContributions'
import Marquee from '../sections/Marquee'
import CTA from '../components/CTA'


const Home = () => {
  return (
    <>
      <Hero /> 
      <About />
      <Experience />
      <Service/>
      <Work/> 
      <Certificates />
      <GithubContributions />
      <Marquee/>
      <CTA />
    </>
  )
}

export default Home