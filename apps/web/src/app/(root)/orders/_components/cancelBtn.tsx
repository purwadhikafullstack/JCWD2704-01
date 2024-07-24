"use client";
import Modal from "@/components/Modal";
import OrderStatusButton from "@/components/order/orderStatusButton";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CancelOrderBtn() {
  const { inv } = useParams();
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button variant={"destructive"} onClick={() => setModal(true)}>
        Cancel
      </Button>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <section className="*:my-4">
          <h1>Are you use to cancel this order?</h1>
          <div className="flex justify-center gap-x-4">
            <Button variant={"destructive"} onClick={() => setModal(false)}>
              No
            </Button>
            <OrderStatusButton inv={String(inv)} to="cancel" text="Yes" variant={"default"} />
          </div>
        </section>
      </Modal>
    </>
  );
}
