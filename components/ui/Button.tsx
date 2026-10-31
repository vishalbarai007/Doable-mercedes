import Link from "next/link";

type Props = { href: string; label: string; tone?: "light" | "dark"; className?: string };

// light = white button (on dark bg), dark = black button (on white bg)
export function Button({ href, label, tone = "dark", className = "" }: Props) {
  const color = tone === "light" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90";
  return (
    <Link
      href={href}
      aria-label={label}
      data-slot="button"
      className={`trim relative inline-flex h-9 min-w-[220px] shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-[2px] px-4 font-futura text-sm font-medium uppercase tracking-[0.84px] transition-colors md:px-8 max-md:w-full max-md:min-w-0 ${color} ${className}`}
    >
      <span>{label}</span>
    </Link>
  );
}
