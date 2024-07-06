import { StoreAdminSearchParams } from "@/models/search.params";
import { fetchStoreAdminData } from "@/utils/fetch/admin.fetch";
import { DataTable } from "../../../../components/data-table";
import { storeAdminColumns } from "./storeAdmin.columns";
import { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";

type Props = {
  searchParams: StoreAdminSearchParams;
};
export default async function AdminDashboard({ searchParams }: Props) {
  const storeAdmins = await fetchStoreAdminData(searchParams);
  return (
    <Tabs defaultValue="store-admin">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="store-admin">Store Admins</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>
      <TabsContent value="store-admin">
        <div className="p-2">
          <h2 className="mb-5 text-3xl font-extrabold">Store Admin Data</h2>
          <Suspense fallback={<p>Loading...</p>}>
            <DataTable columns={storeAdminColumns} data={storeAdmins.users} />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="customers">
        <div className="p-2">
          <h2 className="mb-5 text-3xl font-extrabold">Customers Data</h2>
        </div>
      </TabsContent>
    </Tabs>
  );
}
