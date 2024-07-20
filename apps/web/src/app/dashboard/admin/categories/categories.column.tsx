"use client";
import ApprovalDialog from "@/components/approval-dialog";
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
import { Product } from "@/models/product.model";
import { tableDateFormat } from "@/utils/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, Delete, Edit, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import AdminCRUDDialog from "../_component/admin.crud.dialog";
import { TCategory, TSubCategory } from "@/models/category.model";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL } from "@/config/config";
import { cn } from "@/lib/utils";
import CategoriesEditForm from "./_components/categories.update.form";
import { deleteCategory } from "@/utils/fetch/client/categories.client-fetch";
import useAuthStore, { AuthStore } from "@/stores/auth.store";
import { Role } from "@/models/user.model";
import HeaderServerSortBtn from "@/components/table/header.server-sort.button";
import HeaderSortButton from "@/components/table/header.sort.button";

export const categoriesColumns: ColumnDef<TCategory>[] = [
  {
    accessorKey: "image_id",
    header: "Images",
    id: "image_id",
    cell: ({ row }) => {
      const imageName = row.original.image?.name;
      return (
        <div className="size-24">
          <Image
            src={`${NEXT_PUBLIC_BASE_API_URL}/images/${imageName}`}
            alt={`${row.original.name} image`}
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
    header: () => <HeaderServerSortBtn name="Name" sortBy="name" sortByParamsKey="sort_by_tab1" sortDirParamsKey="sort_dir_tab1" />,
  },
  {
    accessorKey: "product",
    header: ({ column }) => <HeaderSortButton name="Total Products" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    cell: ({ row }) => {
      const product: Product[] = row.getValue("product");
      return <p>{product.length ? product.length : "-"}</p>;
    },
  },
  {
    accessorKey: "sub_categories",
    id: "sub_categories",
    header: ({ column }) => <HeaderSortButton name="Sub-categories" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
    cell: ({ row }) => {
      const subCategories = row.getValue<TSubCategory[]>("sub_categories");
      const some = subCategories.slice(0, 3);
      const more = subCategories.slice(3, subCategories.length);
      return (
        <div className="flex flex-wrap gap-2">
          {some.map((subCat: TSubCategory) => (
            <Badge className="justify-center text-nowrap bg-black text-white hover:bg-zinc-700">{subCat.name}</Badge>
          ))}
          <Badge className={cn(!more.length && "hidden", "justify-center text-nowrap bg-black text-white hover:bg-zinc-700")}>
            +{more.length} More...
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    id: "created",
    header: () => (
      <HeaderServerSortBtn name="Created At" sortBy="created_at" sortByParamsKey="sort_by_tab1" sortDirParamsKey="sort_dir_tab1" />
    ),
    cell: ({ row }) => new Intl.DateTimeFormat("id-ID", tableDateFormat).format(new Date(row.getValue("created"))),
  },
  {
    accessorKey: "updated_at",
    id: "updated",
    header: () => (
      <HeaderServerSortBtn name="Updated At" sortBy="updated_at" sortByParamsKey="sort_by_tab1" sortDirParamsKey="sort_dir_tab1" />
    ),
    cell: ({ row }) => new Intl.DateTimeFormat("id-ID", tableDateFormat).format(new Date(row.getValue("updated"))),
  },
  {
    id: "action",
    cell: ({ row }) => {
      const category = row.original;
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
                    navigator.clipboard.writeText(category.name || "");
                    toast.success("Category name copied to clipboard.", {
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
              <CategoriesEditForm category={category} />
            </AdminCRUDDialog>
            <ApprovalDialog
              onClick={() => {
                deleteCategory(category.id);
              }}
            />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
