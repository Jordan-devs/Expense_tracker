import { redirect } from "react-router-dom";
import { api } from "./api";
import type { user } from "../types/types";
import { API_PATHS } from "../utils/apiPaths";

export const verifyAuth = async () => {
  try {
    const userData = await api.get<user>(API_PATHS.AUTH.GET_USER_INFO);

    return userData;
  } catch (error) {
    console.error("Auth check Failed", error);
    return redirect("/login");
  }
};

export const authPageLoader = async () => {
  try {
    await api.get<user>(API_PATHS.AUTH.GET_USER_INFO);

    return redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return null;
  }
};
