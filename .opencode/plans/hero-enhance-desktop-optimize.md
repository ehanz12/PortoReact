# Rencana: Enhance Hero + Optimasi Desktop

---

## BAGIAN 1: Enhance Hero Section (Ramein tapi Tetap Ringan)

### 1A. Floating Particles Background (CSS-only, zero JS cost)
**File: `src/sections/Hero.jsx` + `src/index.css`**

Tambahkan ~8-12 titik kecil (2-4px) yang bergerak floating menggunakan CSS `@keyframes` saja. Tidak pakai JS/Canvas, sangat ringan.

```jsx
// Di dalam hero section, setelah hero-glow-2:
<div className="hero-particles" aria-hidden="true">
  {Array.from({ length: 10 }, (_, i) => (
    <span key={i} className={`hero-particle particle-${i + 1}`} />
  ))}
</div>
```

```css
/* CSS: */
.hero-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.hero-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(123, 47, 247, 0.4);
  animation: particle-float 8s ease-in-out infinite;
}
/* Variasikan posisi, ukuran, delay, durasi per partikel */
.particle-1 { top: 20%; left: 15%; animation-delay: 0s; animation-duration: 7s; }
.particle-2 { top: 60%; left: 25%; animation-delay: 1.2s; animation-duration: 9s; width: 2px; height: 2px; background: rgba(47, 134, 247, 0.3); }
.particle-3 { top: 35%; left: 70%; animation-delay: 2.5s; animation-duration: 6s; }
.particle-4 { top: 75%; left: 80%; animation-delay: 0.8s; animation-duration: 10s; width: 4px; height: 4px; background: rgba(255, 77, 109, 0.25); }
.particle-5 { top: 15%; left: 55%; animation-delay: 3s; animation-duration: 8s; }
.particle-6 { top: 50%; left: 40%; animation-delay: 1.8s; animation-duration: 7.5s; width: 2px; height: 2px; background: rgba(47, 247, 237, 0.3); }
.particle-7 { top: 80%; left: 10%; animation-delay: 0.5s; animation-duration: 9.5s; }
.particle-8 { top: 40%; left: 90%; animation-delay: 2s; animation-duration: 6.5s; width: 4px; height: 4px; background: rgba(123, 47, 247, 0.2); }

@keyframes particle-float {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
  25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
  50% { transform: translateY(-10px) translateX(-15px); opacity: 0.5; }
  75% { transform: translateY(-25px) translateX(5px); opacity: 0.8; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-particle { animation: none; opacity: 0.3; }
}
```

**Kenapa ini ringan:** Hanya CSS transform + opacity, diakhiri `will-change` oleh browser, GPU-accelerated. Tidak ada JS, tidak ada layout recalculation.

### 1B. Animated Gradient Photo Border
**File: `src/sections/Hero.jsx` + `src/index.css`**

Ubah statis `hero-photo-border` jadi gradient yang berputar pelan:

```css
.hero-photo-border {
  background: linear-gradient(var(--border-angle, 0deg),
    rgba(255,77,109,0.4), rgba(123,47,247,0.4), rgba(47,134,247,0.4), rgba(255,77,109,0.4));
  border-radius: 24px;
  padding: 2px;
  z-index: 0;
  animation: border-rotate 6s linear infinite;
}

@keyframes border-rotate {
  to { --border-angle: 360deg; }
}

/* Fallback: gunakan rotate pada pseudo-element jika @property tidak didukung */
```

**Catatan:** `@property` untuk CSS Houdini belum universal. Alternatif yang lebih kompatibel: buat 2 layer gradient, satu statis, satu berputar dengan `@keyframes` + `transform: rotate()`. Atau gunakan `background: conic-gradient(...)` yang bisa di-rotate via transform.

**Pilihan paling kompatibel:** Rotasi wrapper:
```css
.hero-photo-border {
  position: relative;
  border-radius: 24px;
  padding: 2px;
  z-index: 0;
  overflow: hidden;
}
.hero-photo-border::before {
  content: '';
  position: absolute;
  inset: -50%;
  background: conic-gradient(from 0deg, #FF4D6D, #BD3EB2, #7B2FF7, #2F86F7, #2FF7ED, #FF4D6D);
  animation: border-spin 4s linear infinite;
}
@keyframes border-spin {
  to { transform: rotate(360deg); }
}
```

### 1C. Floating Tech Stack Badge (Desktop Only)
**File: `src/sections/Hero.jsx`**

Tambahkan satu badge floating tambahan di sebelah kiri foto (atau di area yangkosong) yang menampilkan tech icons/logo. Gunakan CSS `animation: float` untuk efek melayang.

```jsx
// Tambahkan setelah floating label bottom-right:
<div data-depth="1.8" className="absolute top-1/2 -left-6 z-20 bg-black/80 border border-white/10 rounded-2xl px-3 py-2 backdrop-blur-md will-change-transform hidden lg:block">
  <div className="flex flex-col gap-2 items-center">
    <span className="text-lg">⚡</span>
    <span className="text-[10px] text-white/50 font-body writing-vertical">Fast</span>
  </div>
</div>
```

