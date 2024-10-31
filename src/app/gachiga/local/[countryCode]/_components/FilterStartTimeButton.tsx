import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { useEffect, useRef, useState } from "react";
import { FilterCostDropdown } from "./FilterCostDropdown";
import { FilterSexTypesDropdown } from "./FilterSexTypesDropdown";
import { FilterStartTimeDropdown } from "./FilterStartTimeDropdown";

interface FilterStartTimeButtonProps {
  startHour: number | null;
  startMinute: number | null;
  setStartHour: (hour: number | null) => void;
  setStartMinute: (minute: number | null) => void;
}

export const FilterStartTimeButton = ({
  startHour,
  startMinute,
  setStartHour,
  setStartMinute,
}: FilterStartTimeButtonProps) => {
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsStartTimeOpen(false); // 외부 클릭 시 드롭다운 닫기
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
            setIsStartTimeOpen(!isStartTimeOpen);
          }}
          className={`flex rounded-[50px] border py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            startHour === null || startMinute === null
              ? "border-[#eeeeee]  bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${
              startHour === null || startMinute === null ? "" : "text-[white]"
            }`}
          >
            시작시간
          </span>
          {isStartTimeOpen ? (
            startHour === null || startMinute === null ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) : startHour === null || startMinute === null ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 시작시간 드롭다운 */}
      {isStartTimeOpen && (
        <FilterStartTimeDropdown
          startHour={startHour}
          startMinute={startMinute}
          setStartHour={setStartHour}
          setStartMinute={setStartMinute}
        />
      )}
    </div>
  );
};
