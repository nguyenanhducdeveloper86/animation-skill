---
name: gsap-scroll
description: Build scroll-driven experiences with GSAP, ScrollTrigger, and Lenis smooth scrolling. Use for pinned sequences, scrubbed timelines, reveal choreography, and App Router cleanup.
---

# GSAP Scroll

Scroll-linked animation using GSAP timelines, ScrollTrigger, and Lenis.

## Clock integration

One clock drives Lenis and ScrollTrigger. Register ScrollTrigger once. Feed Lenis from the GSAP ticker. Remove the ticker callback on unmount. Do not create a separate RAF.

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ autoRaf: false });
const tick = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(tick);
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);
```

## Lifecycle cleanup

Use `gsap.context` (vanilla or React) to scope all tweens and triggers. `context.revert()` kills them in one call.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.panel', {
      x: 100,
      scrollTrigger: { trigger: '.section', scrub: true }
    });
  }, containerRef);
  return () => ctx.revert();
}, []);
```

## Pinning

Pin only bounded sequences. Use `end: "+=<distance>"` or element-relative positions. Disable pinning on mobile and reduced-motion. Refresh triggers after layout changes:

```ts
ScrollTrigger.refresh();
```

## Lenis on touch and reduced-motion

Use native scrolling for coarse pointers and reduced-motion:

```ts
const isTouch = matchMedia('(pointer: coarse)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (isTouch || reducedMotion) lenis.destroy();
```

Anchor links must respect sticky header offsets and be instant in reduced-motion.

## Position parameter

Use timeline position to order reveals instead of arbitrary delays:

```ts
tl.to(a, { y: 0 }, '<0.08')    // slightly after previous start
  .to(b, { y: 0 }, '-=0.15');  // overlap previous end
```

## Reverse scroll

Scrubbed sequences must reverse cleanly. Set `scrub: true` or a numeric smoothing. A user scrolling backward must see the inverse of the forward composition, not a frozen state.

## Common mistakes

- Animating `top`, `left`, or `width` instead of transforms.
- Forgetting `ScrollTrigger.refresh()` after dynamic content.
- Using `delay` to sequence events instead of timeline position.
- Creating a tween without a context, causing leak on route change.
- Calling `lenis.raf` inside its own RAF when the GSAP ticker already handles it.
