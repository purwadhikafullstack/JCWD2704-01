import { EmailVerificationType, ForgetPasswordType, LoginType, RegisterType } from "@/schemas/user.schema";
import { emailVerificationAction, forgetPasswordAction, loginAction, registerAction } from "../actions/auth";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const registerSubmit = async (payload: RegisterType) => {
  try {
    const response = await registerAction(payload);
    toast({
      title: response.data.message,
      description: response.data.description,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      toast({
        title: error.response?.data.message,
        description: error.response?.data.cause,
        variant: "destructive",
      });
    } else if (error instanceof Error) {
      toast({
        title: error.message,
        description: error.cause ? (error.cause as string) : "",
        variant: "destructive",
      });
    } else {
      toast({ title: `${error}`, variant: "destructive" });
    }
  }
};

export const loginSubmit = async (payload: LoginType) => {
  try {
    const response = await loginAction(payload);
    toast({
      title: response.data.message,
      description: response.data.description,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      toast({
        title: error.response?.data.message,
        description: error.response?.data.cause,
        variant: "destructive",
      });
    } else if (error instanceof Error) {
      toast({
        title: error.message,
        description: error.cause ? (error.cause as string) : "",
        variant: "destructive",
      });
    } else {
      toast({ title: `${error}`, variant: "destructive" });
    }
  }
};

export const emailVerificationSubmit = async (payload: EmailVerificationType) => {
  try {
    const response = await emailVerificationAction(payload);
    toast({
      title: response.data.message,
      description: response.data.description,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      toast({
        title: error.response?.data.message,
        description: error.response?.data.cause,
        variant: "destructive",
      });
    } else if (error instanceof Error) {
      toast({
        title: error.message,
        description: error.cause ? (error.cause as string) : "",
        variant: "destructive",
      });
    } else {
      toast({ title: `${error}`, variant: "destructive" });
    }
  }
};

export const forgetPasswordSubmit = async (payload: ForgetPasswordType, token: string, router: AppRouterInstance) => {
  try {
    const response = await forgetPasswordAction(payload, token);
    toast({
      title: response.data.message,
      description: response.data.description,
    });
    router.push("/auth");
  } catch (error) {
    if (error instanceof AxiosError) {
      toast({
        title: error.response?.data.message,
        description: error.response?.data.cause,
        variant: "destructive",
      });
    } else if (error instanceof Error) {
      toast({
        title: error.message,
        description: error.cause ? (error.cause as string) : "",
        variant: "destructive",
      });
    } else {
      toast({ title: `${error}`, variant: "destructive" });
    }
  }
};
