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

export const RegisterForm = () => {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    resetOptions: { keepIsSubmitted: false },
  });

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(registerSubmit)}>
        <div className="flex w-full items-center justify-center">
          <RegisterAvatarInput form={form} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
          <RegisterInput form={form} name="full_name" label="Full Name" placeholder="Your name" />
          <RegisterInput form={form} name="email" label="Email" placeholder="your@mail.com" />
          <RegisterSelectGender form={form} />
          <RegisterInput form={form} name="phone_no" label="Phone Number" placeholder="+62" />
          <RegisterInput form={form} name="referrence_code" label="Referral Code" placeholder="####-####" className="w-full" />
          <RegisterDobInput form={form} />
          <RegisterInput form={form} name="password" label="Password" type="password" placeholder="●●●●●●●" />
          <RegisterInput form={form} name="confirmPassword" label="Confirm Password" type="password" placeholder="●●●●●●●" />
        </div>

        <ButtonSubmit label="Register" isSubmitting={form.formState.isSubmitting} className="w-full" />
      </form>
    </Form>
  );
};
