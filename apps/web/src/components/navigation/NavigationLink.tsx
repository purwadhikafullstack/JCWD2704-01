"use client";

import { Home, Search, User } from "lucide-react";
import useAuthStore from "@/stores/auth.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links: { href: string; icon: (className: string) => JSX.Element }[] = [
  {
    href: "/",
    icon: (className) => <Home className={className} />,
  },
  {
    href: "/search",
    icon: (className) => <Search className={className} />,
  },
  {
    href: "/account",
    icon: (className) => <User className={className} />,
  },
];

export const NavigationLink = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const [path, setPath] = useState(pathname);

  return (
    <motion.div
      initial={{ y: "200%" }}
      animate={{ y: "0%" }}
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      className="size-full max-w-screen-sm border border-secondary-foreground/10 bg-secondary-foreground/10 bg-clip-border px-4 text-foreground/75 backdrop-blur-sm backdrop-filter sm:rounded-md sm:px-2 sm:py-2"
    >
      <ul role="navigation" onMouseLeave={() => setPath(pathname)} className="flex size-full items-center justify-between">
        <AnimatePresence>
          {links.map((link, idx) => (
            <li
              key={idx}
              onMouseEnter={() => setPath(link.href)}
              className="relative h-full rounded-md transition-all ease-in-out active:bg-secondary-foreground/5 active:shadow-inner"
            >
              <Link href={link.href} key={idx} className="flex h-full items-center justify-center px-4">
                {link.icon("size-8")}
              </Link>

              {path === link.href && (
                <motion.span
                  layoutId='indicator'
                  transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 block h-1 w-full rounded-full bg-foreground/75"
                />
              )}
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};
