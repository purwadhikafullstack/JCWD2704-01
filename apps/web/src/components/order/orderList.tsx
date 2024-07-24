import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { CustomerOrders } from "@/models/order.model";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Pagination from "@/components/pagination";
import LocalTime from "../localTime";

export default async function OrderList({ searchParams }: { searchParams: { [k: string]: string } }) {
  const orders = (await axiosInstanceSSR().get("/order", { params: { ...searchParams } })).data as {
    page: { now: number; end: number };
    data: CustomerOrders[];
  };

  const ordersINV = orders.data;
  const orderList = await Promise.all(
    ordersINV.map(async ({ inv_no }) => (await axiosInstanceSSR().get("/order/" + inv_no)).data.data as CustomerOrders),
  ).catch((e) => console.log(e));
  return (
    <>
      <Table className="bg-white">
        <TableHeader className="bg-green-400 shadow-md hover:shadow-none">
          <TableRow className="*:border-transparant text-xl font-bold *:text-center *:text-black">
            <TableHead>Invoice Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>DueDate</TableHead>
            <TableHead>ExpireDate</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList?.map((e, i) => (
            <TableRow key={i} className="*:border-transparant text-nowrap *:border-2 *:border-b-0 *:text-center">
              <TableCell>{e.inv_no}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell>
                <LocalTime time={new Date(e.created_at)} />
              </TableCell>
              <TableCell>
                <LocalTime time={new Date(e.expire)} />
              </TableCell>
              <TableCell className="relative p-0">
                <Link
                  href={"./orders/" + e.inv_no}
                  className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center font-semibold text-blue-500 transition-all hover:bg-gray-400 hover:text-blue-700"
                >
                  See Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <section className="my-4 flex justify-center">
        <Pagination totalPages={orders?.page.end || 1} />
      </section>
    </>
  );
}
