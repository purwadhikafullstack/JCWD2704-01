"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  classname?: string;
  href: string;
  children: ReactNode;
};

export default function LinkUserState({
  classname = "",
  href,
  children,
}: Props) {
  const userId = "cly5w0lzg00020cjugmwqa7zf";
  return (
    <Link href={"/" + userId + href} className={classname}>
      {children}
    </Link>
  );
}
