# Rencana Optimasi Portfolio Website

## Status: Menunggu Persetujuan

---

## 1. Lazy Loading Gambar (HIGH IMPACT)

### File: `src/sections/About.jsx` (baris 134-137)
Tambahkan `loading="lazy" decoding="async"` pada foto profil About:
```jsx
<img
  src={profilePhoto}
  alt="Reihan Aditya Putra"
  className="w-full h-full object-cover object-top"
  loading="lazy"
  decoding="async"
/>
```

### File: `src/sections/Hero.jsx` (baris 273-277)
Hero photo = above the fold, tambahkan `fetchPriority="high"`:
```jsx
<img
  src={profilePhoto}
  alt="Reihan Aditya Putra"
  className="w-full h-full object-cover object-top"
  fetchPriority="high"
/>
```

### File: `src/sections/Certificates.jsx` (baris 194-198)
Tambahkan `loading="lazy" decoding="async"` pada semua gambar sertifikat di grid:
```jsx
<img
  src={cert.image}
  alt={cert.title}
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  loading="lazy"
  decoding="async"
/>
```

### File: `src/sections/Certificates.jsx` (baris 272-276)
Gambar lightbox tetap eager (user sudah klik):
```jsx
<img
  src={certificatesData[activeCert].image}
  alt={certificatesData[activeCert].title}
  className="w-full h-auto"
  loading="lazy"
  decoding="async"
/>
```

### File: `src/sections/Work.jsx` (baris 90-94)
Tambahkan `loading="lazy" decoding="async"`:
```jsx
<img
  src={project.image}
  alt={project.name}
  className="work-card-img w-full h-full object-cover will-change-transform"
  loading="lazy"
  decoding="async"
/>
```

### File: `src/sections/GithubContributions.jsx` (baris 195-199)
Avatar GitHub:
```jsx
<img
  src={profile?.avatar_url || "..."}
  alt={profile?.name || "Reihan Aditya"}
  className="w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:border-indigo-400 transition-colors duration-300"
  loading="lazy"
  decoding="async"
/>
```

### File: `src/sections/Marquee.jsx` (baris 22)
Logo marquee:
```jsx
function Img() {
  return <img src={logo2} alt="" className="w-[5vw] lg:w-[7vw]" loading="lazy" decoding="async" />;
}
```

---

## 2. Code Splitting Route (HIGH IMPACT)

### File: `src/App.jsx`
Ganti import statis Projects dengan React.lazy():
```jsx
import React, { useEffect, useState, Suspense } from "react";
// ... existing imports

const Projects = React.lazy(() => import("./pages/Projects"));

// Dalam JSX, bungkus Routes dengan Suspense:
<Suspense fallback={null}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/projects" element={<Projects />} />
  </Routes>
</Suspense>
```

---

## 3. Optimasi Font (HIGH IMPACT - 602KB -> ~80KB)

### File: `src/index.css`
Ganti import fontsource dengan import yang lebih spesifik. @fontsource sudah meng-load semua subset secara default. Kita perlu membatasi subset:

```css
/* GANTI baris 2-6 dengan: */
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/syne/500.css";
@import "@fontsource/syne/600.css";
@import "@fontsource/syne/700.css";
```

**Catatan:** @fontsource v5+ sudah hanya load latin subset secara default. Untuk memastikan, tambahkan di vite.config.js:
```js
// Di build.rollupOptions:
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        fonts: ['@fontsource/inter', '@fontsource/syne'],
      }
    }
  }
}
```

Atau lebih agresif: gunakan CDN Google Fonts dengan `&display=swap` dan hanya load latin:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Syne:wght@500;600;700&display=swap');
```
Hapus `@import "@fontsource/inter/..."` dan `@import "@fontsource/syne/..."`.

---

## 4. Grain Overlay - Disable di Mobile (MEDIUM IMPACT)

### File: `src/index.css`
Tambahkan media query setelah definisi `.grain-overlay` (sekitar baris 199):

```css
@media (max-width: 768px) {
  .grain-overlay {
    display: none;
  }
}
```

---

## 5. Custom Cursor - Pause RAF Loop saat Idle (MEDIUM IMPACT)

### File: `src/components/CustomCursor.jsx`
Modifikasi RAF loop agar berhenti saat mouse diam dan restart saat mouse bergerak:

```jsx
let idleTimeout = null;
let isIdle = false;

const onMove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!visible) {
    visible = true;
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    ringX = mouseX;
    ringY = mouseY;
  }

  // Restart loop jika idle
  if (isIdle) {
    isIdle = false;
    rafId = requestAnimationFrame(loop);
  }

  // Reset idle timeout
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    isIdle = true;
    cancelAnimationFrame(rafId);
  }, 2000); // 2 detik tanpa mouse movement = pause

  dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
};

const loop = () => {
  if (isIdle) return;
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  rafId = requestAnimationFrame(loop);
};
```

---

## 6. Marquee - CSS Animation di Mobile (MEDIUM IMPACT)

### File: `src/sections/Marquee.jsx`
Modifikasi useGSAP agar hanya berjalan di desktop. Di mobile, gunakan CSS animation yang sudah ada:

```jsx
import { isFinePointer } from "../lib/motion";

