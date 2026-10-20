import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { seededRandom } from "../lib/motion";

const PALETTE = ["#FF4D6D", "#BD3EB2", "#7B2FF7", "#2F86F7", "#2FF7ED"];

const HeroScene3D = ({ tier = "full", onReady, onFail }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer = null;
    let scene = null;
    let camera = null;
    let group = null;
    let rafId = 0;
    let lastFrame = 0;
    let inView = true;
    let disposed = false;
    let failed = false;
    let resizeObserver = null;
    let intersectionObserver = null;

    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const fail = () => {
      if (failed || disposed) return;
      failed = true;
      stopLoop();
      onFail?.();
    };

    const stopLoop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const startLoop = () => {
      if (disposed || failed || !inView || document.hidden || rafId) return;
      lastFrame = 0;
      rafId = requestAnimationFrame(tick);
    };

    const tick = (now) => {
      if (disposed || failed || !inView || document.hidden) {
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(tick);

      /* Batasi ±30fps agar GPU/CPU tetap dingin */
      if (now - lastFrame < 33) return;
      lastFrame = now;

      const time = now * 0.001;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      if (group) {
        group.rotation.y = time * 0.06 + mouse.x * 0.25;
        group.rotation.x = Math.sin(time * 0.18) * 0.08 + mouse.y * 0.18;
      }

      if (camera) {
        camera.position.x = mouse.x * 0.35;
        camera.position.y = -mouse.y * 0.28;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    const onMouseMove = (e) => {
      if (!finePointer) return;
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const onContextLost = (e) => {
      e.preventDefault();
      fail();
    };

    const handleResize = () => {
      if (!renderer || !camera) return;
      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: tier === "full",
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: true,
      });

      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, tier === "full" ? 1.5 : 1);

      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.className = "hero-scene-canvas";
      mount.appendChild(renderer.domElement);

      renderer.domElement.addEventListener("webglcontextlost", onContextLost);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 6;

      group = new THREE.Group();
      scene.add(group);

      /* Wireframe luar & dalam */
      const shellGeo = new THREE.IcosahedronGeometry(1.95, tier === "full" ? 1 : 0);
      const shellMat = new THREE.MeshBasicMaterial({
        color: 0x7b2ff7,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
      });
      group.add(new THREE.Mesh(shellGeo, shellMat));

      const innerGeo = new THREE.IcosahedronGeometry(1.3, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x2f86f7,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      inner.rotation.x = 0.6;
      inner.rotation.y = 0.4;
      group.add(inner);

      /* Orbit rings */
      const ringPoints = (radius) =>
        Array.from({ length: 96 }, (_, i) => {
          const angle = (i / 96) * Math.PI * 2;
          return new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          );
        });

      const ringGeoA = new THREE.BufferGeometry().setFromPoints(ringPoints(2.45));
      const ringMatA = new THREE.LineBasicMaterial({
        color: 0xff4d6d,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
      });
      const ringA = new THREE.LineLoop(ringGeoA, ringMatA);
      ringA.rotation.x = Math.PI / 2.6;
      group.add(ringA);

      const ringGeoB = new THREE.BufferGeometry().setFromPoints(ringPoints(2.8));
      const ringMatB = new THREE.LineBasicMaterial({
        color: 0x2ff7ed,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      });
      const ringB = new THREE.LineLoop(ringGeoB, ringMatB);
      ringB.rotation.x = Math.PI / 1.7;
      ringB.rotation.y = 0.5;
      group.add(ringB);

      /* Particle field dengan vertex color */
      const count = tier === "full" ? 260 : 130;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const random = seededRandom(1337);
      const color = new THREE.Color();

      for (let i = 0; i < count; i += 1) {
        const radius = 2.1 + random() * 1.6;
        const theta = random() * Math.PI * 2;
        const phi = Math.acos(2 * random() - 1);
        const sinPhi = Math.sin(phi);

        positions[i * 3] = radius * sinPhi * Math.cos(theta);
        positions[i * 3 + 1] = radius * sinPhi * Math.sin(theta) * 0.72;
        positions[i * 3 + 2] = radius * Math.cos(phi);

        color.set(PALETTE[Math.floor(random() * PALETTE.length)]);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const particlesGeo = new THREE.BufferGeometry();
      particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particlesMat = new THREE.PointsMaterial({
        size: tier === "full" ? 0.035 : 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      group.add(new THREE.Points(particlesGeo, particlesMat));

      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(mount);

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView) startLoop();
          else stopLoop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(mount);

      if (finePointer) {
        window.addEventListener("mousemove", onMouseMove, { passive: true });
      }
      document.addEventListener("visibilitychange", onVisibility);

      renderer.render(scene, camera);
      onReady?.();
      startLoop();
    } catch (error) {
      console.warn("Gagal menginisialisasi scene 3D:", error);
      fail();
    }

    return () => {
      disposed = true;
      stopLoop();

      if (resizeObserver) resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();

      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);

      if (renderer) {
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      }

      if (scene) {
        scene.traverse((object) => {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material?.dispose();
          }
        });
      }

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss?.();
        renderer.domElement.remove();
      }
    };
  }, [tier, onReady, onFail]);

  return <div ref={mountRef} className="hero-scene-canvas-wrap" />;
};

export default HeroScene3D;
