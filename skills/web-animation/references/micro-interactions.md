# Micro-interactions

Use a state table before coding:

| State | Feedback |
|---|---|
| Hover/focus | Color, underline, 1–2px translate or controlled reveal |
| Press | Immediate scale/translate; return on release |
| Loading | Honest progress or indeterminate indicator; preserve label |
| Success | Clear confirmation, no celebratory overload |
| Error | Stable layout, localized explanation, retry path |
| Drag | Cursor/handle affordance, bounded movement, keyboard equivalent |

Targets are at least 44px on touch. Hover must not be the only way to discover content. Keep custom cursors opt-in for fine pointers and restore the native cursor on blur, leave, inputs, and teardown.
