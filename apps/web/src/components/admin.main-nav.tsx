import { LogOut, Menu, UserPlus2 } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import AdminNavLinks from "./admin.nav-links";
import { Separator } from "./ui/separator";

type Props = {};
export default function AdminMainNav({}: Props) {
  return (
    <header className="sticky top-0 flex items-center gap-4 border-b bg-background p-4 md:p-6">
      <nav className="hidden w-full md:flex md:flex-wrap md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
        <div className="flex items-center gap-6">
          <AdminNavLinks />
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex h-full gap-2 self-end">
            <Button
              type="button"
              className="flex items-center bg-primary text-white hover:bg-green-500"
            >
              <UserPlus2 /> Add Store Admin
            </Button>
            <Button
              type="button"
              className="flex items-center bg-destructive text-white hover:bg-red-400"
            >
              <LogOut /> Logout
            </Button>
            <Separator orientation="vertical" className="h-10" />
            <div className="text-right text-xs leading-[12px]">
              <p>
                Welcome, <span className="font-bold">Super Admin</span>
              </p>
              <p>Si Paling Super</p>
              <p className="font-bold">super@mail.com</p>
            </div>
          </div>
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <AdminNavLinks />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
