"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { HlsVideo } from "@/components/ui/HlsVideo";
import { nulla as c } from "@/content/site";

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function Nulla() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState({ playing: false, t: 0, d: 0, muted: false });

  useGSAP(() => {
    gsap.fromTo(root.current, { clipPath: "inset(6% 4% 0% 4%)" }, {
      clipPath: "inset(0% 0% 0% 0%)", ease: "none",
      scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 20%", scrub: true },
    });
    gsap.from("[data-nulla-text] > *", {
      y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: "[data-nulla-text]", start: "top 80%" },
    });
    gsap.fromTo("[data-nulla-media]", { yPercent: -6 }, {
      yPercent: 6, ease: "none",
      scrollTrigger: { trigger: "[data-nulla-player]", start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  const sync = () => {
    const v = video.current; if (!v) return;
    setState({ playing: !v.paused, t: v.currentTime, d: v.duration || 0, muted: v.muted });
  };
  const toggle = () => { const v = video.current; if (!v) return; v.paused ? v.play() : v.pause(); sync(); };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = video.current; if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration; sync();
  };
  const pct = state.d ? (state.t / state.d) * 100 : 0;

  return (
    <div className="max-w-full overflow-x-clip" id="chapter-block-4">
      <section ref={root} data-role="scroll-story" data-recipe="mask-reveal" data-section-dark className="relative bg-black pt-[80px] text-white will-change-[clip-path] md:pt-[120px]">
        <div className="container relative z-10 flex w-full flex-col items-center">
          <div data-nulla-text className="flex w-full max-w-[732px] flex-col items-center gap-[24px] text-center md:gap-[32px]">
            <h2 className="w-full font-futura text-[56px] font-medium uppercase leading-[85%] tracking-[2px] md:text-[120px]">
              {c.lines.map((l) => <span key={l} className="block whitespace-nowrap">{l}</span>)}
            </h2>
            <p className="w-full text-[14px] leading-8 text-white/80">{c.body}</p>
          </div>
        </div>
        <div data-nulla-player className="group relative z-20 aspect-[0.75] w-full overflow-hidden md:aspect-video">
          <div data-nulla-media className="absolute inset-x-0 -top-[10%] -bottom-[10%] overflow-hidden">
            <div className="absolute inset-0 isolate overflow-hidden text-white">
              <HlsVideo src={c.video} poster={c.poster} autoPlay={false} videoRef={video} onTime={sync} className="!pointer-events-auto" />
              <div className={`pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-300 ${state.playing ? "opacity-0" : "opacity-35"}`} />
            </div>
          </div>
          <button type="button" aria-label={state.playing ? "Pause video" : "Play video"} onClick={toggle}
            className={`absolute left-1/2 top-1/2 z-20 flex h-20 w-[120px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] bg-white text-black transition-opacity duration-300 ${state.playing ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <div className={`absolute inset-x-0 bottom-0 z-20 transition-all duration-300 ${state.playing ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/75 to-transparent" />
            <div className="relative flex items-center gap-3 px-4 pb-3 md:px-6">
              <button type="button" aria-label={state.playing ? "Pause video" : "Play video"} onClick={toggle} className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">{state.playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}</svg>
              </button>
              <div className="w-25 shrink-0 text-xs tabular-nums md:text-sm"><span>{fmt(state.t)}</span><span className="px-1 text-white/70">/</span><span className="text-white/70">{fmt(state.d)}</span></div>
              <div role="slider" aria-label="Seek video timeline" aria-valuemin={0} aria-valuemax={Math.round(state.d)} aria-valuenow={Math.round(state.t)} tabIndex={0} onClick={seek} className="relative h-5 flex-1 cursor-pointer">
                <div className="absolute inset-y-1/2 h-1 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/20"><div className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${pct}%` }} /></div>
                <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" style={{ left: `${pct}%` }} />
              </div>
              <button type="button" aria-label={state.muted ? "Unmute video" : "Mute video"} onClick={() => { const v = video.current; if (v) { v.muted = !v.muted; sync(); } }} className="flex h-9 w-9 items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" opacity={state.muted ? 0.4 : 1} /></svg>
              </button>
              <button type="button" aria-label="Enter fullscreen" onClick={() => video.current?.parentElement?.requestFullscreen?.()} className="flex h-9 w-9 items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
