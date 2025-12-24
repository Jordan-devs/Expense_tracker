import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../utils/helper";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import AvatarSelector from "../../components/input/AvatarSelector";
import { api } from "../../lib/api";
import type { user } from "../../types/types";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = () => {
  const [profile, setProfile] = useState<File | null>(null);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { error, setError } = useErrorHandler();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = user.email.trim();
    const password = user.password.trim();
    const username = user.fullName;
    const avatar = profile;

    if (!avatar) {
      setError("Choose a profile picture");
      return;
    }

    if (!username) {
      setError("Enter your name");
      return;
    }

    if (!ValidateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const userData = await api.post<user>(API_PATHS.AUTH.REGISTER, formData);

      navigate("/dashboard");
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred during registration");
      }

      console.error("Error", error);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center mt-10 md:mt-0 md:h-full lg:w-full h-auto lg:pb-20 pb-10">
        <h3 className="text-[22px] font-semibold text-black">
          Create An Account
        </h3>
        <p className="text-sm text-slate-700 mt-1.25 mb-6 ">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>
          <AvatarSelector setProfile={setProfile} />

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <Input
              value={user.fullName}
              name="fullName"
              onChange={handleChange}
              placeholder="John Doe"
              label="Full Name"
              type="text"
            />
            <Input
              value={user.email}
              name="email"
              onChange={handleChange}
              placeholder="John@gmail.com"
              label="Email Address"
              type="email"
            />

            <div className="md:col-span-2">
              <Input
                value={user.password}
                name="password"
                label="Password"
                placeholder="Min 8 Characters"
                onChange={handleChange}
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-[14px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link to={"/login"} className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};
export default SignUp;
