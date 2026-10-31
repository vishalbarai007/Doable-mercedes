"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { AnimationItem } from "lottie-web";

export type LottieHandle = { segment: (from: number, to: number) => void };

// The Spyker icon files are marker-based (frame 0 is blank): play a named [from, to] frame range.
export const Lottie = forwardRef<LottieHandle, { src: string; reveal?: [number, number]; className?: string }>(
  function Lottie({ src, reveal, className = "" }, handle) {
    const box = useRef<HTMLDivElement>(null);
    const anim = useRef<AnimationItem | null>(null);
    const pending = useRef<[number, number] | null>(reveal ?? null);

    useEffect(() => {
      let dead = false;
      import("lottie-web").then(({ default: lottie }) => {
        if (dead || !box.current) return;
        const a = lottie.loadAnimation({ container: box.current, renderer: "svg", loop: false, autoplay: false, path: src });
        anim.current = a;
        a.addEventListener("DOMLoaded", () => { if (pending.current) a.playSegments(pending.current, true); });
      });
      return () => { dead = true; anim.current?.destroy(); anim.current = null; };
    }, [src]);

    useImperativeHandle(handle, () => ({
      segment: (from, to) => {
        if (anim.current) anim.current.playSegments([from, to], true);
        else pending.current = [from, to];
      },
    }));

    return <div ref={box} aria-hidden="true" className={className} />;
  }
);
