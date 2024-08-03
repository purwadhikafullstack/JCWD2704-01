"use client";

import HeaderSortButton from "@/components/table/header.sort.button";
import { Checkbox } from "@/components/ui/checkbox";
import { TUser } from "@/models/user.model";
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";

export const createStoreAdminSelectColumns: ColumnDef<TUser | undefined>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
        onCheckedChange={(check) => table.toggleAllRowsSelected(!!check)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => {
      const store = row.original;
      return <Checkbox checked={row.getIsSelected()} onCheckedChange={(check) => row.toggleSelected(!!check)} aria-label="Select Row" />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "Fullname",
    accessorKey: "full_name",
    header: ({ column }) => <HeaderSortButton name="Full Name" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <HeaderSortButton name="Email" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <HeaderSortButton name="Gender" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    accessorFn: (user) => (user?.gender === "male" ? "Male" : "Female"),
  },
  {
    accessorKey: "dob",
    header: ({ column }) => <HeaderSortButton name="Date of birth" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    cell: ({ row }) => new Intl.DateTimeFormat("id-ID", tableDateFormat).format(new Date(row.getValue("dob"))),
  },
  {
    accessorKey: "phone_no",
    header: ({ column }) => <HeaderSortButton name="Phone Number" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    accessorFn: (user) => (user?.phone_no ? user.phone_no : "-"),
  },
  {
    accessorKey: "addresses",
    id: "address",
    accessorFn: (user) => (user?.addresses?.length ? user.addresses[0]?.address : "-"),
    header: "Address",
  },
  {
    accessorKey: "addresses",
    id: "details",
    accessorFn: (user) => (user?.addresses?.length ? user.addresses[0]?.details : "-"),
    header: "Details",
  },
];
