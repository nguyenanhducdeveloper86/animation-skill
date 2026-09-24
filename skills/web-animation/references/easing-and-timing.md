# Easing and timing

Start from the message, not the library default.

| Intent | Curve | Why |
|---|---|---|
| Enter | `power3.out` / `cubic-bezier(.16,1,.3,1)` | Fast orientation, gentle settle |
| Exit | `power2.in` / `cubic-bezier(.7,0,1,.3)` | Leaves decisively |
| Reversible state | `power4.inOut` | Symmetric and controlled |
| Soft physical settle | spring with low bounce | Gesture/object only |
| Linear progress | `linear` | Time/progress representation only |

Avoid `ease-in` for content entering the reading order: it hides the important part at the start. Avoid perpetual `ease` loops for interface state. Use a clear rest state and a small amplitude.

Tune duration by distance and weight. A 4px icon response should not last as long as a full-screen route wipe. Never synchronize unrelated elements with identical duration merely for convenience.
