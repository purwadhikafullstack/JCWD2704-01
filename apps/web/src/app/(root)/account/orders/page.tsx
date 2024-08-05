import FillterInput from "@/components/fillter/fillterInput";
import FillterDateTime from "@/components/fillter/fillterDateTime";
import { Suspense } from "react";
import OrderList from "@/components/order/orderList";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleAlert } from "lucide-react";
import { ButtonBack } from "../_components/ButtonBack";
import { Header } from "@/components/header";
import { SearchParams } from "@/models/search.params";
import { Footer } from "@/components/footer";

type Props = {
  searchParams: SearchParams;
};

export default function Page({ searchParams }: Props) {
  return (
    <TooltipProvider>
      <div className="container flex h-16 w-full items-center justify-between bg-primary px-4 xl:rounded-b-md">
        <ButtonBack isCenter={false} className="w-fit gap-1.5 text-primary-foreground md:gap-4">
          Order List
        </ButtonBack>
      </div>
      <main className="container flex min-h-screen flex-col bg-secondary">
        <div className="px-4 py-6 md:px-0">
          <section className="container flex flex-col gap-4 md:flex-row">
            <FillterInput name="product" queryKey="pn" placeholder="Search by Product Name" className="w-full" />

            <div className="flex flex-col gap-2">
              <div className="relative flex gap-2">
                <FillterDateTime queryKey="before" label="Start From" />
                <FillterDateTime name="after" queryKey="after" label="End To" />
                <Tooltip>
                  <TooltipTrigger className="top-0 self-start md:right-0">
                    <CircleAlert className="size-4 shrink-0 stroke-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm text-muted-foreground">Check from and to the date of your order.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </section>
          {/* Table */}
          <section className="p-x-2 my-4 flex size-full flex-col justify-between">
            <Suspense fallback={<h1>Loading...</h1>}>
              <OrderList searchParams={searchParams as { [k: string]: string }} />
            </Suspense>
          </section>
        </div>
      </main>
      <Footer />
    </TooltipProvider>
  );
}
