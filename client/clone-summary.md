# Clone Deconstruction: Mercedes-Maybach

Target URL: https://www.mercedes-benz.com/en/vehicles/mercedes-maybach/
Source HAR: /home/vishal-barai/Downloads/www.mercedes-benz.com.har
Generated: 2026-10-31T18:36:00.000Z

## 1. Extracted Media Assets (`public/media/` & `public/video/`)
- `/logo.svg` — Mercedes-Benz Three-Pointed Star (`mb-star-white.svg`)
- `/video/maybach-stage.webm` — Stage campaign video (`mercedes-maybach-brand-campaign-stage-video-mobile-1080x1440-08-2023.mp4`)
- `/video/maybach-fullscreen.webm` — Fullscreen campaign video (`mercedes-maybach-brand-campaign-fullscreen-video-1920x1080-08-2023.mp4`)
- `/media/maybach-star-pattern.jpg` — Star pattern campaign still (3840x2160)
- `/media/maybach-craftsmanship-01.avif` — Craftsmanship vertical gallery 01
- `/media/maybach-craftsmanship-02.jpg` — Craftsmanship vertical gallery 02
- `/media/maybach-layered-01.avif` — Layered gallery 01
- `/media/maybach-layered-02.jpg` — Layered gallery 02
- `/media/maybach-layered-03.jpg` — Layered gallery 03
- `/media/maybach-layered-04.avif` — Layered gallery 04
- `/media/maybach-layered-05.avif` — Layered gallery 05
- `/media/maybach-crossfade-01.jpg` — Cross-fade media 01
- `/media/maybach-crossfade-02.jpg` — Cross-fade media 02
- `/media/maybach-crossfade-03.jpg` — Cross-fade media 03
- `/media/maybach-night-series-01.jpg` — Vertical gallery 01 (GLS Night Series)
- `/media/maybach-night-series-02.jpg` — Vertical gallery 02 (GLS Night Series)
- `/media/maybach-eqs-fullscreen.jpg` — Fullscreen EQS SUV campaign image
- `/media/maybach-s-class.jpg` — Mercedes-Maybach S-Class (Z223)
- `/media/maybach-eqs-suv.jpg` — Mercedes-Maybach EQS SUV
- `/media/maybach-gls.jpg` — Mercedes-Maybach GLS

## 2. Section Spine Mapping (Preserving Cloned Structure)
| # | Component | Headline | Media |
|---|---|---|---|
| 1 | `Hero.tsx` | "Welcome to Beyond." | `/video/maybach-stage.webm` + `/media/maybach-star-pattern.jpg` |
| 2 | `PurePassion.tsx` | "Cosmos of Creation" | `/media/maybach-craftsmanship-01.avif`, `/media/maybach-craftsmanship-02.jpg`, `/video/maybach-fullscreen.webm` + `/media/maybach-layered-02.jpg` |
| 3 | `Nulla.tsx` | "Welcome to the Otherworldly" | `/video/maybach-fullscreen.webm` + `/media/maybach-star-pattern.jpg` |
| 4 | `Heritage.tsx` | "Welcome to Beyond" | 7-image collage (`maybach-star-pattern.jpg`, `maybach-layered-01..05`, `maybach-night-series-01.jpg`) |
| 5 | `Boutique.tsx` | "Go Beyond" | 3-model showcase (`Mercedes-Maybach S-Class`, `Mercedes-Maybach EQS SUV`, `Mercedes-Maybach GLS`) |
| 6 | `News.tsx` | "Models & Stories" | 3 editorial cards (`maybach-eqs-fullscreen.jpg`, `maybach-night-series-02.jpg`, `maybach-craftsmanship-02.jpg`) |
| 7 | `Newsletter.tsx` | "Welcome to Beyond" | `/media/maybach-crossfade-01.jpg` |
