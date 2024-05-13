import { ISighupInput, IUser, LoginInput } from "@/types";
import axiosInstance from "./axiosInstance";

interface UserRequest<T> {
  user: T;
}

interface UserResponse<T> {
  user: T;
}

export const LoginUser = async (loginInput: LoginInput) => {
  const response = await axiosInstance.post<UserResponse<IUser>>(
    "users/login",
    {
      user: loginInput,
    } as UserRequest<LoginInput>,
  );
  return response.data;
};

export const SignupUser = async (signupInput: ISighupInput) => {
  const response = await axiosInstance.post<UserResponse<IUser>>("users", {
    user: signupInput,
  } as UserRequest<LoginInput>);
  return response.data;
};

export const GetCurrentUser = async () => {
  const response = await axiosInstance.get<UserResponse<IUser>>("user/me");
  return response.data;
};
