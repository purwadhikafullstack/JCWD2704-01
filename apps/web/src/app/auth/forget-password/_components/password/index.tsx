"use client";

import { ButtonSubmit } from "@/components/ui/button-submit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPasswordSchema, ForgetPasswordType } from "@/schemas/user.schema";
import { forgetPasswordSubmit } from "@/utils/form/handlers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const ForgetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((payload) => forgetPasswordSubmit(payload, token, router))} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={form.formState.isSubmitting} placeholder="●●●●●●●" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={form.formState.isSubmitting} placeholder="●●●●●●●" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSubmit isSubmitting={form.formState.isSubmitting} label="Reset your password" className="w-full" />
      </form>
    </Form>
  );
};
