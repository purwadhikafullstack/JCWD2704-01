"use client";
import HeaderSortBtn from "@/components/table/header.sort.button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TUser } from "@/models/user.model";
import { deleteStoreAdmin } from "@/utils/fetch/admin.fetch";
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import StoreAdminEdit from "../_component/store-admin.edit.dialog";

export const storeAdminColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
    id: "Fullname",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <HeaderSortBtn
        name="Email"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <HeaderSortBtn
        name="Gender"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "dob",
    header: ({ column }) => (
      <HeaderSortBtn
        name="Date Of Birth"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) =>
      new Intl.DateTimeFormat("id-ID", tableDateFormat).format(
        new Date(row.getValue("dob")),
      ),
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
    header: ({ column }) => (
      <HeaderSortBtn
        name="City"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "created_at",
    id: "join",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Join Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      new Intl.DateTimeFormat("id-ID", tableDateFormat).format(
        new Date(row.getValue("join")),
      ),
  },
  {
    accessorKey: "is_banned",
    id: "status",
    header: ({ column }) => (
      <HeaderSortBtn
        name="Status"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("status");
      return (
        <Badge variant={isActive ? "destructive" : "default"}>
          {isActive ? "Resigned" : "Active"}
        </Badge>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const users = row.original;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(users?.email || "");
                  toast.success("Email copied to clipboard.", {
                    duration: 1000,
                  });
                }}
              >
                Copy user email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger asChild>
                  <Button type="button" variant="link">
                    Edit
                  </Button>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  type="button"
                  variant={"link"}
                  className="text-destructive"
                  size={"sm"}
                  onClick={() => deleteStoreAdmin(users.id)}
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <StoreAdminEdit user={users} />
        </Dialog>
      );
    },
  },
];
