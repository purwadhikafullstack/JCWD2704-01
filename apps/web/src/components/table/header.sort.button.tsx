import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  name: string;
  onClick: () => void;
};
export default function HeaderSortBtn({ name, onClick }: Props) {
  return (
    <Button variant="ghost" onClick={onClick}>
      {name}
      <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
