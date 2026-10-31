"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Lottie, type LottieHandle } from "@/components/ui/Lottie";
import { contact, nav } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const menuIcon = useRef<LottieHandle>(null);
  const panel = useRef<HTMLDivElement>(null);
  const bagIcon = useRef<LottieHandle>(null);
  const first = useRef(true);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  // Like the live site: header glyphs hide while scrolling down and return on the way up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      if (y > 120 && y > last && !openRef.current) setHidden(true);
      else if (y < last) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hideSeen = useRef(false);
  useEffect(() => {
    if (!hideSeen.current) { hideSeen.current = true; return; }
    if (hidden) { menuIcon.current?.segment(170, 200); bagIcon.current?.segment(226, 270); }
    else { menuIcon.current?.segment(10, 40); bagIcon.current?.segment(18, 60); }
  }, [hidden]);

  // Header colour follows the section under it
  useEffect(() => {
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-section-dark]")).map((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 40px", end: "bottom 40px", onToggle: () => {
        setOnDark(ScrollTrigger.getAll().some((t) => t.vars.id === "dark" && t.isActive));
      }, id: "dark" })
    );
    setOnDark(true);
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    const p = panel.current; if (!p) return;
    gsap.to(p, { clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)", duration: 0.7, ease: "power3.inOut" });
    gsap.to("[data-menu-item]", { y: open ? 0 : 20, opacity: open ? 1 : 0, duration: 0.6, ease: "power3.out", stagger: open ? 0.05 : 0, delay: open ? 0.25 : 0 });
    document.body.style.overflow = open ? "hidden" : "";
    if (first.current) { first.current = false; return; }
    open ? menuIcon.current?.segment(60, 100) : menuIcon.current?.segment(110, 165);
  }, [open]);

  const light = onDark && !open; // white glyphs
  const tone = light ? "invert" : "";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-[86px] items-center justify-between px-6 md:px-12">
        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className={`size-8 cursor-pointer transition-[filter] duration-300 ${tone}`}>
          <Lottie ref={menuIcon} src="/lottie/icon-navigation.json" reveal={[10, 40]} className="size-full" />
        </button>
        <Link href="/" aria-label="Mercedes-Maybach home" className={`absolute left-1/2 top-4 -translate-x-1/2 transition-[opacity,translate] duration-500 ${hidden && !open ? "-translate-y-4 opacity-0" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Mercedes-Benz logo" width={56} height={54} className={`transition-[filter] duration-300 ${light ? "" : "invert"}`} />
        </Link>
        <Link href="/boutique" aria-label="Shopping bag" onMouseEnter={() => bagIcon.current?.segment(110, 140)} onMouseLeave={() => bagIcon.current?.segment(170, 200)} className={`size-8 transition-[filter] duration-300 ${tone}`}>
          <Lottie ref={bagIcon} src="/lottie/icon-boutique.json" reveal={[18, 60]} className="size-full" />
        </Link>
      </header>

      <div ref={panel} aria-hidden={!open} inert={!open} style={{ clipPath: "inset(0 0 100% 0)" }} className="fixed inset-0 z-40 flex flex-col justify-between bg-white px-6 pb-8 pt-32 text-black md:px-12">
        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-3">
            {nav.map((n) => (
              <li key={n.href} data-menu-item className="opacity-0">
                <Link href={n.href} onClick={() => setOpen(false)} className="text-[32px] leading-[1.15] tracking-[-0.38px] md:text-[38px]">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div data-menu-item className="grid gap-4 text-xs tracking-[-0.12px] opacity-0 md:grid-cols-4">
          <div><Link href={contact.touch.href}>{contact.touch.label}</Link><br /><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
          <div><span>{contact.pressLabel}</span><br /><a href={`mailto:${contact.press}`}>{contact.press}</a></div>
          <div><a href={contact.mapHref} target="_blank" rel="noreferrer">{contact.address}</a></div>
          <div><a href={contact.telHref}>{contact.tel}</a></div>
        </div>
      </div>
    </>
  );
}
