import type { SlotProps } from "../../types/types";
import FakeCaret from "./FakeCaret";

const Slot = (props: SlotProps) => {
  return (
    <div
      className={`
        relative w-12 h-14 text-[1.5rem] flex items-center justify-center 
        transition-all duration-300 border text-black
        bg-slate-100 border-slate-200 rounded-[5px]
        ${props.isActive ? "ring-2 ring-blue-500 border-blue-500 z-10" : ""}
      `}
    >
      <div className={!props.char ? "opacity-30" : "opacity-100"}>
        {props.char ?? props.placeholderChar}
      </div>

      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
};
export default Slot;
