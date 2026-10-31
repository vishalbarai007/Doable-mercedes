"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { news as c } from "@/content/site";

function Card({ n }: { n: (typeof c.items)[number] }) {
  return (
    <a href={n.href} draggable={false} data-news-card className="group flex flex-col gap-6">
      <div className="relative aspect-[300/400] w-full overflow-hidden rounded-[2px] bg-[#f0f0f0]">
        <img src={n.img} alt={n.alt} draggable={false} className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-start gap-2 font-futura text-sm font-[450] uppercase tracking-[0.84px]">
          <span className="font-sans text-sm normal-case tracking-normal text-black/50">{n.date}</span><span>{n.tag}</span>
        </div>
        <h3 className="font-swiss text-[20px] leading-[1.4] tracking-[-0.2px]">{n.title}</h3>
        <p className="line-clamp-2 max-h-[54px] font-swiss text-[14px] leading-[1.6] tracking-[-0.14px] text-black/50">{n.text}</p>
      </div>
    </a>
  );
}

export function News() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from("[data-news-card]", { y: 50, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: root.current, start: "top 70%" } });
  }, { scope: root });

  return (
    <div className="max-w-full overflow-x-clip" id="chapter-block-10">
      <section ref={root} data-role="image-cards" data-recipe="stagger-reveal" className="w-full">
        <div>
          <div className="container mx-auto pb-10"><h2 className="text-[20px]">{c.title}</h2></div>
          {/* phones: swipeable row (the live site uses a GSAP slider) */}
          <div className="md:hidden">
            <div className="container">
              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
                {c.items.map((n) => <div key={n.href} className="w-[calc(100%/1.15)] flex-none snap-start"><Card n={n} /></div>)}
              </div>
            </div>
          </div>
          <div className="container mx-auto hidden gap-6 md:grid md:grid-cols-3">{c.items.map((n) => <Card key={n.href} n={n} />)}</div>
        </div>
        <div className="container mt-[60px] flex justify-center"><Button href={c.cta.href} label={c.cta.label} /></div>
      </section>
    </div>
  );
}
