import { Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 h-[6.5rem] w-full">
      <div className="container flex size-full flex-col items-center justify-center rounded-b-md border-x border-b bg-secondary text-secondary-foreground">
        <nav className="flex size-full items-center justify-between">
          <div>Logo</div>
          <div>
            <Link href='/auth'>Login</Link>
          </div>
        </nav>

        <div className="relative h-fit w-full pb-4">
          <Input
            placeholder="Search product"
            className="h-8 truncate pl-8 focus-visible:ring-1 focus-visible:ring-offset-0"
          />
          <Search className="absolute left-2 top-1.5 text-input size-5" />
        </div>
      </div>
    </header>
  );
};
