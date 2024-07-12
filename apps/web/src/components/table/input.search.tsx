"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

type Props = { placeholder: string };
export default function SearchParamsInput({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = useDebouncedCallback(({ search }) => {
    const params = new URLSearchParams(searchParams);
    search ? params.set("search", search) : params.set("search", "");
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <Input
      id="search"
      type="text"
      placeholder={placeholder}
      onChange={(e) => handleChange({ search: e.target.value })}
    />
  );
}
