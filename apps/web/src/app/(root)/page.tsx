import { Section } from "@/components/Section";
import { Revalidate } from "next/dist/server/lib/revalidate";
import { Category } from "./_components/categories";
import { Promotion } from "./_components/promotion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { dummyPromotion } from "@/constants/promotion";

export const revalidate: Revalidate = 900;

export default function Home() {
  return (
    <>
      <Header />
      <main className="size-full min-h-screen">
        <section className="container">
          <Promotion datas={dummyPromotion} />
        </section>

        <div className="size-full px-4">
          <Section className="h-screen w-full">
            <Category />
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
