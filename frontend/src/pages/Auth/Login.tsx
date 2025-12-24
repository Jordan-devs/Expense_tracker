import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../utils/helper";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { api } from "../../lib/api";
import { API_PATHS } from "../../utils/apiPaths";
import type { user } from "../../types/types";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { error, setError } = useErrorHandler();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = user.email.trim();
    const password = user.password.trim();

    if (!ValidateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const userData = await api.post<user>(API_PATHS.AUTH.LOGIN, {
        email: email,
        password: password,
      });

      navigate("/dashboard");
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred during login");
      }
      console.error("Login error", error);
    }
  };
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center h-3/4 md:h-full lg:w-[70%] lg:pb-20">
        <h3 className="text-[22px] font-semibold text-black">Welcome Back</h3>
        <p className="text-sm text-slate-700 mt-1.25 mb-6 ">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={user.email}
            name="email"
            onChange={handleChange}
            placeholder="John@gmail.com"
            label="Email Address"
            type="email"
          />

          <Input
            value={user.password}
            name="password"
            label="Password"
            placeholder="Min 8 Characters"
            onChange={handleChange}
            type="password"
          />

          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <div className="flex justify-between items-center mt-3">
            <p className="text-[14px]">
              {" "}
              <Link
                to={"/reset-password"}
                className="font-medium text-primary underline"
              >
                Forgot Password
              </Link>
            </p>
            <p className="text-[14px] text-slate-800">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-primary underline"
              >
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
export default Login;
