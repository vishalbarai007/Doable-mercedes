"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { heritage as c } from "@/content/site";

// Mobile placements from the live page (index into c.images); images 5 and 6 are desktop only.
const mobile: Record<number, { top: string; left: string; width: string; ratio: string; op: number; reveal: string }> = {
  1: { top: "2%", left: "-18%", width: "42vw", ratio: "4 / 3", op: 0.14, reveal: "left" },
  2: { top: "6%", left: "78%", width: "40vw", ratio: "3 / 2", op: 0.16, reveal: "right" },
  3: { top: "68%", left: "-12%", width: "38vw", ratio: "4 / 3", op: 0.14, reveal: "left" },
  4: { top: "72%", left: "62%", width: "52vw", ratio: "4 / 3", op: 0.2, reveal: "right" },
};

const clipFrom = (reveal: string) =>
  reveal === "left" ? "inset(0 100% 0 0)" : reveal === "right" ? "inset(0 0 0 100%)" : "inset(0 0 100% 0)";

export function Heritage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const frames = gsap.utils.toArray<HTMLElement>("[data-h-desktop] [data-h-frame]");
      frames.forEach((f, i) => {
        const img = c.images[i];
        gsap.fromTo(f, { opacity: 0, clipPath: clipFrom(img.reveal) },
          { opacity: img.op, clipPath: "inset(0 0 0 0)", duration: 1.4, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: root.current, start: "top 65%" } });
        if (img.scale) gsap.fromTo(f.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 65%" } });
      });
      // pointer parallax: each layer drifts by its own factor
      const layers = gsap.utils.toArray<HTMLElement>("[data-h-desktop] [data-h-mouse]");
      const movers = layers.map((l) => ({ x: gsap.quickTo(l, "x", { duration: 0.8, ease: "power3.out" }), y: gsap.quickTo(l, "y", { duration: 0.8, ease: "power3.out" }), k: Number(l.dataset.hMouse) }));
      const el = root.current!;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((m) => { m.x(-nx * 30 * m.k); m.y(-ny * 30 * m.k); });
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-h-mobile] [data-h-frame]").forEach((f) => {
        gsap.fromTo(f, { opacity: 0 }, { opacity: Number(f.dataset.op), duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
      });
    });
    gsap.from("[data-h-content] > *", { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: root.current, start: "top 60%" } });
  }, { scope: root });

  return (
    <div className="max-w-full overflow-x-clip" id="chapter-block-6">
      <section ref={root} data-role="backdrop-cluster" data-recipe="parallax-drift" className="relative isolate h-svh min-h-[700px] overflow-x-clip bg-white text-black lg:min-h-[900px]">
        <div className="absolute inset-0 flex justify-center lg:items-center">
          <div className="relative h-full w-full lg:max-h-(--collage-h)" style={{ maxWidth: 1440, ["--collage-h" as string]: "900px" }}>
            <div className="absolute inset-0 z-0" aria-hidden="true">
              {c.images.map((im, i) => (
                <div key={`d${i}`} data-h-desktop className="pointer-events-none absolute hidden lg:block"
                  style={{ top: im.top, left: im.left, width: im.width, zIndex: im.z, transform: im.center ? "translateX(-50%)" : undefined }}>
                  <div data-h-mouse={im.mouse} className="will-change-transform">
                    <div data-h-frame className="relative w-full overflow-hidden" style={{ aspectRatio: im.ratio, opacity: 0 }}>
                      <div className="absolute inset-0"><img src={im.src} alt={im.alt} className="h-full w-full object-cover" /></div>
                    </div>
                  </div>
                </div>
              ))}
              {Object.entries(mobile).map(([k, m]) => {
                const im = c.images[Number(k)];
                return (
                  <div key={`m${k}`} data-h-mobile className="pointer-events-none absolute lg:hidden" style={{ top: m.top, left: m.left, width: m.width, zIndex: 1 }}>
                    <div data-h-frame data-op={m.op} className="relative w-full overflow-hidden" style={{ aspectRatio: m.ratio, opacity: 0 }}>
                      <div className="absolute inset-0"><img src={im.src} alt={im.alt} className="h-full w-full object-cover" /></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-10 lg:justify-end lg:pb-48 lg:pt-0">
              <div data-h-content className="flex w-full max-w-[438px] flex-col items-center gap-8 text-center will-change-transform">
                <div data-h-mobile className="max-w-[320px] lg:hidden" style={{ width: "78vw" }}>
                  <div data-h-frame data-op="1" className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10", opacity: 0 }}>
                    <div className="absolute inset-0"><img src={c.images[0].src} alt={c.images[0].alt} className="h-full w-full object-cover" /></div>
                  </div>
                </div>
                <p className="trim -mb-4 font-futura text-xs font-medium uppercase leading-none tracking-[0.72px]">{c.eyebrow}</p>
                <h2 className="trim w-full whitespace-pre-line font-futura text-[40px] font-medium uppercase leading-[0.85] tracking-[2.24px] lg:text-[56px]">{c.title}</h2>
                <div className="w-full max-w-[410px] text-sm leading-[160%] tracking-[-0.14px] text-black/80"><p>{c.body}</p></div>
                <div><Button href={c.cta.href} label={c.cta.label} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
