import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { useEffect, useRef, useState } from "react";
import { FilterSlotDropdown } from "./FilterSlotDropdown";

interface FilterSlotButtonProps {
  slot: number
  setSlot: (slot: number) => void;
}

export const FilterSlotButton = ({
  slot, setSlot
}: FilterSlotButtonProps) => {
  const [isSlotOpen, setIsSlotOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsSlotOpen(false); // 외부 클릭 시 드롭다운 닫기
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
            setIsSlotOpen(!isSlotOpen);
          }}
          className={`flex rounded-[50px] border py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            slot === 0
              ? "border-[#eeeeee]  bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${
              slot === 0 ? "" : "text-[white]"
            }`}
          >
            잔여석 수
          </span>
          {isSlotOpen ? (
            slot === 0 ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) : slot === 0 ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 잔여석 수 드롭다운 */}
      {isSlotOpen && (
       <FilterSlotDropdown slot={slot} setSlot={setSlot}/>
      )}
    </div>
  );
};
