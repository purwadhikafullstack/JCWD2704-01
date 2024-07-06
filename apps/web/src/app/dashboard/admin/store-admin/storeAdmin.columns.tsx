"use client";
import { Badge } from "@/components/ui/badge";
import { TUser } from "@/models/user.model";
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";

export const storeAdminColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "addresses",
    id: "address",
    accessorFn: (user) =>
      user.addresses?.length ? user.addresses[0]?.address : "-",
    header: "Address",
  },
  {
    accessorKey: "addresses",
    id: "details",
    accessorFn: (user) =>
      user.addresses?.length ? user.addresses[0]?.details : "-",
    header: "Details",
  },
  {
    accessorKey: "addresses",
    id: "city",
    accessorFn: (user) =>
      user.addresses?.length ? user.addresses[0]?.city.city_name : "-",
    header: "City",
  },
  {
    accessorKey: "created_at",
    header: "Join Date",
    cell: ({ row }) =>
      new Intl.DateTimeFormat("id-ID", tableDateFormat).format(
        new Date(row.getValue("created_at")),
      ),
  },
  {
    accessorKey: "store",
    id: "store_address",
    header: "Assigned Store",
    accessorFn: (user) => (user.store ? user.store?.address.address : "-"),
  },
  {
    accessorKey: "is_banned",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_banned");
      return (
        <Badge variant={isActive ? "destructive" : "default"}>
          {isActive ? "Resigned" : "Active"}
        </Badge>
      );
    },
  },
];
