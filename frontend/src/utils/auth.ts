import { redirect } from "react-router-dom";

export const verifyAuth = async () => {
  const apiBase = import.meta.env.VITE_API_URL as string;

  try {
    const response = await fetch(`${apiBase}/api/auth/verify-auth`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return redirect("/login");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Auth check Failed", error);
    return redirect("/login");
  }
};
