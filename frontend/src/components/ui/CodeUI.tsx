import { OTPInput } from "input-otp";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FakeDash from "../input/FakeDash";
import Slot from "../input/Slot";
import type { CodeUIProps } from "../../types/types";

const CodeUI = ({ error, code, setCode, handleCheckCode }: CodeUIProps) => {
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
      <h3 className="text-[22px] font-semibold text-black">Email Sent</h3>
      <p className="text-sm text-slate-700 mt-1.25 mb-6 ">
        Check your inbox for the code
      </p>

      <form>
        <OTPInput
          onComplete={handleCheckCode}
          onChange={setCode}
          value={code ?? ""}
          maxLength={6}
          containerClassName="group flex items-center has-[:disabled]:opacity-30 mb-6"
          render={({ slots }) => (
            <div className="flex items-center">
              <div className="flex gap-2">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <FakeDash />

              <div className="flex gap-2">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </div>
          )}
        />

        {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
      </form>
    </div>
  );
};
export default CodeUI;
