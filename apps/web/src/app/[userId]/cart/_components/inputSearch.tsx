"use client";
import useDebounce from "@/hooks/debounce";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function InputSearch() {
  const router = useRouter();
  const sp = useSearchParams();
  const [searchParams, setSearchParams] = useState(new URLSearchParams(sp));

  const push = () => {
    router.push(`?${searchParams.toString()}`);
  };
  useDebounce(push, { delay: 300, triggerValues: [searchParams] });

  const setParams = (cb: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);
    cb(params);
    setSearchParams(params);
  };
  return (
    <>
      <input
        type="text"
        placeholder="search..."
        className="px-2"
        defaultValue={sp.get("s") || ""}
        onChange={(e) => {
          setParams((p) => {
            p.delete("s");
            p.append("s", e.target.value);
          });
        }}
      />
      <div className="mx-2 flex gap-x-2">
        <label htmlFor="store">All Store</label>
        <input
          id="store"
          name="store"
          type="checkbox"
          defaultChecked={Boolean(sp.get("store"))}
          onChange={(e) => {
            setParams((p) => {
              if (e.target.checked) p.append("store", "all");
              else p.delete("store");
            });
          }}
        />
      </div>
    </>
  );
}
