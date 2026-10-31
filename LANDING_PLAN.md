# Landing Page Plan: Spyker Cars

- **Brand:** SPYKER
- **Goal:** Handcrafted luxury grand tourer showcase and private atelier commission conversion.
- **Primary CTA:** Inquire Availability / Request Commission
- **Playbook:** DTC Luxury / Supercar Automotive (Specialized blend: `dtc-product.md` + `saas-b2b.md` enterprise-tier trust)
- **Target Audience:** Automotive collectors, connoisseurs of mechanical watchmaking, luxury drivers who value analogue engagement over digital detachment.
- **Design System:** Dark luxury aesthetic (`#08080a`), brushed titanium / gold accents (`#c5a059`), `swiss721` display typography, `PT Serif` editorial motto.

---

## Section Spine & Visual Architecture

| # | Section | Visitor Question | Essence | Visual Role | Media | Layout Pattern | Motion Recipe | Copy Source | Grows? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Hero Stage** | "What makes Spyker different in 2026?" | Mechanical purity, Dutch coachbuilding, and uncompromised analogue driving. | `hero-stage` | 1 hero stage (`asset-07.webp` C8 Preliator) | Centered headline with layered vehicle backdrop & specs bar | Stage entrance | `client/copy.md` | No |
| 2 | **Heritage Creed** | "What philosophy guides this marque?" | Over 140 years of tenacity and aeronautical heritage. | `statement` | Propeller watermark geometry | Large italic serif headline on deep obsidian | Line-by-line text | `client/copy.md` | No |
| 3 | **C8 Preliator Experience** | "What does it feel like inside the cockpit?" | Exposed manual gearshift, NACA aerodynamic ducts, and Hulshof diamond leather. | `scroll-story` | 3 chapter images (`asset-04.webp`, `asset-02.webp`, `asset-11.webp`) | Pinned sticky stage (desktop) / sequential (mobile) | Sticky media story | `client/copy.md` | No |
| 4 | **146-Year Heritage** | "Does this company have genuine pedigree?" | Carriage builders to the Royal Family, 1914 fighter aircraft, 1907 Peking to Paris trial. | `mosaic` | 3 archival assets (`asset-03.webp`, `asset-05.webp`, `asset-06.webp`) | 3-card luxury bento grid | Mask reveal | `client/copy.md` | No |
| 5 | **Boutique Collectibles** | "What craftsmanship extends beyond the car?" | Handcrafted aviator timepieces, driver weekender bags, sterling silver cufflinks. | `image-cards` | 3 product images (`asset-08.webp`, `asset-09.webp`, `asset-10.webp`) | 3-column card row with inquiry actions | Stagger cascade | `client/copy.md` | Yes |
| 6 | **Partnerships & Milestones** | "Where is Spyker active today?" | Global debut at The Bridge X in Bridgehampton, East Coast gathering. | `split` | 1 documentary photo (`asset-13.webp`) | 50/50 split with location & article highlights | Parallax depth | `client/copy.md` | No |
| 7 | **Closing Commission** | "How do I acquire one of the 25 examples?" | Direct private commission through the factory atelier in Zeewolde. | `statement` | Subtle ambient gold aura | Centered consultation & commission inquiry form | Soft rise | `client/copy.md` | No |

---

## Page Checks & Definition of Done
- **Roles Used:** `hero-stage`, `statement`, `scroll-story`, `mosaic`, `image-cards`, `split`, `statement` (6 distinct roles across 7 sections).
- **Neighbouring Same Role:** NONE. Rhythm alternates between dense, media-heavy, sticky story, and type-led moments.
- **Distinct Motion Recipes:** 6 distinct recipes (`Stage entrance`, `Line-by-line text`, `Sticky media story`, `Mask reveal`, `Stagger cascade`, `Parallax depth`, `Soft rise`).
- **Media Coverage:** Every non-statement section carries verified, high-resolution extracted assets from `public/media/`.
- **Text & Media Protection:** Text sits on quiet backgrounds, never over product focal points.
