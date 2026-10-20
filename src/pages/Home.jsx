import React, { Suspense, lazy } from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'

const Experience = lazy(() => import('../sections/Experience'));
const Service = lazy(() => import('../sections/Service'));
const Work = lazy(() => import('../sections/Work'));
const Certificates = lazy(() => import('../sections/Certificates'));
const GithubContributions = lazy(() => import('../sections/GithubContributions'));
const Marquee = lazy(() => import('../sections/Marquee'));
const CTA = lazy(() => import('../components/CTA'));

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <Experience />
        <Service />
        <Work />
        <Certificates />
        <GithubContributions />
        <Marquee />
        <CTA />
      </Suspense>
    </>
  )
}

export default Home
