import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { CustomerOrders } from "@/models/order.model";
import { toIDR } from "@/utils/toIDR";
import PaymentBtn from "../../app/[userId]/order/_components/paymentBtn";
import CancelBtn from "../../app/[userId]/order/_components/cancelBtn";

export default async function OrderCard({ inv }: { inv: PageProps["params"]["inv"] }) {
  const order = await axiosInstanceSSR()
    .get("/order/" + inv)
    .then((r) => r.data.data as CustomerOrders)
    .catch((error) => {
      throw new Error("Failed to fetch data");
    });
  return (
    <>
      <CardContent>
        <CardHeader className="p-0">Store ID: {order.store_id}</CardHeader>
      </CardContent>

      <CardContent>
        <CardDescription>Status : {order.status}</CardDescription>
        <CardDescription>Expire: {new Date(order.expire).toDateString()}</CardDescription>
        <CardDescription>Created at: {new Date(order.created_at).toDateString()}</CardDescription>
        <CardDescription>Updated at: {new Date(order.updated_at).toDateString()}</CardDescription>
        <CardDescription>customer ID: {order.user_id}</CardDescription>
      </CardContent>

      <CardContent className="p-0">
        <ul className="flex w-full overflow-auto">
          {order.order_details.map((e, i) => (
            <li key={i} className="mx-5 w-full text-nowrap py-4">
              <Card className="w-full">
                <CardHeader>{e.store_stock.product.name}</CardHeader>
                <CardContent className="*:*:px-2 *:*:py-0">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <CardDescription>Price</CardDescription>
                        </TableCell>
                        <TableCell>
                          <CardDescription>{toIDR(e.unit_price)}</CardDescription>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <CardDescription>Discount</CardDescription>
                        </TableCell>
                        <TableCell>
                          <CardDescription>{toIDR(e.discount)}</CardDescription>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <CardDescription>Quantity</CardDescription>
                        </TableCell>
                        <TableCell>
                          <CardDescription>{e.quantity}</CardDescription>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <CardDescription>Total</CardDescription>
                        </TableCell>
                        <TableCell>
                          <CardDescription>{toIDR(e.quantity * (e.unit_price - e.discount))}</CardDescription>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <CardDescription>Shipping Cost</CardDescription>
              </TableCell>
              <TableCell>
                <CardDescription>{toIDR(order.shipping_cost)}</CardDescription>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <CardDescription>promotion discount</CardDescription>
              </TableCell>
              <TableCell>
                <CardDescription>{toIDR(order.discount)}</CardDescription>
              </TableCell>
            </TableRow>
            <TableRow className="*:*:font-bold">
              <TableCell>
                <CardDescription>Total</CardDescription>
              </TableCell>
              <TableCell>
                <CardDescription>
                  {toIDR(
                    order.shipping_cost +
                      order.order_details.reduce((p, s) => p + s.quantity * (s.unit_price - s.discount), 0) -
                      order.discount,
                  )}
                </CardDescription>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <CardContent className="flex justify-between">
        {order.status == "wait_for_payment" && (
          <>
            <CancelBtn />
            <PaymentBtn />
          </>
        )}
      </CardContent>
    </>
  );
}
