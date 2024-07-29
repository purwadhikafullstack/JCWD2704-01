"use client";

import { Form } from "@/components/ui/form";
import { loginSchema, LoginType } from "@/schemas/user.schema";
import { loginSubmit } from "@/utils/form/handlers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput } from "./input";
import { ButtonSubmit } from "@/components/ui/button-submit";
import useAuthStore from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginForm = () => {
  const { login, user } = useAuthStore();
  const router = useRouter();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user.id) router.push("/");
  }, [user.id]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((payload) => loginSubmit(payload, login))} className="space-y-4">
        <LoginInput form={form} name="email" placeholder="your@mail.com" label="Email" />
        <LoginInput form={form} name="password" type="password" placeholder="●●●●●●●" label="Password" />
        <ButtonSubmit isSubmitting={form.formState.isSubmitting} label="Login" type="submit" className="mt-2 w-full" />
      </form>
    </Form>
  );
};