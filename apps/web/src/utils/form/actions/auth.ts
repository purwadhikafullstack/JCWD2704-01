import { axiosInstanceCSR } from "@/lib/axios.client-config";
import { EmailVerificationType, ForgetPasswordType, LoginType, RegisterType } from "@/schemas/user.schema";

export const registerAction = async (payload: RegisterType) => {
  const { email, password, full_name, gender, address, address_detail, city_id, dob, referrence_code, phone_no, avatar } = payload;
  return await axiosInstanceCSR().post(
    "/users/v1",
    {
      email,
      password,
      full_name,
      gender,
      address,
      city_id,
      phone_no,
      ...(avatar && { avatar }),
      ...(dob && { dob }),
      ...(referrence_code && { referrence_code }),
      ...(address_detail && { address_detail }),
    },
    { headers: { "Content-Type": "multipart/form-data" } },
  );
};

export const loginAction = async (payload: LoginType) => {
  return await axiosInstanceCSR().post("/users/v2", payload);
};

export const emailVerificationAction = async (payload: EmailVerificationType) => {
  return await axiosInstanceCSR().post("/users/v3", payload);
};

export const forgetPasswordAction = async (payload: ForgetPasswordType, token: string) => {
  return await axiosInstanceCSR().patch(`users/v3/${token}`, { password: payload.password });
};
