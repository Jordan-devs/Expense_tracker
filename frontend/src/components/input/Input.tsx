import { useState } from "react";
import type { InputTypes } from "../../types/types";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  value,
  name,
  placeholder,
  onChange,
  label,
  type,
}: InputTypes) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[14px] font-medium text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="w-full bg-transparent outline-none"
        />

        {type === "password" &&
          (showPassword ? (
            <Eye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <EyeOff
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};
export default Input;
