import type React from "react";
import type { ReactNode } from "react";

export interface AuthLayoutTypes {
  children: ReactNode;
  isResetPassword?: boolean;
}

export interface InputTypes {
  value: string;
  placeholder: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "email" | "password";
}

export interface AvatarSelectorTypes {
  setProfile: (file: File | null) => void;
}
