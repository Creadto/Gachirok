import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { useEffect, useRef, useState } from "react";
import { FilterDateDropdown } from "./FilterDateDropdown";

interface FilterDateButtonProps {
startDate: Date | undefined
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined
  setEndDate: (date: Date | undefined) => void;
}

export const FilterDateButton = ({
  startDate, setStartDate, endDate, setEndDate
}: FilterDateButtonProps) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsStartDateOpen(false); // 외부 클릭 시 드롭다운 닫기
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
            setIsStartDateOpen(!isStartDateOpen);
          }}
          className={`flex rounded-[50px] border  py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            startDate === undefined || endDate === undefined
              ? "border-[#eeeeee] bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${
              startDate === undefined || endDate === undefined ? "" : "text-[white]"
            }`}
          >
            기간
          </span>
          {isStartDateOpen ? (
           startDate === undefined || endDate === undefined ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) :startDate === undefined || endDate === undefined ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 시작날짜 드롭다운 */}
      {isStartDateOpen && (
        <FilterDateDropdown startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
      )}
    </div>
  );
};
