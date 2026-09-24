# Scroll choreography

Use one owner for scroll smoothing and one owner for scroll-linked animation.

```ts
const lenis = new Lenis({ autoRaf: false });
const tick = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(tick);
gsap.ticker.lagSmoothing(0);
const context = gsap.context(() => {
  gsap.to(panel, { x: 120, scrollTrigger: { trigger, scrub: true, start: 'top top', end: '+=1200' } });
});
return () => { context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
```

Use native scroll on touch and reduced motion unless there is a measured reason not to. Pin only a bounded sequence. Ensure the document still contains the text in normal flow. Call `ScrollTrigger.refresh()` after fonts, images, or dynamic panels change layout. Do not hide content behind a trigger that can fail to initialize.
