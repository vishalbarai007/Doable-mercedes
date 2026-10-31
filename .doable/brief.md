---
version: 1
status: approved
updated: 2026-10-30
---

# Design Brief: Spyker Cars

Binding source of truth for the Spyker Cars landing page deconstruction and clone build.

## 1. Locked decisions

### Brand
- BR-1 | decided | Name and one-line description: SPYKER · Handcrafted Dutch sports cars combining aviation heritage and mechanical purity.
- BR-2 | decided | Audience: High-net-worth automotive collectors, mechanical connoisseurs, bespoke luxury enthusiasts.
- BR-3 | decided | Tone: Unapologetic, analogue, aristocratic, engineered, timeless.
- BR-4 | decided | Primary action and exact CTA label: Request Commission / Inquire Availability.
- BR-5 | decided | Industry playbook: dtc-product / luxury automotive blend.
- BR-6 | decided | Taste profile: Aviation-inspired cockpits, exposed shift rods, aircraft toggle switches, quilted leather.

### Visual style
- ST-1 | decided | Style direction: Dark, technical, luxury automotive.
- ST-2 | decided | Density and whitespace: Spacious and balanced.
- ST-3 | decided | Shape language: Subtle pill buttons (9999px), softened card edges (16px), fine hairline metallic borders.

### Dimensionality
- DM-1 | decided | 2D with depth (parallax layers, glassmorphism, sticky stage crossfades).
- DM-2 | decided | 3D approach: None (high-resolution photography and CSS depth).

### Typography
- TY-1 | decided | Heading family: swiss721 / Inter Display (600, 700).
- TY-2 | decided | Body family: Inter / swiss721 Fallback (400, 500), PT Serif for Latin motto.
- TY-3 | decided | Scale: Medium (H1 up to 72px, H2 36-44px, Body 16px).

### Colour
- CO-1 | decided | Mode: Dark.
- CO-2 | decided | Palette: background: #08080a, surface: #121217, foreground: #f4f4f7, border: rgba(255,255,255,0.08), gold: #c5a059.
- CO-3 | decided | Accent: Milled gold / bronze (#c5a059) for badges and accents; white (#ffffff) for primary buttons.
- CO-4 | decided | Gradients: Radial lighting auras behind key product focal points.

### UI elements
- UI-1 | decided | Behaviour layer: Bespoke components with Radix accessibility.
- UI-2 | decided | Buttons: Pill shaped, gold and outline variants.
- UI-3 | decided | Card language: Dark graphite surface with 1px border and hover zoom on media.
- UI-4 | decided | Icons: Lucide and custom SVG propeller emblems.
- UI-5 | decided | Forms: Single-input inline private inquiry.

### Motion
- MO-1 | decided | Intensity: Moderate (budget: 1 pinned scene, 2 scrubbed, 4 entrance recipes).
- MO-2 | decided | Signature moment: C8 Preliator sticky chapter crossfade and Line-by-line motto reveal.
- MO-3 | decided | Reduced-motion behaviour: Content fully visible and static.
- MO-4 | decided | Hero motion reference: Stage entrance with staggered spec reveals.

### Imagery
- IM-1 | decided | Source: Real extracted Spyker photography (24 assets in public/media/).
- IM-2 | decided | Treatment: Natural studio and event lighting, no harsh crops, high-contrast dark tones.
- IM-3 | decided | Video: None.
- IM-4 | decided | Text-only sections: Motto statement and closing commission callout.

### Stack
- SK-1 | decided | Next.js 15 (App Router), Tailwind v4, GSAP + ScrollTrigger.

## 2. Changelog
- 2026-10-30 | created | Initial clone brief extracted and approved from spykercars.com.har
