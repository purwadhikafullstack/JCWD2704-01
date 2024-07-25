import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { CartProduct } from "./cartProduct";
import { TCart } from "@/models/cart.model";

export async function CartList({ search }: { search: string; store?: "all" }) {
  const fetchCart = await axiosInstanceSSR()
    .get("/cart", {
      data: { search },
    })
    .then((e) => e.data.data as TCart[])
    .catch((e) => {
      throw new Error(JSON.stringify(e));
    });
  return (
    <>
      {fetchCart?.map((e, i) => (
        <li key={i}>
          <CartProduct cartProduct={e} />
        </li>
      ))}
    </>
  );
}
