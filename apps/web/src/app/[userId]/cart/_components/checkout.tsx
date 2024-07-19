"use client";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/stores/checkout";
import { toIDR } from "@/utils/toIDR";
import dynamic from "next/dynamic";
import { useState } from "react";

export function Checkout() {
  const { total, list } = useCheckout((s) => {
    const list = s.list;
    return { total: s.listTotal(list), list };
  });
  const [modal, setModal] = useState(false);
  const CheckoutModal = dynamic(() => import("./checkoutModal"));
  const Modal = dynamic(() => import("@/components/Modal"));
  return (
    <>
      <div className="sticky bottom-0 z-20 w-full bg-white px-2">
        <div className="flex w-full items-center justify-between *:py-4">
          <div>
            <h1>{`Total: ${toIDR(total)}`}</h1>
          </div>
          <Button disabled={list.length < 1} onClick={() => setModal(true)}>
            <h1>Checkout</h1>
          </Button>
        </div>
      </div>
      {modal && (
        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <CheckoutModal />
        </Modal>
      )}
    </>
  );
}
