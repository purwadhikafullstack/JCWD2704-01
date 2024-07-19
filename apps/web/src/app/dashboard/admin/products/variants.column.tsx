"use client";
import ApprovalDialog from "@/components/approval-dialog";
import HeaderSortBtn from "@/components/table/header.sort.button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductVariant } from "@/models/product.model";
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Delete, Edit, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import AdminCRUDDialog from "../_component/admin.crud.dialog";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";
import VariantEditForm from "./_components/variant.edit.form";
import { deleteVariant } from "@/utils/fetch/client/product.client-fetch";
import useAuthStore, { AuthStore } from "@/stores/auth.store";
import { cn } from "@/lib/utils";
import { Role } from "@/models/user.model";
export const variantsColumns: ColumnDef<ProductVariant>[] = [
  {
    accessorKey: "image_id",
    header: "Images",
    cell: ({ row }) => {
      const imageName = row.original.images.name;
      return (
        <div className="size-24">
          <Image
            src={`${NEXT_PUBLIC_BASE_API_URL}/images/${imageName}`}
            alt={`${row.original.product.name} ${row.original.name} image`}
            width={240}
            height={240}
            className="rounded-md object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <HeaderSortBtn name="Variant Name" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    id: "name",
  },
  {
    accessorKey: "type",
    header: ({ column }) => <HeaderSortBtn name="Types" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
  },
  {
    accessorKey: "weight",
    header: ({ column }) => <HeaderSortBtn name="Weight" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
  },
  {
    accessorKey: "product.name",
    header: ({ column }) => <HeaderSortBtn name="Product" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
  },
  {
    accessorKey: "created_at",
    id: "created",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created At
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => new Intl.DateTimeFormat("id-ID", tableDateFormat).format(new Date(row.getValue("created"))),
  },
  {
    accessorKey: "updated_at",
    id: "updated",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Updated At
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => new Intl.DateTimeFormat("id-ID", tableDateFormat).format(new Date(row.getValue("updated"))),
  },
  {
    id: "action",
    cell: ({ row }) => {
      const variant = row.original;
      const admin: AuthStore = useAuthStore((s) => s);
      return (
        <AlertDialog>
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
                    navigator.clipboard.writeText(variant.name || "");
                    toast.success("Name copied to clipboard.", {
                      duration: 1000,
                    });
                  }}
                >
                  Copy variant name
                </DropdownMenuItem>
                <DropdownMenuSeparator className={cn(admin.user.role !== Role.super_admin && "hidden")} />
                <DialogTrigger asChild className={cn(admin.user.role !== Role.super_admin ? "hidden" : "flex cursor-pointer")}>
                  <DropdownMenuItem>
                    <Edit className="mr-2 size-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild className={cn(admin.user.role !== Role.super_admin ? "hidden" : "flex cursor-pointer")}>
                  <DropdownMenuItem>
                    <Delete className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AdminCRUDDialog title="Edit Product Data" desc="You can edit product data here.">
              <VariantEditForm variant={variant} />
            </AdminCRUDDialog>
            <ApprovalDialog
              onClick={() => {
                deleteVariant(variant.id);
              }}
            />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
