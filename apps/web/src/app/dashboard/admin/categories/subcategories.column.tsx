"use client";
import ApprovalDialog from "@/components/approval-dialog";
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
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Delete, Edit, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
// import ProductEditForm from "./_components/product.edit.form";
import AdminCRUDDialog from "../_component/admin.crud.dialog";
import { TSubCategory } from "@/models/category.model";
import HeaderSortBtn from "@/components/table/header.sort.button";
import SubCatEditForm from "./_components/subcat.edit.form";
import { deleteSubCat } from "@/utils/fetch/client/categories.client-fetch";
import { cn } from "@/lib/utils";
import useAuthStore, { AuthStore } from "@/stores/auth.store";
import { Role } from "@/models/user.model";

export const subCategoriesColumns: ColumnDef<TSubCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => <HeaderSortBtn name="Category" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
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
      const subCategories = row.original;
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
                    navigator.clipboard.writeText(subCategories.name || "");
                    toast.success("Email copied to clipboard.", {
                      duration: 1000,
                    });
                  }}
                >
                  Copy name
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
              <SubCatEditForm subCategory={subCategories} />
            </AdminCRUDDialog>
            <ApprovalDialog
              onClick={() => {
                deleteSubCat(subCategories.id);
              }}
            />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
