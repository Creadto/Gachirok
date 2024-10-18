import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { FilterInterestsDropdown } from "./FilterInterestsDropdown";
import { useEffect, useRef, useState } from "react";

interface FilterInterestButtonProps {
  selectedInterests: string[];
  handleInterestClick: (interest: string) => void;
}

export const FilterInterestButton = ({
  selectedInterests,
  handleInterestClick,
}: FilterInterestButtonProps) => {
  const [isSelectedInterestsOpen, setIsSelectedInterestsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsSelectedInterestsOpen(false); // 외부 클릭 시 드롭다운 닫기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={() => {
            setIsSelectedInterestsOpen(!isSelectedInterestsOpen);
          }}
          className={`flex rounded-[50px] border  py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            selectedInterests.length === 0
              ? "border-[#eeeeee] bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${
              selectedInterests.length === 0 ? "" : "text-[white]"
            }`}
          >
            관심분야
          </span>
          {isSelectedInterestsOpen ? (
            selectedInterests.length === 0 ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) : selectedInterests.length === 0 ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 관심분야 드롭다운 */}
      {isSelectedInterestsOpen && (
        <FilterInterestsDropdown
          selectedInterests={selectedInterests}
          handleInterestClick={handleInterestClick}
        />
      )}
    </div>
  );
};
