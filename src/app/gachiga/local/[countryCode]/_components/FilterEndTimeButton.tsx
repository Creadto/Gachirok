import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { useEffect, useRef, useState } from "react";
import { FilterEndTimeDropdown } from "./FilterEndTimeDropdown";

interface FilterEndTimeButtonProps {
  endHour: number | null;
  endMinute: number | null;
  setEndHour: (hour: number | null) => void;
  setEndMinute: (minute: number | null) => void;
}

export const FilterEndTimeButton = ({
  endHour,
  setEndHour,
  setEndMinute,
  endMinute,
}: FilterEndTimeButtonProps) => {
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsEndTimeOpen(false); // 외부 클릭 시 드롭다운 닫기
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
            setIsEndTimeOpen(!isEndTimeOpen);
          }}
          className={`flex rounded-[50px] border py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            endHour === null || endMinute === null
              ? "border-[#eeeeee] bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${
              endHour === null || endMinute === null ? "" : "text-[white]"
            }`}
          >
            종료시간
          </span>
          {isEndTimeOpen ? (
            endHour === null || endMinute === null ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) : endHour === null || endMinute === null ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 종료시간 드롭다운 */}
      {isEndTimeOpen && (
        <FilterEndTimeDropdown
          endHour={endHour}
          endMinute={endMinute}
          setEndHour={setEndHour}
          setEndMinute={setEndMinute}
        />
      )}
    </div>
  );
};
