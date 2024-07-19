"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/auth.store";
import { imageUrl } from "@/utils/imageUrl";
import { Copy, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AccountHeader = () => {
  const { user } = useAuthStore();

  if (!user.id)
    return (
      <Link href="/auth" className="underline-offset-4 hover:underline">
        Sing in for further access.
      </Link>
    );

  const handleCopy = () => {
    navigator.clipboard.writeText(`${user.referral_code}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
          <Image
            src={imageUrl.webp(user.avatar?.name)}
            alt={`${user.full_name} profile picture`}
            height={80}
            width={80}
            sizes="80px"
            className={cn("aspect-square rounded-full border-primary-foreground object-cover", user.avatar?.name ? "border-[2.5px]" : "")}
          />
          <div className="">
            <p>{user.full_name}</p>
            <p>{user.phone_no}</p>
          </div>
        </div>

        <div>
          <Button variant="outline" size="sm" className="space-x-1.5 bg-primary" onClick={handleCopy}>
            <Copy className="size-4" />
            <span className="inline-block">{user.referral_code}</span>
          </Button>
        </div>
      </div>

      <Link
        href="/account/setting"
        className={cn(buttonVariants({ className: "flex items-center gap-1.5", variant: "secondary", size: "sm" }), 'max-w-screen-sm')}
      >
        <Settings className="size-4" /> <span className="inline-block">Settings</span>
      </Link>
    </div>
  );
};
