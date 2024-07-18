"use client";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/models/order.model";
import { updateOrderStatus } from "@/utils/fetch/order.client-fetch";
import { useRouter } from "next/navigation";

type Props = {
  inv: string;
  to: "cancel" | "approve payment" | "send";
  text?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
};
export default function OrderStatusButton({ to, inv, text, variant = undefined }: Props) {
  type FN = {
    color?: "destructive" | "default" | "outline" | "secondary" | "ghost" | "link" | null;
    status: Exclude<OrderStatus, "wait_for_payment">;
  };
  const fn = (): FN => {
    switch (to) {
      case "cancel":
        return { color: "destructive", status: "canceled" };
      case "approve payment":
        return { status: "process" };
      case "send":
        return { status: "sending" };
    }
  };
  const router = useRouter();
  const { color, status } = fn();

  const onClick = async () => {
    await updateOrderStatus({
      inv,
      status,
    });
    router.refresh();
  };

  return (
    <Button variant={variant ? variant : color} onClick={onClick}>
      {text ? text : to}
    </Button>
  );
}
