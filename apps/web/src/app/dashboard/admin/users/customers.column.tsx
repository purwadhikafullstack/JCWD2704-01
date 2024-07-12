"use client";
import HeaderSortBtn from "@/components/table/header.sort.button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TUser } from "@/models/user.model";
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

export const customersColumns: ColumnDef<TUser>[] = [
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
    accessorKey: "is_verified",
    header: "Verification Status",
    id: "verification",
    cell: ({ row }) => {
      const isActive = row.getValue("verification");
      return (
        <Badge variant={isActive ? "destructive" : "default"}>
          {isActive ? "Unverified" : "Verified"}
        </Badge>
      );
    },
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
      const isActive = row.getValue("is_banned");
      return (
        <Badge variant={isActive ? "destructive" : "default"}>
          {isActive ? "Resigned" : "Active"}
        </Badge>
      );
    },
  },
];
