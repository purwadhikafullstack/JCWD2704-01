import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { CartProduct } from "./cartProduct";

export async function CartList({ search, user_id }: { search: string; store?: "all"; user_id: string }) {
  const fetchCart = (
    await axiosInstanceSSR().get("/cart", {
      data: { search, user_id },
    })
  ).data.data as Cart[];
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
