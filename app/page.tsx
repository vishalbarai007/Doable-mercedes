import { Hero } from "@/components/sections/Hero";
import { PurePassion } from "@/components/sections/PurePassion";
import { Nulla } from "@/components/sections/Nulla";
import { Heritage } from "@/components/sections/Heritage";
import { Boutique } from "@/components/sections/Boutique";
import { News } from "@/components/sections/News";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/Footer";
import { Spacer } from "@/components/ui/Spacer";

const Block = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div className="max-w-full overflow-x-clip" id={id}>{children}</div>
);

export default function Home() {
  return (
    <>
      <main id="main-content">
        <article data-header-logo-size="large">
          <Hero />
          <Block id="chapter-block-0"><Spacer mobile={40} desktop={80} /></Block>
          <PurePassion />
          <Block id="chapter-block-3"><Spacer mobile={140} desktop={220} /></Block>
          <Nulla />
          <Block id="chapter-block-5"><Spacer mobile={0} desktop={160} /></Block>
          <Heritage />
          <Block id="chapter-block-7"><Spacer mobile={80} desktop={160} /></Block>
          <Boutique />
          <Block id="chapter-block-9"><Spacer mobile={80} desktop={160} /></Block>
          <News />
          <Block id="chapter-block-11"><Spacer mobile={80} desktop={160} /></Block>
          <Newsletter />
          <Block id="chapter-block-13"><Spacer mobile={80} desktop={160} /></Block>
        </article>
      </main>
      <Footer />
    </>
  );
}
