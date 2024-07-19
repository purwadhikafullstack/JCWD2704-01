"use client";

import { Form } from "@/components/ui/form";
import { loginSchema, LoginType } from "@/schemas/user.schema";
import { loginSubmit } from "@/utils/form/handlers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput } from "./input";
import { ButtonSubmit } from "@/components/ui/button-submit";

export const LoginForm = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-4">
        <LoginInput form={form} name="email" placeholder="your@mail.com" label="Email" />
        <LoginInput form={form} name="password" type="password" placeholder="●●●●●●●" label="Password" />
        <ButtonSubmit isSubmitting={form.formState.isSubmitting} label="Login" type="submit" className="w-full mt-2" />
      </form>
    </Form>
  );
};
