import { axiosInstance } from "@/lib/axios";
import { LoginType, RegisterType } from "@/schemas/user.schema";

export const registerAction = async (payload: RegisterType) => {
  const { email, password, full_name, gender, address, address_detail, city_id, dob, referrence_code, phone_no, avatar } = payload;
  return await axiosInstance().post(
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
  return await axiosInstance().post("/users/v2", payload);
};
