import { axiosInstance } from "@/lib/axios";
import { axiosInstanceCSR } from "@/lib/axios.client-config";
import {
  ChangePasswordType,
  ChangeProfileType,
  EmailVerificationType,
  ForgetPasswordType,
  LoginType,
  RegisterType,
} from "@/schemas/user.schema";

export const registerAction = async (payload: RegisterType) => {
  const { email, password, full_name, gender, dob, referrence_code, phone_no, avatar } = payload;
  return await axiosInstanceCSR().post(
    "/users/v1",
    {
      email,
      password,
      full_name,
      gender,
      phone_no,
      ...(avatar && { avatar }),
      ...(dob && { dob }),
      ...(referrence_code && { referrence_code }),
    },
    { headers: { "Content-Type": "multipart/form-data" } },
  );
};

export const loginAction = async (payload: LoginType) => {
  return await axiosInstance().post("/users/v2", payload);
};

export const emailVerificationAction = async (payload: EmailVerificationType) => {
  return await axiosInstance().post("/users/v3", payload);
};

export const forgetPasswordAction = async (payload: ForgetPasswordType, token: string) => {
  return await axiosInstance().patch(`users/v3/${token}`, { password: payload.password });
};

export const changePasswordAction = async (payload: ChangePasswordType) => {
  return await axiosInstanceCSR().patch("/users/v1/password", { password: payload.password, newPassword: payload.newPassword });
};

export const changeProfileAction = async (payload: ChangeProfileType) => {
  console.log({
    ...(payload.avatar && { avatar: payload.avatar }),
    ...(payload.full_name && { full_name: payload.full_name }),
    ...(payload.dob && { dob: payload.dob }),
    ...(payload.phone_no && { phone_no: payload.phone_no }),
  });
  return await axiosInstanceCSR().patch(
    "/users/v1/profile",
    {
      ...(payload.avatar && { avatar: payload.avatar }),
      ...(payload.full_name && { full_name: payload.full_name }),
      ...(payload.dob && { dob: payload.dob }),
      ...(payload.phone_no && { phone_no: payload.phone_no }),
    },
    { headers: { "Content-Type": "multipart/form-data" } },
  );
};
