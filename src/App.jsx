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
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  const [reducedMotion] = useState(prefersReducedMotion);
  const [loaded, setLoaded] = useState(reducedMotion);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {!reducedMotion && <Preloader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <PageTransition />
      <div className="grain-overlay" aria-hidden="true" />

      <div className={loaded ? "app-content is-ready" : "app-content"}>
        <ScrollToHash />
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Suspense>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default App;
