"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HlsVideo } from "@/components/ui/HlsVideo";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/site";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  // Stage entrance, then the video drifts down and the copy lifts away as the hero scrolls out.
  useGSAP(() => {
    gsap.from("[data-hero-in]", { y: 24, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.3 });
    gsap.to("[data-hero-media]", {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("[data-hero-copy]", {
      yPercent: -12, opacity: 0, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
    });
  }, { scope: root });

  return (
    <div ref={root} id="high-impact-hero" data-role="hero-stage" data-recipe="stage-entrance" data-section-dark
      className="relative min-h-svh overflow-hidden bg-black text-white">
      <div data-hero-media className="absolute inset-x-0 -top-[10%] -bottom-[10%] z-0 select-none overflow-hidden">
        <HlsVideo src={hero.video} poster={hero.poster} />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div data-hero-copy className="container pointer-events-auto flex flex-col items-center gap-9 px-6 text-center">
          <div className="flex w-full flex-col items-center gap-4">
            <p data-hero-in className="trim font-futura text-xs font-medium uppercase leading-none tracking-[0.72px]">{hero.eyebrow}</p>
            <h1 data-hero-in aria-label={hero.lines.join(" ")} className="trim font-futura text-[56px] font-medium uppercase leading-[0.85] tracking-[2.24px]">
              <span className="block md:hidden">{hero.mobileLines.map((l) => <span key={l} className="block whitespace-nowrap">{l}</span>)}</span>
              <span className="hidden md:block">{hero.lines.map((l) => <span key={l} className="block whitespace-nowrap">{l}</span>)}</span>
            </h1>
          </div>
          <ul data-hero-in className="flex w-full flex-wrap justify-center gap-4 max-md:flex-col">
            <li className="max-md:w-full"><Button href={hero.cta.href} label={hero.cta.label} tone="light" /></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
