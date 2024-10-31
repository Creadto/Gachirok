import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { useEffect, useRef, useState } from "react";
import { FilterApprovalDropdown } from "./FilterApprovalDropdown";

interface FilterApprovalButtonProps {
  approval: boolean | null;
  setApproval: (value: boolean | null) => void;
}

export const FilterApprovalButton = ({
  approval,
  setApproval,
}: FilterApprovalButtonProps) => {
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsApprovalOpen(false); // 외부 클릭 시 드롭다운 닫기
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
            setIsApprovalOpen(!isApprovalOpen);
          }}
          className={`flex rounded-[50px] border  py-[9px] pl-[12px] pr-[8px] gap-x-[2px] ${
            approval === null
              ? "border-[#eeeeee] bg-white"
              : "border-[#e62a2f] bg-[#e62a2f]"
          }`}
        >
          <span
            className={`text-[13px] ${approval === null ? "" : "text-[white]"}`}
          >
            모집방식
          </span>
          {isApprovalOpen ? (
            approval === null ? (
              <ArrowUpIcon />
            ) : (
              <ArrowUpIconColor color="white" />
            )
          ) : approval === null ? (
            <ArrowDownIcon />
          ) : (
            <ArrowDownIconColor color="white" />
          )}
        </button>
      </div>

      {/* 지참비용 드롭다운 */}
      {isApprovalOpen && (
        <FilterApprovalDropdown approval={approval} setApproval={setApproval} />
      )}
    </div>
  );
};
