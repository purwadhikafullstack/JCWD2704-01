import dynamic from "next/dynamic";
import axiosInstance from "@/lib/axios";
type Props = {
  product_id: string;
};

export default async function CartProductCard({ product_id }: Props) {
  const CartProductCardError = dynamic(() =>
    import("./cartProductCardClient").then((c) => c.CartProductCardError),
  );
  const CartProductCardSuccess = dynamic(() =>
    import("./cartProductCardClient").then((c) => c.CartProductCardSuccess),
  );

  const product = await axiosInstance()
    .get(`/product/${product_id}`)
    .then((res) => res.data.data as any)
    .catch((err) => err);

  if (product instanceof Error)
    // return <CartProductCardError product_id={product_id} />;
    return <CartProductCardSuccess product={{}} />;
  // return <CartProductCardSkeleton />;
}

export function CartProductCardSkeleton() {
  return (
    <div className="card flex h-36 w-full justify-between rounded-md border-2 border-green-600 bg-white px-2 sm:h-48 md:h-56 md:px-4 lg:h-64">
      <div className="flex w-full items-center text-ellipsis">
        <div className="bg-loading flex aspect-square h-[80%] items-center rounded-lg" />
        <div className="flex h-full w-full flex-col p-4 text-xs md:text-base">
          <h1 className="font-bold">Product Name</h1>
          <h2 className="font-bold">Rp.XX.XXX,XX</h2>
          <h2 className="font-light">Rp.XX.XXX,XX</h2>
        </div>
      </div>
    </div>
  );
}
