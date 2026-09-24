'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll controller that unifies Lenis smooth scrolling with GSAP ScrollTrigger
 * on a single ticker. Cleans up fully on unmount for App Router compatibility.
 *
 * Usage:
 *   <ScrollController />
 *   Place once inside your layout. All ScrollTrigger instances created by children
 *   will share the same scroll owner.
 */
export function ScrollController() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = matchMedia('(pointer: coarse)').matches;

    // Skip smooth scrolling on touch devices and reduced-motion preference
    if (prefersReduced || isCoarse) return;

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;

    // Drive Lenis from the GSAP ticker — one clock, no competing RAF
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Feed Lenis scroll position into ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
