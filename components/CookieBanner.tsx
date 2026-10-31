"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cookies } from "@/content/site";

const btn = "trim cursor-pointer font-futura uppercase";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("cookie-choice"); } catch {}
    if (!saved) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("open-cookies", reopen);
    return () => window.removeEventListener("open-cookies", reopen);
  }, []);
  const choose = (v: string) => { try { localStorage.setItem("cookie-choice", v); } catch {} setOpen(false); };
  if (!open) return null;
  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed bottom-4 left-4 z-[60] w-[calc(100%-2rem)] max-w-[300px] rounded-[2px] border border-[#B2B2B2] bg-white p-5 text-black">
      <p className="text-[14px] leading-[1.5]">{cookies.text}</p>
      <Link href={cookies.policy.href} className="mt-3 inline-block text-[12px] text-black/55 underline">{cookies.policy.label}</Link>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("decline")} className={`${btn} h-9 flex-1 border border-black text-sm font-medium tracking-[0.84px]`}>Decline</button>
        <button type="button" onClick={() => choose("accept")} className={`${btn} h-9 flex-1 bg-black text-sm font-medium tracking-[0.84px] text-white`}>Accept</button>
      </div>
      <button type="button" onClick={() => choose("customize")} className={`${btn} mt-3 text-xs tracking-[1.2px]`}>Customize</button>
    </div>
  );
}
