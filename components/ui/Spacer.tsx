import type { CSSProperties } from "react";

export function Spacer({ mobile, desktop }: { mobile: number; desktop: number }) {
  const style = { "--spacer-mobile": `${mobile}px`, "--spacer-desktop": `${desktop}px` } as CSSProperties;
  return <div style={style} className="h-(--spacer-mobile) md:h-(--spacer-desktop)" aria-hidden="true" />;
}
