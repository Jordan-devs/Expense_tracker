import type { AuthLayoutTypes } from "../../types/types";
import authCard from "../../assets/images/auth.png";

const AuthLayout = ({ children }: AuthLayoutTypes) => {
  return (
    <div className="flex">
      <div className="h-screen w-screen md:w-[50vw] px-12 pt-8 pb-12">
        <h2 className="text-2xl font-semibold text-black mt-4">Spendly</h2>
        {children}
      </div>

      <div className="py-8 pr-12 h-[cal(100vh-32px)] hidden md:block">
        <div className="flex w-[50vw] bg-violet-100 bg-cover bg-center bg-no-repeat overflow-hidden justify-center items-center rounded-3xl h-full">
          <img
            src={authCard}
            alt="This is a spending tracker"
            width={1200}
            height={1200}
            className="pb-10"
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
