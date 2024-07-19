"use client";
import ApprovalDialog from "@/components/approval-dialog";
import HeaderSortBtn from "@/components/table/header.sort.button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
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
import { Product, ProductVariant } from "@/models/product.model";
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Delete, Edit, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import ProductEditForm from "./_components/product.edit.form";
import AdminCRUDDialog from "../_component/admin.crud.dialog";
import { deleteProduct } from "@/utils/fetch/client/product.client-fetch";
import { cn } from "@/lib/utils";
import useAuthStore, { AuthStore } from "@/stores/auth.store";
import { Role } from "@/models/user.model";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ProductCarousel from "@/components/carousel/product.carousel";
import ProductDetailsSheet from "./_components/details.sheet";

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <HeaderSortBtn name="Product Name" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    id: "name",
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => <HeaderSortBtn name="Categories" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
  },
  {
    accessorKey: "sub_category.name",
    header: ({ column }) => <HeaderSortBtn name="Sub-Categories" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
  },
  {
    accessorKey: "variants",
    id: "variants",
    header: ({ column }) => <HeaderSortBtn name="Variants" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    cell: ({ row }) => {
      const variants = row.getValue<ProductVariant[]>("variants");
      return (
        <div className="flex flex-wrap gap-2">
          {variants.map((variant: ProductVariant) => (
            <Badge className="bg-black text-white hover:bg-zinc-700">{variant.name}</Badge>
          ))}
        </div>
      );
    },
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
      enum Dialogs {
        dialog1 = "dialog1",
        dialog2 = "dialog2",
      }
      const [dialog, setDialog] = useState<Dialogs>(Dialogs.dialog1);
      const admin: AuthStore = useAuthStore((s) => s);
      const product = row.original;
      return (
        <AlertDialog>
          <Dialog>
            <DropdownMenu modal={false}>
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
                    navigator.clipboard.writeText(product.name || "");
                    toast.success("Name copied to clipboard.", {
                      duration: 1000,
                    });
                  }}
                >
                  Copy product name
                </DropdownMenuItem>
                <DropdownMenuSeparator className={cn(admin.user.role !== Role.super_admin && "hidden")} />
                <SheetTrigger asChild onClick={() => setDialog(Dialogs.dialog1)}>
                  <DropdownMenuItem>
                    <Button variant="outline">See product details</Button>
                  </DropdownMenuItem>
                </SheetTrigger>
                <DropdownMenuSeparator className={cn(admin.user.role !== Role.super_admin && "hidden")} />
                <DialogTrigger
                  asChild
                  className={cn(admin.user.role !== Role.super_admin ? "hidden" : "flex cursor-pointer")}
                  onClick={() => setDialog(Dialogs.dialog2)}
                >
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
            {dialog === Dialogs.dialog1 ? (
              <ProductDetailsSheet product={product} />
            ) : (
              <AdminCRUDDialog title="Edit Product Data" desc="You can edit product data here.">
                <ProductEditForm product={product} />
              </AdminCRUDDialog>
            )}
            <ApprovalDialog
              onClick={() => {
                deleteProduct(product.id);
              }}
            />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
