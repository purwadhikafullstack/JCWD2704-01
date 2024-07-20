"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
  setSearch?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  flatBottom?: boolean;
};
export default function SearchParamsInput({ placeholder = "Search...", setSearch = "search", rounded = "md", flatBottom = false }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = useDebouncedCallback(({ search }) => {
    const params = new URLSearchParams(searchParams);
    search ? params.set(setSearch, search) : params.delete(setSearch);
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div className="relative ml-auto w-full flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(e) => handleChange({ search: e.target.value })}
        className={`w-full rounded-${rounded} bg-background pl-8 ${flatBottom ? "rounded-b-none" : ""}`}
        defaultValue={`${searchParams.get(setSearch) ? searchParams.get(setSearch)?.toString() : ""}`}
      />
    </div>
  );
}
