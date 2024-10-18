import { weekdayOptions } from "@/core/types/DataForUI";
import { interestsOptions } from "@/core/types/InterestsAndExpertisesOptions";
import Image from "next/image";

interface FilterWeekDaysDropdownProps {
  weekDays: string[];
  handleDaysOfWeek: (weekDay: string) => void;
}

export const FilterWeekDaysDropdown = ({
  weekDays,
  handleDaysOfWeek,
}: FilterWeekDaysDropdownProps) => {
  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[110px] bg-white rounded-lg shadow-md">
      {weekdayOptions.map(({ label, value }) => (
        <button
          type="button"
          className="flex items-center cursor-pointer border-b border-[#eeeeee] mx-[12px] "
          key={value}
          onClick={() => handleDaysOfWeek(value)}
        >
          <div
            className={`w-[14px] h-[14px] flex items-center justify-center  rounded-full border mr-[8px] ${
              weekDays.includes(value)
                ? "border-[#e62a2f]"
                : " bg-white border-[#dddddd]"
            }  `}
          >
            {/* 동그라미 버튼 */}
            <div
              className={`w-[8px] h-[8px]  rounded-full ${
                weekDays.includes(value) ? "bg-[#e62a2f]" : ""
              }`}
            ></div>
          </div>

          {/* 설명 */}
          <div className="flex flex-row items-center justify-center my-[12px] gap-x-[3px]">
            <span
              className={`flex items-center justify-center ${
                weekDays.includes(value) ? "text-[#e62a2f]" : ""
              }`}
            >
              {label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
