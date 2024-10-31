import { interestsOptions } from "@/core/types/InterestsAndExpertisesOptions";
import Image from "next/image";

interface FilterInterestsDropdownProps {
selectedInterests: string[];
handleInterestClick: (interest : string) => void;
}

export const FilterInterestsDropdown = ({selectedInterests, handleInterestClick}: FilterInterestsDropdownProps) => {
  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[200px] bg-white rounded-lg shadow-md">
      {interestsOptions.map(({ label, value, icon }) => (
        <button
          type="button"
          className="flex items-center cursor-pointer border-b border-[#eeeeee] mx-[12px] "
          key={value}
          onClick={() => handleInterestClick(value)}
        >
          <div
            className={`w-[14px] h-[14px] flex items-center justify-center  rounded-full border mr-[8px] ${
              selectedInterests.includes(value)
                ? "border-[#e62a2f]"
                : " bg-white border-[#dddddd]"
            }  `}
          >
            {/* 동그라미 버튼 */}
            <div
              className={`w-[8px] h-[8px]  rounded-full ${
                selectedInterests.includes(value) ? "bg-[#e62a2f]" : ""
              }`}
            ></div>
          </div>

          {/* 아이콘 + 설명 */}
          <div className="flex flex-row items-center justify-center my-[12px] gap-x-[3px]">
            {icon && (
              <Image width={14} height={14} src={icon} alt={`${label} icon`} />
            )}
            <span
              className={`flex items-center justify-center ${
                selectedInterests.includes(value) ? "text-[#e62a2f]" : ""
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
