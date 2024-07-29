"use client";
import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { TRajaOngkirCostResponse } from "@/models/rajaOngkirCost.model";
import { useCheckout } from "@/stores/checkout";
import { toIDR } from "@/utils/toIDR";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { createOrderSchema } from "@/schemas/order.scema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { TVoucher } from "../_model/props";
import LocalTime from "@/components/localTime";

export default function CheckoutModal() {
  const { list, listTotal, weight, origin, destination, removeAllList } = useCheckout((s) => {
    const { list, origin, destination } = s;
    const listTotal = s.listTotal(list);
    const weight = s.weight(list);
    const removeAllList = s.removeAllList;
    return { list, listTotal, weight, origin, destination, removeAllList };
  });
  const [courier, setCourier] = useState("jne");
  const [voucherList, setVoucherList] = useState<TVoucher[] | null>(null);
  const [services, setServices] = useState<TRajaOngkirCostResponse["rajaongkir"]["results"] | null>(null);
  const [selectedService, setSelectedService] = useState<{ name: string; cost: number } | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<{ promotion_id: string; result?: { total: number; discount: number } } | null>(
    null,
  );
  const fetchServices = async () => {
    setServices(null);
    if (!destination) return;
    const services = (
      await axiosInstanceCSR().get("/order/shipcost", {
        params: {
          weight,
          origin,
          destination,
          courier,
        },
      })
    ).data.data as TRajaOngkirCostResponse;
    setServices(services.rajaongkir.results);
  };

  const fetchVouchers = async () => {
    setVoucherList(null);
    try {
      const vouchers = (await axiosInstanceCSR().get("/promotion/user")).data.data as TVoucher[];
      setVoucherList(vouchers);
    } catch (error) {
      setVoucherList([]);
    }
  };
  const fetchApplyCoucher = async (promotion_id: string) => {
    if (!selectedService?.cost) return;
    const result = await axiosInstanceCSR()
      .get("/promotion/v0/" + promotion_id, {
        params: { total: listTotal, shipCost: selectedService.cost },
      })
      .then((r) => r.data.data as { total: number; discount: number })
      .catch((e) => {
        alert("voucher failed to apply");
        if (e instanceof AxiosError) console.log(e.response?.data);
      });
    setSelectedVoucher(result ? { promotion_id, result } : null);
  };
  const router = useRouter();

  const createOrder = async () => {
    if (!selectedService) return;
    const data: z.infer<typeof createOrderSchema> = {
      store_id: origin,
      destination_id: destination,
      courier: courier as "jne" | "pos" | "tiki",
      courier_service: selectedService.name,
      req_products: list.map((e) => ({
        id: e.store_stock_id,
        quantity: e.quantity,
      })),
    };
    try {
      removeAllList();
      const order = await axiosInstanceCSR().post("/order", createOrderSchema.parse(data));
      alert("transaction success");
      router.push("/orders/" + order.data.data.inv_no);
    } catch (error) {
      alert("checkout failed");
    }
  };

  useEffect(() => {
    setSelectedService(null);
  }, [courier]);

  return (
    <div className="flex w-full flex-col items-center">
      <Table className="my-4">
        <TableBody>
          <TableRow>
            <TableCell>Weight</TableCell>
            <TableCell>{weight}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Courier</TableCell>
            <TableCell>
              <select defaultValue={courier} onChange={(e) => setCourier(e.target.value)} className="w-full">
                {["jne", "tiki", "pos"].map((e, i) => (
                  <option key={i} value={e}>
                    {e.toUpperCase()}
                  </option>
                ))}
              </select>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Courier Service</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger asChild onClick={fetchServices}>
                  <Button>Select Courier Service</Button>
                </PopoverTrigger>
                <PopoverContent>
                  {services == null && <h1>Loading...</h1>}
                  <ul className="max h-[25vh] overflow-auto">
                    {services?.[0].costs.map((e, i) => (
                      <li key={i} className="my-2">
                        <Button
                          disabled={selectedService?.name == e.service}
                          className="flex h-max w-full flex-col gap-2 text-center"
                          onClick={() => setSelectedService({ name: e.service, cost: e.cost[0].value })}
                        >
                          <h1>{e.service}</h1>
                          <h1>{e.description}</h1>
                          <h1>{e.cost[0].value}</h1>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Select Voucher</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger asChild onClick={fetchVouchers}>
                  <Button disabled={!Boolean(selectedService)}>Select Voucher</Button>
                </PopoverTrigger>
                <PopoverContent>
                  {voucherList == null ? (
                    <h1>Loading...</h1>
                  ) : (
                    <ul className="max h-[25vh] overflow-auto">
                      {voucherList.length < 1 ? (
                        <h1>You dont have any vouchers</h1>
                      ) : (
                        voucherList?.map((e, i) => (
                          <li key={i} className="my-2">
                            <Button
                              disabled={selectedVoucher?.promotion_id == e.id}
                              className="flex h-max w-full flex-col gap-2 text-center"
                              onClick={() => fetchApplyCoucher(e.id)}
                            >
                              <h1>{e.title}</h1>
                              <h1>{e.min_transaction}</h1>
                              <h1>
                                <LocalTime time={e.expiry_date} />
                              </h1>
                            </Button>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Shipping Cost</TableCell>
            <TableCell>{toIDR(selectedService?.cost)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Products Price</TableCell>
            <TableCell>{toIDR(listTotal)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Discount</TableCell>
            <TableCell>{toIDR(0)}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Price</TableCell>
            <TableCell>{toIDR((selectedService?.cost || 0) + listTotal)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Button disabled={!Boolean(selectedService)} onClick={createOrder}>
        Checkout
      </Button>
    </div>
  );
}
