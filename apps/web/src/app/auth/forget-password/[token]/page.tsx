import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { isValid } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { ForgetPasswordForm } from "../_components/password";

export default async function ForgotPasswordPage({ params }: { params: { token: string } }) {
  const CHECK = await new Promise((resolve) => {
    try {
      resolve(jwtDecode(params.token));
    } catch (error) {
      redirect("/auth/forget-password");
    }
  });

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>

            <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing.</CardDescription>
          </CardHeader>

          <CardContent>
            <ForgetPasswordForm token={params.token} />
          </CardContent>

          <CardFooter>
            <CardDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, et.</CardDescription>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
