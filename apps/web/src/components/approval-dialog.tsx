import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  title?: string;
  subtitle?: string;
  cancelBtnText?: string;
  actBtnText?: string;
};
export default function ApprovalDialog({
  onClick,
  title = "Are you absolutely sure?",
  subtitle = "This action cannot be undone.",
  cancelBtnText = "Cancel",
  actBtnText = "Continue",
}: Props) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{subtitle}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{cancelBtnText}</AlertDialogCancel>
        <AlertDialogAction
          className="bg-destructive hover:bg-red-400"
          onClick={onClick}
        >
          {actBtnText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
