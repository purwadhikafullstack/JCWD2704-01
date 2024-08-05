import FillterInput from "@/components/fillter/fillterInput";
import FillterSelect from "@/components/fillter/fillterSelect";
import FillterDateTime from "@/components/fillter/fillterDateTime";
import { Label } from "@/components/ui/label";
import { axiosInstanceSSR } from "@/lib/axios.server-config";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { CustomerOrders } from "@/models/order.model";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { TStore } from "@/models/store.model";

export default async function OrderFillter() {
  const fillter = [
    { name: "pn", text: "ProductName", filterComponent: <FillterInput name="pn" queryKey="pn" /> },
    {
      name: "before",
      text: "Before",
      filterComponent: <FillterDateTime className="justify-center" name="before" queryKey="before" />,
    },
    { name: "after", text: "After", filterComponent: <FillterDateTime className="justify-center" name="after" queryKey="after" /> },
    { name: "store_id", text: "Store", filterComponent: <FillterStore /> },
    { name: "status", text: "status", filterComponent: <FillterOrderStatus /> },
  ];
  return (
    <section className="flex w-full flex-col flex-wrap items-center justify-evenly gap-4 py-4 md:flex-row md:px-5">
      {fillter.map((e, i) => (
        <Label htmlFor={e.name} className="flex grow items-center gap-x-2" key={i}>
          <span>{e.text}</span>
          {e.filterComponent}
        </Label>
      ))}
    </section>
  );
}

async function FillterStore() {
  const storeList = await axiosInstanceSSR()
    .get("/store/list")
    .then((r) => r.data.data as TStore[])
    .catch((e) => {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.message);
      } else {
        toast.error("something went wrong");
      }
      return [];
    });
  return (
    <FillterSelect name="store_id" queryKey="store_id" defaultValue="all">
      <SelectContent>
        <SelectItem value={"all"}>all</SelectItem>
        {storeList.map((e, i) => (
          <SelectItem key={i} value={e.address_id}>
            {e.address.address}
          </SelectItem>
        ))}
      </SelectContent>
    </FillterSelect>
  );
}

function FillterOrderStatus() {
  const statusEnum: CustomerOrders["status"][] = ["canceled", "process", "sended", "sending", "wait_for_confirmation", "wait_for_payment"];
  return (
    <FillterSelect name="status" queryKey="status" defaultValue="all">
      <SelectContent>
        <SelectItem value={"all"}>all</SelectItem>
        {statusEnum.map((e, i) => (
          <SelectItem key={i} value={e}>
            {e}
          </SelectItem>
        ))}
      </SelectContent>
    </FillterSelect>
  );
}
