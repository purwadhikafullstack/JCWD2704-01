import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = { title: string; desc: string; children: React.ReactNode };
export default function AdminCRUDDialog({ title, desc, children }: Props) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{desc}</DialogDescription>
      </DialogHeader>
      <div className="max-h-[480px] overflow-y-scroll rounded-md border-2 p-3">
        {children}
      </div>
    </DialogContent>
  );
}
