import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmailForm } from "./_components/email";

export default function ForgetPasswordPage() {
  return (
    <main className="container flex h-screen w-full items-center justify-center pt-20">
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Email Verification.</CardTitle>

            <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus, itaque?</CardDescription>
          </CardHeader>

          <CardContent>
            <EmailForm />
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </section>
    </main>
  );
}
