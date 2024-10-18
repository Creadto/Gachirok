import Image from "next/image";

interface FilterSlotDropdownProps {
  slot: number;
  setSlot: (slot: number) => void;
}

export const FilterSlotDropdown = ({
  slot,
  setSlot,
}: FilterSlotDropdownProps) => {
  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[111px] bg-white rounded-lg shadow-md">
      <div className="mt-[5px] px-[12px] py-[12px]">
        <div className="flex items-center justify-center gap-x-[15px]">
          <button
            type="button"
            disabled={slot === 0}
            onClick={() => setSlot(slot - 1)}
            className="bg-[#eeeeee] w-[24px] h-[24px]  flex justify-center items-center font-bold text-xl rounded-[5px]"
          >
            -
          </button>
          <span className={`${slot === 0 ? "" : "text-[#e62a2f]"} font-semibold text-sm`}>
            {slot}
          </span>
          <button
            type="button"
            onClick={() => setSlot(slot + 1)}
            className="bg-[#eeeeee] w-[24px] h-[24px]  flex justify-center items-center font-bold text-xl rounded-[5px]"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
