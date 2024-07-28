import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";

type Props = { name: string; onClick: (e?: React.FormEvent<HTMLButtonElement>) => void };
export default function HeaderSortButton({ name, onClick }: Props) {
  return (
    <Button type="button" variant="ghost" onClick={onClick}>
      {name}
      <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
