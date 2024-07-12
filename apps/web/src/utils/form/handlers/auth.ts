import { LoginType, RegisterType } from "@/schemas/user.schema";
import { loginAction, registerAction } from "../actions/auth";
import { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";

export const registerSubmit = async (payload: RegisterType) => {
  try {
    const response = await registerAction(payload);
    toast({
      title: response.data.title,
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
    console.log(response)
    toast({
      title: response.data.title,
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
