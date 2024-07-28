import { useForm } from "react-hook-form";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";

import { Form } from "@/components/ui/form";
import { ButtonSubmit } from "@/components/ui/button-submit";
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
import { Button } from "@/components/ui/button";

export const AccountSettingPassword = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<ChangePasswordType>({ resolver: zodResolver(changePasswordSchema) });
  const { password, newPassword, confirmNewPassword } = form.getValues();
  const handleClick = () => buttonRef.current?.click();
  return (
    <Dialog>
      <DialogTrigger asChild className="p-0">
        <span className="flex w-full cursor-pointer items-center justify-start gap-4 rounded-md px-2 py-4 transition-all duration-300 hover:bg-accent hover:text-accent-foreground">
          <span className="block rounded-full bg-primary/10 p-2">
            <LockKeyhole className="size-6 stroke-primary" />
          </span>
          <span className="block">
            <span className="block">Change Password</span>
            <span className="block text-sm text-muted-foreground">Change your Password, Name, Etc. </span>
          </span>
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Change Your Password</DialogTitle>
          <DialogDescription className="text-left text-sm">
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
          <ButtonSubmit
            isSubmitting={form.formState.isSubmitting}
            disable={!Boolean(password || newPassword || confirmNewPassword)}
            label="Change Password"
            onClick={handleClick}
          />
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
