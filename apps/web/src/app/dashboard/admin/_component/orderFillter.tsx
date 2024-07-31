import FillterInput from "@/components/fillter/fillterInput";
import FillterSelect from "@/components/fillter/fillterSelect";
import FillterDateTime from "@/components/fillter/fillterDateTime";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { axiosInstanceSSR } from "@/lib/axios.server-config";
import React from "react";

export default async function OrderFillter() {
  const fillter: { name: string; text: string; filterComponent: React.JSX.Element }[] = [
    { name: "inv", text: "Invoice", filterComponent: <FillterInput name="inv" queryKey="inv" /> },
    { name: "pn", text: "ProductName", filterComponent: <FillterInput name="pn" queryKey="pn" /> },
    { name: "before", text: "Before", filterComponent: <FillterDateTime className="justify-center" name="before" queryKey="before" /> },
    { name: "after", text: "After", filterComponent: <FillterDateTime className="justify-center" name="after" queryKey="after" /> },
    { name: "store_id", text: "Store", filterComponent: <FillterStore /> },
  ];
  return (
    <section>
      <Table className="w-max-full">
        <TableHeader></TableHeader>
        <TableBody>
          {fillter.map((e, i) => (
            <TableRow key={i} className="gap-y-2 *:*:min-h-10 *:p-2 *:text-center">
              <TableCell>
                <Label htmlFor={e.name}>{e.text}</Label>
              </TableCell>
              <TableCell>{e.filterComponent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

async function FillterStore() {
  const storeList = await axiosInstanceSSR()
    .get("/store/list")
    .then((r) => r.data.data as any[])
    .catch((e) => {
      // throw e;
      return [];
    });
  return (
    <FillterSelect addCustomStyle="text-center" name="store_id" queryKey="store_id">
      <option value={""}>all</option>
      {storeList.map((e, i) => (
        <option key={i} value={e.address_id}>
          {e.address_id}
        </option>
      ))}
    </FillterSelect>
  );
}
