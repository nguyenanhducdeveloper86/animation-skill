---
name: web-animation
description: Build, audit, and refine production web animation with deliberate motion direction, coherent choreography, accessible degradation, and measurable performance. Use for hero motion, scroll stories, page transitions, micro-interactions, shared WebGL scenes, or animation quality reviews.
---

# Web Animation

Build motion as part of the interface's communication system, not decoration.

## Decision sequence

1. **Intent** — What does motion communicate? Choose one primary job: orientation, hierarchy, continuity, feedback, progress, or atmosphere.
2. **State** — Name the before/after states and the interrupting inputs. Avoid animating an undefined state.
3. **Hierarchy** — Pick one lead element, supporting elements, and static anchors. Do not make every element enter simultaneously.
4. **Property** — Prefer `transform` and `opacity`. Use `clip-path` sparingly for editorial reveals. Avoid animating width, height, top, left, margin, font-size, or box-shadow on every frame.
5. **Curve** — Use an ease-out for entering content, ease-in for exiting content, and a symmetric ease-in-out for reversible state changes. Springs are for physical objects and gestures, not every label.
6. **Clock** — CSS for independent simple motion; one GSAP/Lenis ticker for scroll choreography; one R3F render loop for a scene. Never create competing clocks.
7. **Fallback** — Reduced motion, no WebGL, touch, keyboard, slow device, hidden tab, and JS failure must retain content and usable controls.
8. **Proof** — Inspect screenshots and focus order. Test rapid repeat, reverse scroll, route Back/Forward, resize, interrupted gestures, and 200% zoom.

## Motion personality

- **Editorial**: restrained, asymmetric, deliberate. Long reveal with a clear resting state.
- **Tactile**: short press response, small scale/translate, no bounce unless the object is physically playful.
- **Spatial**: camera and parallax move less than the content; preserve a readable foreground plane.
- **Technical**: deterministic, inspectable, no random flicker or fake telemetry.

## Timing starting points

- Press/focus feedback: 120–220ms.
- Hover reveal: 180–320ms.
- Small state change: 240–420ms.
- Panel enter/exit: 420–720ms.
- Route wipe: 600–1000ms, with a timeout escape.
- Scroll scrub: derive duration from distance; do not tie reading to autoplay.

These are starting points. Tune against the actual visual hierarchy and input latency.

## Choreography

Use one lead timeline with labels. Establish, reveal, then settle:

```ts
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.fromTo(eyebrow, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35 })
  .fromTo(title, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.12')
  .fromTo(body, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '-=0.2');
```

Do not use arbitrary delays to hide race conditions. Use timeline relationships or explicit state.

## React lifecycle

Scope selectors to a ref. Prefer `@gsap/react` `useGSAP` or `gsap.context`; revert on cleanup. Do not put pointer coordinates or frame progress in React state. Keep mutable motion state in refs or an external controller, and subscribe only at semantic state boundaries.

## Scroll

- Register ScrollTrigger once.
- If using Lenis, drive it from the same GSAP ticker and remove the ticker callback on unmount.
- Refresh after font/layout/image changes.
- Pin only bounded sequences; disable pinning on phones and reduced motion.
- Anchor links must work natively and account for sticky headers.
- Reverse scroll must reassemble or restore, not leave a one-way transition stuck.

## Accessibility

`prefers-reduced-motion: reduce` means remove travel, autoplay, inertia, and kinetic type—not content. Replace with instant state changes or a static composition. Keep focus visible. A dialog must close with Escape and restore focus. A transition must never cover the page indefinitely.

## Performance

At steady state, no layout reads followed by writes in the same loop, no React setState from pointermove/useFrame, no allocations in a hot 3D loop, and no unbounded particle count. Pause hidden/offscreen scenes. Cap DPR. Measure interaction and frame time instead of claiming a target.

## Review output

When auditing existing animation, report: intent, ownership, clock, animated properties, cleanup, reduced-motion path, keyboard path, performance risk, and the smallest concrete fix. Include a browser screenshot or runtime observation when available.
