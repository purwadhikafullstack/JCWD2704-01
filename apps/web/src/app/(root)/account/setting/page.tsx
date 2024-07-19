import Link from "next/link";
import { AccountSetting } from "../_components/setting";
import { ChevronLeft } from "lucide-react";

export default function UserSettingPage() {
  return (
    <main className="min-h-screen w-full pb-20">
      <section className="flex flex-col">
        <AccountSetting />


      </section>
    </main>
  );
}
