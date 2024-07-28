"use client";

import { ButtonSubmit } from "@/components/ui/button-submit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailVerificationSchema, EmailVerificationType } from "@/schemas/user.schema";
import { emailVerificationSubmit } from "@/utils/form/handlers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const EmailForm = () => {
  const form = useForm<EmailVerificationType>({
    resolver: zodResolver(emailVerificationSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(emailVerificationSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Verification</FormLabel>
              <FormControl>
                <Input {...field} placeholder="your@mail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonSubmit isSubmitting={form.formState.isSubmitting} label="Check your Email" className="w-full" type="submit" />
      </form>
    </Form>
  );
};
