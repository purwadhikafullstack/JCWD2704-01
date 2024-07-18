import { Maps } from "@/components/Maps";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <p className="mx-auto w-fit py-6 text-9xl font-bold uppercase">Web Browser</p>
      <section className="container grid h-screen w-full place-content-center">
        <Maps />
      </section>
    </main>
  );
}
