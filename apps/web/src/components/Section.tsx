import { cn } from "@/lib/utils";
import { ElementRef, forwardRef, HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement>;

export const Section = forwardRef<ElementRef<"section">, SectionProps>(({ className, ...props }, ref) => {
  return <section ref={ref} className={cn("container bg-background rounded-md p-4", className)} {...props} />;
});
