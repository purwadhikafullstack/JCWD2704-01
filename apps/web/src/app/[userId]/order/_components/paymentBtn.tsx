"use client";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PaymentBtn() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button onClick={() => setModal(true)}>Pay</Button>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <section className="flex flex-col gap-4 *:flex *:flex-col *:gap-y-2 *:text-center">
          <div>
            <Label htmlFor="paymentProof">Upload your payment proof</Label>
            <Input name="paymentProof" type="file" onChange={(e) => {}} />
          </div>
          <h1>----- OR -----</h1>
          <Label>use payment gateway</Label>
          <Button variant={"secondary"}>Midtrans</Button>
        </section>
      </Modal>
    </>
  );
}
