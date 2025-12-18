import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Success = () => {
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
      <h3 className="text-[22px] font-semibold text-green-500">
        Password Reset Successful
      </h3>
      <p className="text-sm text-slate-700 mt-1.25 mb-6 ">
        your password as been successfully changed login now
      </p>
      <button onClick={() => navigate("/login")} className="btn-primary">
        LOGIN
      </button>
    </div>
  );
};
export default Success;
