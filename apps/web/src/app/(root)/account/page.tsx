import { AccountHeader } from "./_components/header";

export default function AccountPage() {
  return (
    <main className="h-screen w-full pb-20">
      <section className="bg-primary text-primary-foreground">
        <div className="container space-y-6 p-4">
          <h3 className="text-lg font-semibold sm:text-xl">Account</h3>

          <AccountHeader />
        </div>
      </section>
    </main>
  );
}