const Marquee = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    // HANYA desktop yang pakai gsap ticker
    if (!isFinePointer()) return;

    // ... kode gsap ticker yang sudah ada ...
  }, []);

  // Di mobile, gunakan CSS class animate-marquee
  const isMobile = !isFinePointer();

  return (
    <div className='bg-white text-black pb-28 lg:pb-44 overflow-hidden'>
      <div className='whitespace-nowrap text-4xl sm:text-5xl lg:text-[7vw] font-heading font-semibold overflow-hidden'>
        <span
          ref={row1Ref}
          className={`flex gap-3 lg:gap-8 mx-4 lg:mx-8 items-center will-change-transform ${
            isMobile ? 'animate-marquee' : ''
          }`}
        >
          {PHRASE}
        </span>
      </div>
      <div className='whitespace-nowrap text-4xl sm:text-5xl lg:text-[7vw] font-heading font-semibold overflow-hidden'>
        <span
          ref={row2Ref}
          className={`flex gap-3 lg:gap-8 mx-4 lg:mx-8 items-center will-change-transform ${
            isMobile ? 'animate-marquee-reverse' : ''
          }`}
        >
          {PHRASE}
        </span>
      </div>
    </div>
  );
};
```

---

## 7. Lenis - Skip di Mobile (MEDIUM IMPACT)

### File: `src/lib/lenis.js`
Tambahkan pengecekan pointer type di `initLenis`:
```js
export const initLenis = () => {
  if (lenisInstance) return lenisInstance;

  // Skip Lenis di touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return null;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });
  // ... sisa kode ...
};
```

### File: `src/App.jsx`
Update initLenis call:
```js
useEffect(() => {
  if (!reducedMotion) {
    initLenis(); // Sekarang auto-skip di mobile
  }
}, [reducedMotion]);
```

---

## 8. Certificates - Dynamic Import Gambar (MEDIUM IMPACT)

### File: `src/sections/Certificates.jsx`
Ganti import statis dengan array paths untuk mengurangi initial bundle:

```jsx
// HAPUS baris 7-16 (import sertifikat1-10)

// GANTI certificatesData:
const certificatesData = [
  {
    id: 1,
    image: new URL("../assets/images/sertifikat1.webp", import.meta.url).href,
    title: "Google Cloud Roadshows",
    // ... sisa data
  },
  // ... untuk semua 10 sertifikat
];
```

**Atau** gunakan lazy import approach yang lebih clean:
```jsx
const certImages = import.meta.glob("../assets/images/sertifikat*.webp", { eager: true, as: "url" });

const certificatesData = Object.entries(certImages).map(([path, url], index) => ({
  id: index + 1,
  image: url.default || url,
  // ... data lainnya
}));
```

---

## 9. Hero - Simplifikasi Mobile (MEDIUM IMPACT)

### File: `src/sections/Hero.jsx`
Modifikasi ScrollTrigger pin agar tidak aktif di mobile:

```jsx
useGSAP(() => {
  SplitText.create(heroRef.current.querySelector("h1"), {
    type: "lines, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      introTl.current = gsap.timeline({ paused: true });
      // ... sisa animasi ...
    },
  });

  // HANYA pin di desktop (>= 1024px)
  if (window.innerWidth >= 1024) {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: true,
      scrub: 1,
    });
  }

  // ... sisa kode ...
}, { scope: heroRef });
```

---

## 10. GitHub Cache (LOW IMPACT)

### File: `src/sections/GithubContributions.jsx`
Tambahkan localStorage caching:

```jsx
const CACHE_KEY = "github_data";
const CACHE_TTL = 60 * 60 * 1000; // 1 jam

useEffect(() => {
  const fetchGithubData = async () => {
    // Cek cache dulu
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setProfile(data.profile);
        setRepos(data.repos);
        setLoading(false);
        return;
      }
    }

    try {
      const profileRes = await fetch("https://api.github.com/users/ehanz12");
      // ... existing code ...

      // Simpan ke cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: { profile: profileData, repos: reposData.slice(0, 4) },
        timestamp: Date.now()
      }));
    } catch (error) {
      // ... existing fallback ...
    }
  };

  fetchGithubData();
}, []);
```

---

## 11. Vite Build Optimization (LOW IMPACT)

### File: `vite.config.js`
Tambahkan manualChunks untuk split GSAP:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
```

---

## Urutan Implementasi

1. Lazy Loading (file edit sederhana, high impact)
2. Code Splitting (App.jsx only)
3. Optimasi Font (index.css)
4. Grain Overlay Mobile Disable (index.css)
5. Custom Cursor Pause (CustomCursor.jsx)
6. Marquee Mobile CSS (Marquee.jsx)
7. Lenis Skip Mobile (lenis.js)
8. Certificates Dynamic Import (Certificates.jsx)
9. Hero Mobile Simplify (Hero.jsx)
10. GitHub Cache (GithubContributions.jsx)
11. Vite Build Config (vite.config.js)
12. Build & Verify
