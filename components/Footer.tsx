"use client";
import Link from "next/link";
import { contact, footer, nav } from "@/content/site";

const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
const icons: Record<string, React.ReactNode> = {
  Facebook: <svg {...iconProps}><path d="M9.1 23.7v-8H6.6v-3.7h2.5V10.500c0-4.100 1.800-6 5.900-6l2.600.3v3.300h-1.400c-2 0-2.400.8-2.400 2.100v1.300h3.900l-.7 3.700h-3.200v8A12 12 0 1 0 0 12c0 5.600 3.900 10.400 9.100 11.700z" /></svg>,
  Instagram: <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.500" cy="6.500" r="1" fill="currentColor" stroke="none" /></svg>,
  YouTube: <svg {...iconProps}><path d="M23 7.200a3 3 0 0 0-2.100-2.100C19 4.600 12 4.600 12 4.600s-7 0-8.900.5A3 3 0 0 0 1 7.200C.500 9.100.500 12 .500 12s0 2.900.5 4.800a3 3 0 0 0 2.100 2.100c1.900.5 8.900.5 8.900.5s7 0 8.900-.5a3 3 0 0 0 2.100-2.100c.5-1.900.5-4.800.5-4.800s0-2.900-.5-4.800zM9.700 15.500v-7l6 3.500z" /></svg>,
  TikTok: <svg {...iconProps}><path d="M16.600 0h-3.400v15.600a2.900 2.900 0 1 1-2.900-2.900c.3 0 .6 0 .9.100V9.300a6.400 6.400 0 1 0 5.500 6.300V8a8 8 0 0 0 4.700 1.500V6.100A4.700 4.700 0 0 1 16.600 0z" /></svg>,
  LinkedIn: <svg {...iconProps}><path d="M20.400 20.500h-3.600v-5.600c0-1.300 0-3-1.800-3s-2.100 1.400-2.100 2.900v5.700H9.400V9h3.400v1.600c.5-.9 1.600-1.800 3.400-1.800 3.600 0 4.300 2.400 4.300 5.500v6.200zM5.300 7.400a2.100 2.100 0 1 1 0-4.100 2.100 2.100 0 0 1 0 4.100zm1.800 13.100H3.600V9h3.600v11.500zM22.200 0H1.800C.8 0 0 .8 0 1.700v20.600c0 .9.800 1.700 1.800 1.700h20.400c1 0 1.800-.8 1.800-1.700V1.700C24 .8 23.200 0 22.200 0z" /></svg>,
};

const link = "text-sm leading-[1.6] tracking-[-0.14px] text-left lg:text-right";

function Underlined({ children }: { children: React.ReactNode }) {
  return <span className="underline-link relative inline-block w-fit max-w-full pb-[3px]">{children}</span>;
}

export function Footer() {
  const run = (a: "cookies" | "newsletter") => {
    if (a === "cookies") window.dispatchEvent(new Event("open-cookies"));
    else document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
  };
  const item = (x: { label: string; href?: string; action?: "cookies" | "newsletter" }) => (
    <Underlined key={x.label}>
      {x.href
        ? x.href.startsWith("http") ? <a className={link} href={x.href} target="_blank" rel="noreferrer">{x.label}</a> : <Link className={link} href={x.href}>{x.label}</Link>
        : <button type="button" className={`${link} cursor-pointer`} onClick={() => run(x.action!)}>{x.label}</button>}
    </Underlined>
  );

  return (
    <footer data-footer-theme="light" className="relative z-30 bg-white text-black">
      <div className="container flex flex-col pt-10 lg:flex-row lg:items-start lg:gap-16 lg:pb-10 lg:pt-20 xl:gap-[140px]">
        <div className="hidden shrink-0 lg:block lg:w-[180px] xl:w-[361px] xl:pr-10">
          <Link href="/" aria-label="Mercedes-Benz logo" className="inline-block size-[160px] lg:size-[180px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className="size-full p-[24px] invert" />
          </Link>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-10 lg:gap-0 lg:pb-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8 xl:gap-16">
            <nav aria-label="Footer navigation" className="min-w-0 flex-1">
              <ul className="flex flex-col gap-3">
                {nav.map((n) => (
                  <li key={n.href}><Underlined><Link href={n.href} className="text-[32px] leading-[1.15] tracking-[-0.32px] xl:text-[38px] xl:tracking-[-0.38px]">{n.label}</Link></Underlined></li>
                ))}
              </ul>
            </nav>
            <div className="flex w-full flex-col gap-10 lg:w-auto lg:max-w-[16rem] lg:shrink-0 lg:items-end lg:text-right">
              <div className="flex flex-col gap-0.5 lg:items-end">{footer.legal.map(item)}</div>
              <div className="flex flex-col gap-0.5 lg:items-end">{footer.more.map(item)}</div>
            </div>
          </div>
          <ul className="flex items-center gap-[26px] lg:mt-16">
            {footer.socials.map((s) => <li key={s}><a href="#" aria-label={s} className="block transition-opacity hover:opacity-60">{icons[s]}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="container grid gap-6 pb-10 pt-10 text-xs leading-[1.6] tracking-[-0.12px] md:grid-cols-5 lg:pt-16">
        <div className="flex flex-col"><Link href={contact.touch.href}>{contact.touch.label}</Link><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
        <div className="flex flex-col"><span>{contact.pressLabel}</span><a href={`mailto:${contact.press}`}>{contact.press}</a></div>
        <div className="flex flex-col"><a href={contact.mapHref} target="_blank" rel="noreferrer">{contact.address}</a><a href={contact.telHref}>{contact.tel}</a></div>
        <p>{contact.copyright}</p>
        <a href={contact.agency.href} target="_blank" rel="noreferrer">{contact.agency.label}</a>
      </div>
    </footer>
  );
}
