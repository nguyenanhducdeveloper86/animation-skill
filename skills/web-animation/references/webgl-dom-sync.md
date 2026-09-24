# WebGL and DOM composition

Treat the DOM as the accessible source of truth and WebGL as progressive enhancement. A shared root canvas can persist across routes; DOM proxy bounds can position meshes when exact alignment is needed.

Rules:

- Render essential headings, links, labels, and controls in HTML.
- Keep a single canvas/context where possible.
- Store pointer, scroll, camera, and scene progress in mutable refs/controllers—not React state per frame.
- Precompute fragment transforms and reuse geometry/materials. Allocate zero objects in the hot loop.
- Hoist lights/materials intentionally; dispose geometries, materials, textures, and listeners on teardown.
- Cap DPR and reduce density on small screens or sustained slow frames.
- Pause hidden tabs and modal-covered worlds.
- Provide an original static SVG/HTML fallback with equivalent meaning when WebGL is unavailable or reduced motion is active.

A beautiful canvas that obscures the headline is a composition bug, not a shader problem. Reserve a readable text column and verify it at 390px, 820px, and desktop widths.
