---
name: motion-taste
description: Make restraint-first motion decisions — when to animate, which properties deserve it, how to avoid generic template feel, and how to critique existing motion. Use before coding, during review, or when the page feels flat or over-animated.
---

# Motion Taste

Fewer stronger movements beat a surface of independent effects. Motion is editorial, not decorative.

## Before adding motion

Ask these questions:

1. What changes state? Name the before/after.
2. What does the visitor learn from the movement that a static arrangement cannot communicate?
3. Does the visitor control the timing (scroll/click) or is it imposed (autoplay)?
4. Can a keyboard-only user reach the same information?
5. What happens when the animation fails to load?

If there is no clear answer, display the content statically.

## Do

- Use motion to establish spatial hierarchy: a lead element enters first, supporting elements follow.
- Ease entering content with a deceleration curve (`power3.out`). It orients fast, then settles.
- Ease exiting content with an acceleration curve (`power2.in`). It leaves decisively.
- Use directional clip or translate for editorial reveals. Use opacity for supporting text only.
- Show hover/focus state changes under 200ms.
- Keep scrubbed sequences reversible.
- Match the resting composition to the brand palette: no neon, no rainbow, no bounce unless the product is playful.

## Don't

- Don't animate every section entrance identically.
- Don't use `ease-in` for content entering the viewport.
- Don't bounce labels, metrics, or body text.
- Don't autoplay a carousel or looping hero unless the visitor asked.
- Don't apply glassmorphism, gradient borders, and parallax together.
- Don't claim 60fps without measuring.
- Don't add a loading screen for procedural geometry.
- Don't animate `box-shadow`, `filter`, or `backdrop-filter` per frame unless you measured the cost.
- Don't use `Math.random()` for element positions on every mount.

## Critique checklist

When reviewing existing motion:

1. **Intent**: Does each animated element have one identifiable job?
2. **Hierarchy**: Does the lead element move first? Is there a clear resting state?
3. **Curve**: Does entering content decelerate? Does exiting content accelerate?
4. **Duration**: Is the motion fast enough that it does not delay reading?
5. **Cleanup**: Are tweens, listeners, and timers removed on route change?
6. **Reduced motion**: Does content stay visible with instant state changes?
7. **Keyboard**: Can every animated control be reached and operated?
8. **Performance**: Are animated properties compositor-friendly? Is there a measurable budget?

Report the weakest three items and the strongest two. Do not flatten everything — keep what works.

## Brand motion identity

A studio site should feel like one team made it, not a collection of independent library demos. Choose one easing family, one reveal direction, one text treatment, and one interaction scale. Apply them consistently, then deviate for intentional emphasis only.
