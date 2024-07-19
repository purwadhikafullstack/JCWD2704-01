"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/auth.store";
import { Card, CardContent } from "@/components/ui/card";
import { AccountSettingPassword } from "./Password";

export const AccountSetting = () => {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <button onClick={() => router.back()} className="flex items-center gap-0.5 text-lg font-semibold sm:text-xl">
          <ChevronLeft />
          <span className="inline-block">Account Setting</span>
        </button>
      </div>

      <div className="px-4">
        <Card>
          <CardContent className="p-6">
            <p>Edit Account</p>
            <AccountSettingPassword />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
