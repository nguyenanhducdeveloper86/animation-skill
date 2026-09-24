---
name: spatial-webgl
description: Build shared R3F canvases composited with DOM content — camera rigs, instanced procedural geometry, and graceful degradation. Use for spatial studios, 3D product viewers, immersive scroll worlds, and interactive labs.
---

# Spatial WebGL

Build a shared 3D canvas that supports DOM content, survives route changes, and degrades gracefully.

## Architecture

One `<Canvas>` per viewport. Mount outside route replacement so it persists across navigations. Render essential text, links, and headings in HTML above the canvas.

```tsx
const WorldCanvas = dynamic(
  () => import('@/components/webgl/WorldCanvas').then(m => m.WorldCanvas),
  { ssr: false }
);
```

SSR returns `null`; mount the canvas only after client hydration.

## Camera

Seed the camera position on the first frame to avoid a visible snap. Own the camera from a single `useFrame` rig. Damp the position using frame-rate-independent exponential smoothing:

```ts
const t = 1 - Math.exp(-rate * Math.min(delta, 0.1));
camera.position.lerp(target, t);
```

Clamp delta so a stalled tab does not teleport the camera.

## Readable center

Reserve a central column for DOM text. Calculate the column width from the camera frustum:

```ts
const halfHeight = Math.tan(fov / 2 * Math.PI / 180) * distance;
const halfWidth = halfHeight * aspect;
const reserved = halfWidth * 0.62; // fraction of half-width to keep empty
```

Move geometry outside `±reserved` at its depth. Verify at 390px, 820px, and desktop.

## Instancing and allocation

Use `InstancedMesh` and precompute per-instance transforms once. In `useFrame`:

- Never allocate `new Vector3()`, `new Matrix4()`, or arrays.
- Reuse module-scope scratch objects.
- Avoid `.map()`, spread, and closures.
- Update `instanceMatrix.needsUpdate` once per frame, not per instance.

## Materials and lighting

Share 2–4 materials across all instanced groups. Create in `useMemo`, dispose on unmount. Limit to 2 directional lights without shadow maps, plus ambient/hemisphere. Avoid per-frame material property changes.

## Fallback

Detect WebGL with a probe canvas. On failure or reduced-motion, render an original static composition — SVG, CSS illustration, or a descriptive image — with the same framing. Listen for `webglcontextlost` and switch at runtime.

## Fog and depth

Use scene fog matching the page background to fade distant geometry. This creates depth without postprocessing and prevents far objects from competing with text.

## Lab / modal canvases

A panel experiment that needs its own 3D scene uses a dedicated `<Canvas>` that mounts on open and disposes on close. Pause the world canvas while a lab canvas is active. Revert on close.

## Cleanup

Dispose geometry, materials, textures, and event listeners when the canvas unmounts — not on every re-render.
