"use client";
import { Button } from "@/components/ui/button";
import { TSubCategory } from "@/models/category.model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = { subCategories: TSubCategory[] };
export default function SubCategoriesBtns({ subCategories }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const pathname = usePathname();
  function handleSubCat(subCat: TSubCategory) {
    subCat ? params.set("sub_category", subCat.name) : params.delete("sub_category");
    replace(`${pathname}?${params.toString()}`);
  }
  function handleClear() {
    params.delete("sub_category");
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <>
      <Button
        size={"sm"}
        type="button"
        onClick={() => handleClear()}
        className="whitespace-nowrap text-nowrap rounded-full"
        variant={"outline"}
      >
        Clear Filter
      </Button>
      {subCategories.map((subCat: TSubCategory) => (
        <Button
          size={"sm"}
          type="button"
          onClick={() => handleSubCat(subCat)}
          key={subCat.id}
          className="whitespace-nowrap text-nowrap rounded-full text-white"
        >
          {subCat.name}
        </Button>
      ))}
    </>
  );
}
