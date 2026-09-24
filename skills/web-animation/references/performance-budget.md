# Animation performance budget

Measure the changed surface in a production build. Do not claim 60fps from a simulator screenshot.

Hot-loop rules:

- Read layout once, then write transforms; batch reads and writes.
- Prefer compositor-friendly `transform`, `opacity`, and sometimes `clip-path`.
- Avoid per-frame `filter`, `backdrop-filter`, large shadows, layout properties, and React state.
- Use one RAF/ticker. Cancel it on teardown.
- In R3F reuse vectors/matrices/quaternions and precompute transforms.
- Pause hidden/offscreen/modal-covered work.
- Start mobile at a lower DPR and reduce density only with hysteresis/cooldown.

Record cold-load LCP/CLS and interaction timings; inspect frame-time spikes while dragging, scrolling, opening panels, and resizing.
