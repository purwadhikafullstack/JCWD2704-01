import { Section } from "@/components/Section";
import { Revalidate } from "next/dist/server/lib/revalidate";
import { Category } from "./_components/categories";
import { Promotion } from "./_components/promotion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { dummyPromotion } from "@/constants/promotion";
import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { TCategory } from "@/models/category.model";

export const revalidate: Revalidate = 900;

export default async function Home() {
  const response = await axiosInstanceSSR().get("/categories/category-list");
  const categories = response.data.categories as TCategory[];

  return (
    <>
      <Header />
      <main className="size-full min-h-screen">
        <section className="container">
          <Promotion datas={dummyPromotion} />
        </section>

        <div className="size-full px-4">
          <Section className="h-screen w-full">
            <Category categories={categories} />
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
