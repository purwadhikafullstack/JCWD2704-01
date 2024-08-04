"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { registerSubmit } from "@/utils/form/handlers/auth";
import { ButtonSubmit } from "@/components/ui/button-submit";
import { registerSchema, RegisterType } from "@/schemas/user.schema";

import { RegisterInput } from "./Input";
import { RegisterDobInput } from "./input-dob";
import { RegisterAvatarInput } from "./input-avatar";
import { RegisterSelectGender } from "./input-gender";
import { RegisterPasswordInput } from "./input-password";
import { useEffect } from "react";

export const RegisterForm = () => {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    resetOptions: { keepIsSubmitted: false },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) window.location.reload();
  }, [form.formState.isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form className="size-full space-y-4" onSubmit={form.handleSubmit(registerSubmit)}>
        <div className="flex w-full items-center justify-center">
          <RegisterAvatarInput form={form} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RegisterInput form={form} name="full_name" label="Full Name" placeholder="Your name" />
          <RegisterInput form={form} name="email" label="Email" placeholder="your@mail.com" />
          <RegisterSelectGender form={form} />
          <RegisterInput form={form} name="phone_no" label="Phone Number" placeholder="+62" />
          <RegisterInput form={form} name="referrence_code" label="Referral Code" placeholder="####-####" className="w-full" />
          <RegisterDobInput form={form} />
          <RegisterPasswordInput form={form} name="password" label="Password" placeholder="●●●●●●●" />
          <RegisterPasswordInput form={form} name="confirmPassword" label="Confirm Password" placeholder="●●●●●●●" />
        </div>

        <ButtonSubmit label="Register" isSubmitting={form.formState.isSubmitting} className="w-full" />
      </form>
    </Form>
  );
};
