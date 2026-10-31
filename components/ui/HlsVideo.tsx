"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string; poster: string; autoPlay?: boolean; controls?: boolean; className?: string;
  videoRef?: React.RefObject<HTMLVideoElement | null>; onTime?: () => void;
};

// Attaches hls.js (or native HLS on Safari) once the video nears the viewport; poster image fades out on play.
export function HlsVideo({ src, poster, autoPlay = true, className = "", videoRef, onTime }: Props) {
  const own = useRef<HTMLVideoElement>(null);
  const ref = videoRef ?? own;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let hls: import("hls.js").default | undefined;
    let started = false;
    const start = async () => {
      if (started || !src) return;
      started = true;
      if (!src.includes(".m3u8") || el.canPlayType("application/vnd.apple.mpegurl")) el.src = src;
      else {
        const Hls = (await import("hls.js")).default;
        if (!Hls.isSupported()) return;
        hls = new Hls({ startLevel: 0, capLevelToPlayerSize: true });
        hls.loadSource(src);
        hls.attachMedia(el);
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          start().then(() => { if (autoPlay) el.play().catch(() => {}); });
        } else if (autoPlay) el.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => { io.disconnect(); hls?.destroy(); };
  }, [src, autoPlay, ref]);

  return (
    <div className={`pointer-events-none absolute inset-0 isolate flex items-center justify-center overflow-hidden text-white ${className}`}>
      <video
        ref={ref} poster={poster} muted={autoPlay} loop={autoPlay} playsInline preload="metadata"
        onPlaying={() => setPlaying(true)} onTimeUpdate={onTime}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`} />
    </div>
  );
}
