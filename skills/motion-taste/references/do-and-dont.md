# Do and Don't

## Reveals

**Do:** Lead element enters first with directional translate + opacity. Supporting text follows with a shorter travel and overlap.

```tsx
tl.fromTo(headline, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' })
  .fromTo(body, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35 }, '-=0.18');
```

**Don't:** Every element fades in identically with `duration: 1, ease: 'power1.inOut'`. No hierarchy, slow reading, template feel.

## Hover

**Do:** Underline or color shift in 160ms. Small translate (1–2px) for depth.

**Don't:** Scale 1.08 + rotate + shadow + color + border simultaneously on a text link.

## Scroll sequences

**Do:** Scrub a bounded timeline. Content assembles on scroll and disassembles on reverse.

**Don't:** Play a one-shot animation on intersection with no reverse. Scrolling back shows a dead panel.

## WebGL

**Do:** Reserve readable text column. Fog matches background. Fallback SVG when WebGL unavailable.

**Don't:** Canvas covers headline. No fallback. Pointer events disabled on touch. Context lost = blank page.

## Easing

**Do:** `power3.out` for entering content. Fast orientation, soft settle.

**Don't:** `ease-in` for entering content. The important part is hidden at the start, then arrives abruptly.

## Duration

**Do:** Button press 150ms. Panel enter 500ms. Route wipe 800ms with a 2s timeout escape.

**Don't:** Everything at 300ms regardless of travel distance or visual weight.

## Reduced motion

**Do:** Instant state change. Content visible. Focus order preserved. No autoplay. Controls still work.

**Don't:** `display: none` on the entire animated section. Or ignore `prefers-reduced-motion` entirely.
