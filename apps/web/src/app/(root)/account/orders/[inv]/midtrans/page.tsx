import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

type Props = {
  params: { inv: string };
};
export default async function Page({ params }: Props) {
  const paymentLink = await axiosInstanceSSR()
    .get(`/order/${params.inv}/v1`)
    .then((r) => r.data.data)
    .catch((e) => {
      if (e instanceof AxiosError) throw new Error(JSON.stringify(e.response?.data));
    });
  console.log(paymentLink);
  redirect(paymentLink.payment_url);
}
