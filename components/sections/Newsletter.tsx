"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { newsletter as c } from "@/content/site";

const field = "newsletter-signup-input min-w-0 flex-1 appearance-none border-0 bg-transparent py-1 font-futura text-sm leading-4 tracking-[0.28px] text-white uppercase shadow-none outline-none placeholder:uppercase placeholder:tracking-[0.28px] placeholder:text-white/50 focus:outline-none";

export function Newsletter() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(() => {
    gsap.fromTo("[data-nl-img]", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from("[data-nl-copy] > *", { y: 30, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: root.current, start: "top 60%" } });
  }, { scope: root });

  return (
    <div className="max-w-full overflow-x-clip" id="chapter-block-12">
      <section ref={root} id="newsletter" data-role="backdrop-overlay" data-recipe="image-parallax" data-section-dark
        className="relative isolate flex min-h-screen items-center overflow-hidden py-20 text-white md:min-h-[120vh] md:py-[140px]">
        <div className="absolute inset-0 z-0">
          <div data-nl-img className="absolute -inset-y-[6%] inset-x-0"><img src={c.image} alt="Mercedes-Maybach interior and exterior luxury" className="h-full w-full object-cover object-center" /></div>
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(-60.7deg, rgba(0,0,0,0.2) 8%, rgba(0,0,0,0) 51%), linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2))" }} />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] justify-start px-[16px] md:px-[77px]">
          <div className="w-full max-w-[400px]">
            <div data-nl-copy className="flex flex-col gap-10 md:gap-[60px]">
              <h2 className="font-swiss text-[38px] leading-[110%] tracking-[-0.38px]">{c.title}</h2>
              <p className="text-sm leading-[160%] tracking-[-0.14px]">{c.body}</p>
              <form className="group/form w-full" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                {/* name fields open once the email field is focused */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-focus-within/form:grid-rows-[1fr]">
                  <div className="overflow-hidden"><div className="mb-4 flex flex-col gap-4">
                    <div className="underline-field flex items-center justify-between gap-4 pb-2"><input className={field} placeholder="Firstname" aria-label="Firstname" name="firstName" autoComplete="given-name" required /></div>
                    <div className="underline-field flex items-center justify-between gap-4 pb-2"><input className={field} placeholder="Lastname" aria-label="Lastname" name="lastName" autoComplete="family-name" required /></div>
                  </div></div>
                </div>
                <div className="underline-field flex items-center justify-between gap-4 pb-2">
                  <input id="newsletter-signup-email" type="email" className={field} placeholder="Your Email" aria-label="Your Email" name="email" autoComplete="email" required />
                  <button type="submit" className="shrink-0 text-xs leading-4 tracking-[0.24px] text-white transition-opacity hover:opacity-80">{sent ? "Thank you" : "Subscribe"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
