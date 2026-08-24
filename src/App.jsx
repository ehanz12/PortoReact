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
import { initLenis } from "./lib/lenis";
import { prefersReducedMotion } from "./lib/motion";

const Projects = React.lazy(() => import("./pages/Projects"));

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
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
