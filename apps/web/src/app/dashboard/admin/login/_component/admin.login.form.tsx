"use client";
import FormInput from "@/components/form/form.field.input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { searchParams } from "@/models/search.params";
import { Role } from "@/models/user.model";
import useAuthStore from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};
export default function AdminLoginForm({}: Props) {
  const { adminLogin, user: admin } = useAuthStore((state) => state);
  const router = useRouter();
  const routes = admin.role === Role.store_admin ? "/dashboard/admin/products" : "/dashboard/admin/users";
  const token = getCookie("access_token");
  const schema = z.object({
    email: z.string().trim().email({ message: " Enter valid email" }),
    password: z.string().trim(),
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: { email: string; password: string }) {
    adminLogin(values.email, values.password);
  }
  useEffect(() => {
    if (token) router.push(routes + searchParams);
  }, [token]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <FormInput control={form.control} name="email" label="Email" placeholder="admin@example.com" />
          <FormInput control={form.control} name="password" label="Password" type="password" />
        </CardContent>
        <CardFooter>
          <Button type="submit" className={"w-full"} disabled={form.formState.isSubmitting ? true : false}>
            <Loader2 className={cn(form.formState.isSubmitting ? "block" : "hidden", "mr-2 h-4 w-4 animate-spin")} />
            {`Sign in`}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
