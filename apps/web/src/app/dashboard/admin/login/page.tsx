import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminLoginForm from "./_component/admin.login.form";
export default function AdminLoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Administrator Login</CardTitle>
          <CardDescription>
            Enter your administrator email below to login to your account.
          </CardDescription>
        </CardHeader>
        <AdminLoginForm />
      </Card>
    </div>
  );
}
