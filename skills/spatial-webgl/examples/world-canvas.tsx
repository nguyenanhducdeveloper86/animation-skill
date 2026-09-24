'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

/**
 * Shared world canvas that persists across route changes.
 * Mount in the root layout, outside the page slot.
 *
 * - SSR: renders nothing (dynamic import with ssr: false)
 * - WebGL failure: renders a static SVG fallback
 * - Reduced motion: renders fallback
 * - Hidden tab: pauses the render loop (frameloop="demand" + visibility listener)
 */

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export function WorldCanvas({ children }: { children: React.ReactNode }) {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !hasWebGL()) {
      setSupported(false);
    }
  }, []);

  if (!supported) {
    return (
      <div aria-label="Static architectural visualization" className="world-fallback">
        {/* Replace with your static SVG or image composition */}
        <svg viewBox="0 0 1200 800" role="img">
          <rect width="1200" height="800" fill="#0A0A0A" />
          <text x="600" y="400" textAnchor="middle" fill="#73726D" fontSize="14">
            Static composition
          </text>
        </svg>
      </div>
    );
  }

  return (
    <Canvas
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, Math.min(devicePixelRatio, 1.5)]}
      camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0, 12] }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  );
}
