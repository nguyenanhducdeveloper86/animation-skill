# Page transitions

Keep the framework router authoritative. Preserve a real `href`; intercept only an ordinary same-origin primary click. Let modified clicks, downloads, external URLs, hash jumps, and Back/Forward use native behavior.

A safe route transition:

1. Capture intent and start a short wipe.
2. Navigate after the outgoing cover reaches the edge.
3. Reveal on destination pathname readiness.
4. Clear all timers and tweens on completion, error, unmount, or a timeout escape.
5. Focus the new main heading only after navigation succeeds.

Reduced motion skips the wipe. Never mount a loader that blocks access to the page. A failed navigation must restore pointer events and keyboard input.
