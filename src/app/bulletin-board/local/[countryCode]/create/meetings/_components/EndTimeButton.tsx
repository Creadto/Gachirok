import { MeetingResponse } from "@/app/gachiga/_types/MeetingResponse";
import { FilterEndTimeDropdown } from "@/app/gachiga/local/[countryCode]/_components/FilterEndTimeDropdown";
import {
  ArrowDownIcon,
  ArrowDownIconColor,
} from "@/core/components/icons/ArrowDownIcon";
import {
  ArrowUpIcon,
  ArrowUpIconColor,
} from "@/core/components/icons/ArrowUpIcon";
import { useEffect, useRef, useState } from "react";
import { EndTimeDropdown } from "./EndTimeDropdown";

interface EndTimeButtonProps {
  endHour: number | null;
  endMinute: number | null;
  setEndHour:(hour: number | null) => void;
  setEndMinute:(minute: number | null) => void;
}

export const EndTimeButton = ({
  endHour, endMinute, setEndHour, setEndMinute
}: EndTimeButtonProps) => {
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  //종료시간
  // const [endHour, setEndHour] = useState<number | null>(null);
  // const [endMinute, setEndMinute] = useState<number | null>(null);

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

  // useEffect(() => {
  //   if (meetingData.meetingEndTime) {
  //     setEndHour(parseInt(meetingData.meetingEndTime.split(":")[0]));
  //     setEndMinute(parseInt(meetingData.meetingEndTime.split(":")[1]));
  //   }
  // }, [meetingData]);

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <div className="flex flex-row items-center justify-center">
        <button
        type="button"
          onClick={() => {
            setIsEndTimeOpen(!isEndTimeOpen);
          }}
          className="flex w-full border p-2 gap-x-[2px] border-gray-300 bg-white rounded-lg  h-[42px]"
        >
          <span className=" text-black my-auto ml-[7px]">
            {endHour}시 {endMinute}분
          </span>
        </button>
      </div>

      {/* 종료시간 드롭다운 */}
      {isEndTimeOpen && (
        <EndTimeDropdown
          endHour={endHour}
          endMinute={endMinute}
          setEndHour={setEndHour}
          setEndMinute={setEndMinute}
        />
      )}
    </div>
  );
};
