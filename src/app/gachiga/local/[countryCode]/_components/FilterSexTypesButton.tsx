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

interface FilterSexTypesButtonProps {
  sexType: string | null;
  setSexType: (value: string | null) => void;
}

export const FilterSexTypesButton = ({
  sexType,
  setSexType,
}: FilterSexTypesButtonProps) => {
  const [isSexTypeOpen, setIsSexTypeOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsSexTypeOpen(false); // 외부 클릭 시 드롭다운 닫기
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
            setIsSexTypeOpen(!isSexTypeOpen);
          }}
          className={`flex rounded-[50px] border py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            sexType === null
              ? "border-[#eeeeee]  bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${sexType === null ? "" : "text-[white]"}`}
          >
            모집인원
          </span>
          {isSexTypeOpen ? (
            sexType === null ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) : sexType === null ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 지참비용 드롭다운 */}
      {isSexTypeOpen && (
        <FilterSexTypesDropdown sexType={sexType} setSexType={setSexType} />
      )}
    </div>
  );
};
