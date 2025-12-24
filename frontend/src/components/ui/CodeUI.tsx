import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CodeUIProps } from "../../types/types";

const CodeUI = ({ error, handleCheckEmail }: CodeUIProps) => {
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
        An Email has been sent to your inbox check it now
      </p>

      {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

      <button className="btn-primary" onClick={handleCheckEmail}>
        Open Email App
      </button>
    </div>
  );
};
export default CodeUI;
