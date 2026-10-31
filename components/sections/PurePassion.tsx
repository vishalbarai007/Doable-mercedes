"use client";
import { useRef } from "react";
import type { CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HlsVideo } from "@/components/ui/HlsVideo";
import { purePassion as c } from "@/content/site";

export function PurePassion() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from("[data-pp-text] > *", {
      y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: "[data-pp-text]", start: "top 85%" },
    });
    gsap.utils.toArray<HTMLElement>("[data-pp-frame]").forEach((frame) => {
      gsap.fromTo(frame, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: frame, start: "top 88%" },
      });
      gsap.fromTo(frame.querySelector("[data-pp-inner]"), { yPercent: -6 }, {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-pp-shift]").forEach((el, i) => {
      gsap.to(el, { y: (i % 2 ? -1 : 1) * 40, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }, { scope: root });

  return (
    <div ref={root}>
      <div className="max-w-full overflow-x-clip" id="chapter-block-1">
        <section data-role="split" data-recipe="parallax-depth" className="relative mb-[80px] w-full text-[#101010] lg:top-[150px] lg:mb-0">
          <div className="container">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center text-center lg:grid lg:grid-cols-12 lg:items-start lg:text-left" style={{ columnGap: "1.5em" }}>
              <div data-pp-text className="flex w-full max-w-[700px] flex-col items-center text-center lg:max-w-none lg:items-start lg:text-left" style={{ gridColumn: "2 / span 4" }}>
                <p className="trim font-futura text-xs font-medium uppercase leading-none tracking-[0.72px]">{c.eyebrow}</p>
                <h2 className="trim mt-2 w-full font-futura text-[56px] font-medium uppercase leading-[0.85] tracking-[2.24px]"><span className="block whitespace-nowrap">{c.title}</span></h2>
                <div className="mt-10 w-full text-[14px] leading-[1.6] tracking-[-0.14px] text-[#101010cc]"><p>{c.body}</p></div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="max-w-full overflow-x-clip" id="chapter-block-2">
        <section>
          <div className="container">
            <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 items-start max-lg:flex max-lg:flex-col" style={{ columnGap: "1.5em", rowGap: "clamp(3rem, 12vh, 5rem)" }}>
              {c.figures.map((f) => (
                <figure key={f.id} className="flex w-full min-w-0 flex-col self-start lg:[grid-column:var(--col)] lg:[grid-row:1] lg:[margin-top:var(--mt)]"
                  style={{ "--col": f.col, "--mt": `${f.mt}px` } as CSSProperties}>
                  <div data-pp-shift className="flex w-full flex-col will-change-transform">
                    <div data-pp-frame className="relative w-full overflow-hidden rounded-[2px] bg-black/10 max-lg:h-[420px]" style={{ height: f.height }}>
                      <div data-pp-inner className="absolute inset-x-0 -top-[10%] -bottom-[10%] overflow-hidden">
                        <HlsVideo src={f.video} poster={f.poster} />
                      </div>
                    </div>
                    <figcaption className="mt-3 w-full text-left font-sans text-[12px] font-normal leading-[160%] tracking-[-0.12px] text-black/50">
                      <p className="m-0 w-full whitespace-pre-line">{f.caption}</p>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
