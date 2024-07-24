import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./PasswordInput";
import { changePasswordSubmit } from "@/utils/form/handlers/auth";
import { changePasswordSchema, ChangePasswordType } from "@/schemas/user.schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef } from "react";
import { ButtonSubmit } from "@/components/ui/button-submit";
import { useRouter } from "next/navigation";

export const AccountSettingPassword = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const handleClick = () => {
    buttonRef.current?.click();
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) window.location.reload()
  }, [form.formState.isSubmitSuccessful]);

  return (
    <Dialog>
      <DialogTrigger>Change Password</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Your Password</DialogTitle>
          <DialogDescription>
            Enhance your account security by changing your password regularly. Use a strong password that is unique to this account and keep
            it confidential.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(changePasswordSubmit)} className="space-y-4">
            <PasswordInput form={form} name="password" label="Current Password" />
            <PasswordInput form={form} name="newPassword" label="New Password" />
            <PasswordInput form={form} name="confirmNewPassword" label="Confirm New Password" />
            <button ref={buttonRef} type="submit" className="hidden"></button>
          </form>
        </Form>

        <DialogFooter className="mt-2">
          <ButtonSubmit isSubmitting={form.formState.isSubmitting} label="Change Password" onClick={handleClick} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