Dengan CSS float animation:
```css
@keyframes float-badge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

### 1D. Gradient Text Shimmer Effect
**File: `src/index.css`**

Tambahkan subtle shimmer pada gradient text:

```css
.gradient-text {
  background: linear-gradient(90deg, #FF4D6D 0%, #BD3EB2 40%, #7B2FF7 70%, #2F86F7 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Tapi ini akan mempengaruhi SEMUA .gradient-text.** Jika hanya untuk hero, buat class baru `.gradient-text-shimmer`.

### 1E. Stats Row Divider Animation
**File: `src/sections/Hero.jsx`**

Buat garis divider di stats row animasi gradient berjalan:

```jsx
// Ganti border-t stat:
<div className="hero-badge flex gap-8 mt-12 pt-8 justify-center lg:justify-start w-full lg:w-auto relative">
  <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
    <div className="h-full skill-bar-gradient animate-gradient-slide" style={{width: '100%'}} />
  </div>
  {/* stats */}
</div>
```

---

## BAGIAN 2: Optimasi Desktop Performance

### 2A. Grain Overlay - Reduce Animation Steps
**File: `src/index.css`**

`grain-shift` animation menggunakan 10 steps yang bergerak ke 10 posisi berbeda. Kurangi ke 6 steps atau kurangi ukuran overlay:

```css
.grain-overlay {
  /* ... existing ... */
  inset: -20%;       /* Dari -50% ke -20% = lebih kecil area yang perlu render */
  width: 140%;       /* Dari 200% ke 140% */
  height: 140%;
  animation: grain-shift 8s steps(6) infinite;  /* Dari 10 steps ke 6 */
}
```

### 2B. Grain Overlay - Disable di Desktop Juga (Jika Performa Masih Berat)
**File: `src/index.css`**

Pilihan agresif: nonaktifkan grain di semua device. Grain hanya estetika, bukan fitur:

```css
@media (max-width: 768px) {
  .grain-overlay { display: none; }
}
/* Atau nonaktifkan total: */
.grain-overlay { display: none; }
```

### 2C. Service Section - Matikan Sticky di Desktop Jika Berat
**File: `src/sections/Service.jsx`**

3 sticky cards + 9 ScrollTrigger instances = berat. Matikan sticky di desktop dan gunakan simple fade-in:

```jsx
// Di Service.jsx, ganti lg:sticky jadi tidak sticky:
<div className={`relative ${s.bg} pt-16 lg:pt-20 pb-16 overflow-hidden`}>
  // Hapus ${s.stickyTop} dan ${s.pb} 
```

Atau lebih halus: hilangkan `lg:sticky` tapi pertahankan animasi. Ini mengurangi layout recalculation yang mahal.

### 2D. Hero Pin - Tambahkan will-change
**File: `src/sections/Hero.jsx`**

```jsx
<div ref={heroRef} className="relative z-10 overflow-hidden will-change-transform">
```

### 2E. BackToTop & ScrollProgress - Throttle Lebih Agresif
**File: `src/components/BackToTop.jsx`**

Sudah pakai RAF throttle, sudah OK. Tidak perlu perubahan.

### 2F. Custom Cursor - Matikan di Resolusi < 1024px (Bukan Hanya pointer:coarse)
**File: `src/components/CustomCursor.jsx`**

```jsx
const [enabled] = useState(() => isFinePointer() && window.innerWidth >= 1024);
```

### 2G. Hero H1 Decoration Lines - Matikan di Mobile
**File: `src/index.css`**

```css
@media (max-width: 1023px) {
  h1::before, h1::after { display: none; }
}
```

---

## URUTAN IMPLEMENTASI

### Phase 1: Hero Enhancement (Ramein)
1. Floating particles (CSS-only) — Hero.jsx + index.css
2. Animated gradient photo border — index.css
3. Gradient text shimmer — index.css
4. Floating tech badge (desktop) — Hero.jsx

### Phase 2: Desktop Performance
5. Grain overlay reduce (steps + size) — index.css
6. Service sticky remove — Service.jsx
7. Hero will-change — Hero.jsx
8. Custom cursor desktop-only — CustomCursor.jsx
9. H1 decoration mobile disable — index.css

### Phase 3: Verify
10. Build + lint
11. Cek hasil

---

## ESTIMASI DAMPAK

| Metrik | Saat Ini | Sesudah |
|---|---|---|
| Hero visual | Statis, minimalis | Floating particles, gradient border, shimmer |
| Desktop grain | 10 steps 200% viewport | 6 steps 140% viewport |
| Service layout | 3 sticky + 9 ScrollTrigger | 3 normal + 9 ScrollTrigger (lebih ringan) |
| Custom cursor | Semua device dengan pointer:fine | Hanya desktop >= 1024px |
