"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { boutique as c } from "@/content/site";

const DURATION = 5; // seconds per slide

export function Boutique() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const idx = useRef(0);
  const [active, setActive] = useState(0);
  const slides = [...c.slides, c.slides[0]]; // trailing clone for a seamless loop

  useGSAP(() => {
    gsap.from("[data-b-text] > *", { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: root.current, start: "top 70%" } });
    const progress = gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: DURATION, ease: "none", repeat: -1,
      onRepeat: () => {
        const next = idx.current + 1;
        idx.current = next;
        gsap.to(track.current, { xPercent: next * 100, duration: 1.1, ease: "power3.inOut", onComplete: () => {
          if (idx.current === c.slides.length) { idx.current = 0; gsap.set(track.current, { xPercent: 0 }); }
          setActive(idx.current);
        } });
      },
    });
    gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } })
      .fromTo("[data-b-parallax]", { yPercent: -4 }, { yPercent: 4, ease: "none" });
    return () => { progress.kill(); };
  }, { scope: root });

  useEffect(() => { /* active index kept for a11y state only */ }, [active]);

  return (
    <div className="max-w-full overflow-x-clip" id="chapter-block-8">
      <section ref={root} data-role="split" data-recipe="crossfade-carousel" className="mx-auto w-full max-w-360 bg-white px-4 py-6 text-[#101010] lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 xl:gap-35">
          <div className="relative aspect-668/851 w-full overflow-clip lg:max-w-167 lg:flex-1">
            <ul ref={track} className="absolute inset-0 m-0 flex list-none flex-row-reverse p-0">
              {slides.map((s, i) => (
                <li key={i} className="relative h-full w-full shrink-0 overflow-clip" aria-hidden={i % c.slides.length !== active}>
                  <div data-b-parallax className="absolute -left-[15%] -right-[15%] -top-[10%] -bottom-[10%] overflow-hidden">
                    <div className="absolute inset-0"><img src={s.bg} alt={s.bgAlt} className="h-full w-full object-cover" /></div>
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 to-transparent to-[13%]" />
                  <div className="absolute inset-0">
                    <a aria-label={`View ${s.name}`} href={s.href} className="absolute left-1/2 top-[18%] flex aspect-416/555 w-[62%] max-w-104 -translate-x-1/2 flex-col rounded-[2px] bg-white">
                      <div className="relative mx-auto mt-[12%] w-[80%] flex-1"><div className="absolute inset-0"><img src={s.img} alt={s.imgAlt} className="h-full w-full object-contain" /></div></div>
                      <div className="flex flex-col items-center gap-0.5 px-4 pb-8 pt-4 text-center">
                        <span className="font-sans text-sm text-black">{s.name}</span>
                        <p className="font-futura text-sm uppercase text-black">{s.price}</p>
                      </div>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="pointer-events-none absolute bottom-8 left-1/2 z-[2] w-[143px] -translate-x-1/2">
              <div className="h-px w-full bg-white/30"><div ref={bar} className="h-px w-full origin-left scale-x-0 bg-white" /></div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center text-center lg:max-w-[438px] lg:shrink-0 lg:items-start lg:text-left">
            <div data-b-text className="flex w-full max-w-[438px] flex-col items-center gap-10 lg:items-start">
              <div className="flex w-full flex-col items-center gap-3 lg:items-start">
                <p className="trim font-futura text-xs font-medium uppercase leading-none tracking-[0.72px]">{c.eyebrow}</p>
                <h2 className="trim w-full font-futura text-[36px] font-medium uppercase leading-[0.85] tracking-[1.44px] md:text-[56px] md:tracking-[2.24px]"><span className="block whitespace-nowrap">{c.title}</span></h2>
              </div>
              <div className="w-full text-[14px] leading-[1.6] tracking-[-0.14px] text-[#101010]/80"><p>{c.body}</p></div>
              <Button href={c.cta.href} label={c.cta.label} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
