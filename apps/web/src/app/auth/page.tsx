import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "./_components/register";
import { LoginForm } from "./_components/login";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { fetchAllCities } from "@/utils/fetch/cities.fetch";

export default async function AuthPage() {
  const cities = await fetchAllCities()
  
  return (
    <main className="container flex h-screen w-full justify-center pt-20">
      <section className="h-fit w-full max-w-screen-lg space-y-4">
        <div className="space-y-2 text-balance text-center">
          <h2 className="text-5xl font-bold leading-none">Farm2Door</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <Tabs defaultValue="login" className="size-full">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="w-full">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="w-full">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>

                <CardDescription>Lorem ipsum dolor sit amet consectetur.</CardDescription>
              </CardHeader>

              <CardContent>
                <LoginForm />
              </CardContent>

              <CardFooter>
                <CardDescription>
                  <Link href='/auth/forget-password'>
                  Forget password?</Link>
                </CardDescription>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register your account</CardTitle>

                <CardDescription></CardDescription>
              </CardHeader>

              <CardContent>
                <RegisterForm cities={cities} />
              </CardContent>

              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
