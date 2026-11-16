import React, { useEffect, useState, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import PageTransition from "./components/PageTransition";
import { initLenis, destroyLenis, scrollToTarget } from "./lib/lenis";
import { prefersReducedMotion, signalAppReady } from "./lib/motion";

const Projects = React.lazy(() => import("./pages/Projects"));
const Certificates = React.lazy(() => import("./pages/Certificates"));

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Tunggu satu frame agar DOM siap, lalu pakai Lenis (tidak konflik)
      const id = setTimeout(() => {
        scrollToTarget(hash, { duration: 1.2 });
      }, 120);
      return () => clearTimeout(id);
    } else {
      scrollToTarget(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  const [reducedMotion] = useState(prefersReducedMotion);
  const [preloaderDone, setPreloaderDone] = useState(reducedMotion);

  useEffect(() => {
    if (!reducedMotion) {
      initLenis();
    }
    return () => destroyLenis();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      signalAppReady();
    }
  }, [reducedMotion]);

  return (
    <>
      {!reducedMotion && !preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <ScrollProgress />
      <div className="grain-overlay" aria-hidden="true" />

      <div className="app-content">
        <ScrollToHash />
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
          </Routes>
        </Suspense>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default App;
