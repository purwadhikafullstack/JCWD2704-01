import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-accent pb-20 sm:pb-[7.5rem]">
      <div className="container flex w-full flex-col items-center justify-center gap-4 px-4 py-6 md:py-4 sm:gap-2.5">
        <div className="flex size-full flex-col items-center md:flex-row sm:justify-between">
          <p className="text-muted-foreground">
            &copy;2024&nbsp;<span className="font-bold text-foreground">Farm2Door</span>.&nbsp;All rights reserved.
          </p>

          <p className="text-muted-foreground">
            Design system inspired by&nbsp;
            <Link href="https://segari.id/" target="_blank" className="text-primary">
              Segari.id
            </Link>
          </p>
        </div>

        <div className="flex gap-4 md:self-end">
          <Link href="/" target="_blank">
            <Facebook className="stroke-muted-foreground transition-colors duration-200 hover:stroke-foreground" />
          </Link>
          <Link href="/" target="_blank">
            <Instagram className="stroke-muted-foreground transition-colors duration-200 hover:stroke-foreground" />
          </Link>
          <Link href="/" target="_blank">
            <Twitter className="stroke-muted-foreground transition-colors duration-200 hover:stroke-foreground" />
          </Link>
          <Link href="/" target="_blank">
            <Mail className="stroke-muted-foreground transition-colors duration-200 hover:stroke-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
