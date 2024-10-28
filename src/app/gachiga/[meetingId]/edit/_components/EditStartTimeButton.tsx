import { MeetingResponse } from "@/app/gachiga/_types/MeetingResponse";
import { FilterStartTimeDropdown } from "@/app/gachiga/local/[countryCode]/_components/FilterStartTimeDropdown";
import { useEffect, useRef, useState } from "react";
import { EditStartTimeDropdown } from "./EditStartTimeDropdown";

interface EditStartTimeButtonProps {
  meetingData: MeetingResponse;
  startHour: number | null;
  startMinute: number | null;
  setStartHour: (hour: number | null) => void;
  setStartMinute: (minute: number | null) => void;
}

export const EditStartTimeButton = ({
  meetingData,
  startHour, startMinute, setStartHour, setStartMinute
}: EditStartTimeButtonProps) => {
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 ref

  //시작시간
  // const [startHour, setStartHour] = useState<number | null>(null);
  // const [startMinute, setStartMinute] = useState<number | null>(null);

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

  useEffect(() => {
    if (meetingData.meetingStartTime) {
      setStartHour(parseInt(meetingData.meetingStartTime.split(":")[0]));
      setStartMinute(parseInt(meetingData.meetingStartTime.split(":")[1]));
    }
  }, [meetingData]);

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <div className="flex flex-row items-center justify-center">
        <button
        type="button"
          onClick={() => {
            setIsStartTimeOpen(!isStartTimeOpen);
          }}
          className="flex w-full border p-2 gap-x-[2px] border-gray-300 bg-white rounded-lg  h-[42px]"
        >
          <span className=" text-black my-auto ml-[7px]">
            {startHour}시 {startMinute}분
          </span>
        </button>
      </div>

      {/* 시작시간 드롭다운 */}
      {isStartTimeOpen && (
        <EditStartTimeDropdown
          startHour={startHour}
          startMinute={startMinute}
          setStartHour={setStartHour}
          setStartMinute={setStartMinute}
        />
      )}
    </div>
  );
};
