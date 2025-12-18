import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Input from "../input/Input";
import type { EmailUIProps } from "../../types/types";

const EmailUI = ({
  email,
  setEmail,
  error,
  handleRequestCode,
}: EmailUIProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center h-3/4 md:h-full lg:w-[70%] lg:pb-30">
      <button
        className="text-[14px] text-slate-800 mb-8 flex gap-x-1.5 items-center hover:text-slate-500 cursor-pointer transition-colors"
        onClick={() => navigate("/login")}
      >
        {" "}
        <ArrowLeft size="22px" /> Back to Login
      </button>
      <h3 className="text-[22px] font-semibold text-black">
        Reset Your Password
      </h3>
      <p className="text-sm text-slate-700 mt-1.25 mb-6 ">
        Well you forgot your password let's reset it.
      </p>

      <form onSubmit={handleRequestCode}>
        <Input
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="John@gmail.com"
          label="Email Address"
          type="email"
        />

        {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SEND EMAIL
        </button>
      </form>
    </div>
  );
};
export default EmailUI;
