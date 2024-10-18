import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { useEffect, useRef, useState } from "react";
import { FilterAgeDropdown } from "./FilterAgeDropdown";

interface FilterAgeButtonProps {
  startAge: string;
  endAge: string;
  onRangeChange: (min: string, max: string) => void; // 새로운 prop 추가
}

export const FilterAgeButton = ({
  startAge,
  endAge,
  onRangeChange,
}: FilterAgeButtonProps) => {
  const [isAgeOpen, setIsAgeOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsAgeOpen(false); // 외부 클릭 시 드롭다운 닫기
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
        type="button"
          onClick={() => {
            setIsAgeOpen(!isAgeOpen);
          }}
          className={`flex rounded-[50px] border py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            startAge === "20" && endAge === "60"
              ? "border-[#eeeeee]  bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${
              startAge === "20" && endAge === "60" ? "" : "text-[white]"
            }`}
          >
            모집연령
          </span>
          {isAgeOpen ? (
            startAge === "20" && endAge === "60" ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) : startAge === "20" && endAge === "60" ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 모집연령 드롭다운 */}
      {isAgeOpen && (
        <FilterAgeDropdown
          onRangeChange={onRangeChange}
          startAge={startAge}
          endAge={endAge}
        />
      )}
    </div>
  );
};
