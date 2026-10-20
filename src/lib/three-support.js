const SOFTWARE_RENDERER =
  /swiftshader|llvmpipe|software|basic render|microsoft basic/i;

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });

    if (!gl) return false;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : "";

    if (SOFTWARE_RENDERER.test(renderer)) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return false;
    }

    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
};

/**
 * Menentukan level scene 3D:
 * - "off"  : pakai fallback CSS (mobile/touch, reduced motion, hemat data, tanpa WebGL)
 * - "lite" : WebGL ringan (device kelas menengah)
 * - "full" : WebGL dengan detail lebih (desktop capable)
 */
export const get3DTier = () => {
  if (typeof window === "undefined") return "off";

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "off";
  }

  if (navigator.connection?.saveData) return "off";
  if (window.matchMedia?.("(pointer: coarse)").matches) return "off";
  if (window.innerWidth < 768) return "off";

  if (!hasWebGL()) return "off";

  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 8;

  return cores >= 6 && memory >= 6 ? "full" : "lite";
};
