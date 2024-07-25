import { AccountAddress } from "../_components/address";
import { ButtonBack } from "../_components/ButtonBack";

export default function AddressPage() {
  return (
    <main className="w-full">
      <section className="container relative h-dvh">
        <div className="absolute left-0 top-0 z-20 w-full bg-background">
          <div className="flex h-20 w-full items-center bg-primary px-2 text-primary-foreground xl:rounded-b-md">
            <ButtonBack>Manage Shipping Address</ButtonBack>
          </div>
        </div>

        <AccountAddress />
      </section>
    </main>
  );
}
