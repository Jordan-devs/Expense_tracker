import type React from "react";
import type { ReactNode } from "react";

export interface AuthLayoutTypes {
  children: ReactNode;
  isResetPassword?: boolean;
}

export interface InputTypes {
  value: string | number;
  placeholder: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "email" | "password" | "number";
}

export interface AvatarSelectorTypes {
  setProfile: (file: File | null) => void;
}

export interface SlotProps {
  char: string | null;
  placeholderChar: string | null;
  isActive: boolean;
  hasFakeCaret: boolean;
}

export interface EmailUIProps {
  email: string;
  setEmail: (email: string) => void;
  error: string | null;
  handleRequestCode: (e: React.FormEvent<HTMLFormElement>) => unknown;
}

export interface CodeUIProps {
  error: string | null;
  handleCheckEmail: () => unknown;
}

export interface PasswordUIProps {
  error: string | null;
  password: string;
  confirmPassword: string;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  handleResetPassword: (e: React.FormEvent<HTMLFormElement>) => unknown;
}

export interface user {
  email: string;
  username: string;
  id: number;
  avatarUrl: string;
}
