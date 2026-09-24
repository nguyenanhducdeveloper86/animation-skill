# Animation Skill Agent Guidance

## Before coding

1. Identify the user-visible intent: orientation, hierarchy, feedback, continuity, or atmosphere.
2. Map the interaction state machine: idle, hover/focus, press/drag, loading, success, error, exit.
3. Choose the smallest mechanism that expresses the intent: CSS first, native View Transitions when sufficient, GSAP for orchestration/scrubbing, R3F only for spatial rendering.
4. Define reduced-motion behavior and keyboard behavior before the animated path.
5. Inspect the existing animation clock, router, scroll implementation, and styling cascade. Reuse them; do not create a second clock or competing transition system.

## Non-negotiables

- Never hide essential content until JavaScript succeeds.
- Never trap input behind a transition, loader, or dialog.
- Never use `setInterval` for animation; use one requestAnimationFrame/ticker or CSS.
- Animate `transform` and `opacity` by default. Treat layout, paint-heavy filters, and per-frame React state as suspicious.
- Clean every listener, timer, tween, ScrollTrigger, object URL, geometry, material, and observer.
- Honor `prefers-reduced-motion`, coarse pointers, save-data, hidden tabs, and WebGL failure.
- Verify the actual browser surface at desktop and mobile. A passing typecheck is not animation acceptance.

## Quality bar

Motion should explain the product, preserve reading order, feel physically coherent, and stop when its job is complete. Fewer stronger movements beat a page of independent effects.
