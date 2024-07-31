"use client";

import { TCategory } from "@/models/category.model";
import { imageUrl } from "@/utils/imageUrl";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/stores/auth.store";

export const Category = ({ categories }: { categories?: TCategory[] }) => {
  const { user } = useAuthStore();

  return (
    <ul className="flex max-w-full gap-4 overflow-auto">
      {categories?.map((cat) => (
        <li key={cat.id} className="w-[70px] flex-shrink-0 truncate">
          <Link href={`/categories/${cat.name.toLowerCase()}?page=1&store_id=${user.addresses.length ? user.addresses[0].city_id : 0}`} className="">
            <Image
              src={imageUrl.render(cat.image?.name)}
              alt={cat.name}
              height={70}
              width={70}
              sizes="70px"
              className="size-auto shrink-0 rounded-full object-contain"
            />
            <span className="truncate">{cat.name}</span>
          </Link>
        </li>
      ))}
      {categories?.map((cat) => (
        <li key={cat.id} className="">
          <Link href={`/category/${cat.name}`} className="">
            <Image
              src={imageUrl.render(cat.image?.name)}
              alt={cat.name}
              height={60}
              width={60}
              sizes="60px"
              className="size-auto rounded-full object-contain"
            />
            {cat.name}
          </Link>
        </li>
      ))}
      {categories?.map((cat) => (
        <li key={cat.id} className="">
          <Link href={`/category/${cat.name}`} className="">
            <Image
              src={imageUrl.render(cat.image?.name)}
              alt={cat.name}
              height={60}
              width={60}
              sizes="60px"
              className="size-auto rounded-full object-contain"
            />
            {cat.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
