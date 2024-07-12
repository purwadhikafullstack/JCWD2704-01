import { StoreAdminSearchParams } from "@/models/search.params";
import {
  fetchCustomersData,
  fetchStoreAdminData,
} from "@/utils/fetch/admin.fetch";
import { DataTable } from "../../../../components/table/data-table";
import { storeAdminColumns } from "./storeAdmin.columns";
import { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import Pagination from "@/components/pagination";
import { customersColumns } from "./customers.column";
import Spinner from "@/components/ui/spinner";

type Props = {
  searchParams: StoreAdminSearchParams;
};
export default async function AdminDashboard({ searchParams }: Props) {
  const storeAdmins = await fetchStoreAdminData(searchParams);
  const customers = await fetchCustomersData(searchParams);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Tabs defaultValue="store-admin">
        <TabsList className="mb-5 grid w-full grid-cols-2">
          <TabsTrigger value="store-admin">Store Admins</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="store-admin">
          <h2 className="mb-5 text-3xl font-extrabold">Store Admin Data</h2>
          <Suspense
            fallback={
              <div className="flex size-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <DataTable columns={storeAdminColumns} data={storeAdmins.users} />
          </Suspense>
          <div className="flex w-full justify-center">
            <Pagination totalPages={storeAdmins.totalPage} />
          </div>
        </TabsContent>
        <TabsContent value="customers">
          <h2 className="mb-5 text-3xl font-extrabold">Customers Data</h2>
          <Suspense
            fallback={
              <div className="flex size-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <DataTable columns={customersColumns} data={customers.users} />
          </Suspense>
          <div className="flex w-full justify-center">
            <Pagination totalPages={customers.totalPage} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
