import Image from "next/image";
import { useEffect, useState } from "react";
import { start } from "repl";

interface FilterEndTimeDropdownProps {
  endHour: number | null;
  endMinute: number | null;
  setEndHour: (hour: number | null) => void;
  setEndMinute: (minute: number | null) => void;
}

export const FilterEndTimeDropdown = ({

  endHour, setEndHour, setEndMinute, endMinute
}: FilterEndTimeDropdownProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i + 0); // 12시부터 35시까지 생성
  const minutes = Array.from({ length: 60 }, (_, i) => i + 0); // 30부터 35까지 분 설정]

  useEffect(() => {
    console.log("endHour", endHour);
    console.log("startMinute", endMinute);
  }, [endHour, endMinute]);

  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[124px] h-[346px]  bg-white rounded-lg shadow-md">
      <span className="font-semibold px-[30px] py-[15px] text-sm flex items-center justify-center text-center whitespace-nowrap border-b border-[#eeeeee]">
        {endHour !== null && endMinute !== null
          ? `${endHour < 10 ? `0${endHour}` : endHour}:${
            endMinute === 0
                ? "00"
                : endMinute < 10
                ? `0${endMinute}`
                : endMinute
            }`
          : "시간대 선택"}
      </span>

      {/* 시간대 선택 */}
      <div className="flex flex-row overflow-hidden mb-[20px] mt-[10px]">
        <div className="flex flex-1 justify-center items-start overflow-y-auto">
          <div className="flex flex-col items-center justify-center w-[65px] ">
            <div className="flex flex-col gap-y-[16px] w-full px-[6px]">
              {hours.map((hour) => (
                <button
                  key={hour}
                  className={` w-full h-[24px] text-[13px] ${
                    hour === endHour ? "bg-[#ffe9ea]" : ""
                  }`}
                  onClick={() => setEndHour(hour)}
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-start overflow-y-auto">
          <div className="flex flex-col items-center justify-center w-[65px]">
            <div className="flex flex-col space-y-[16px] w-full px-[6px]">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  className={`w-full h-[24px] text-[13px] ${
                    minute === endMinute ? "bg-[#ffe9ea]" : ""
                  }`}
                  onClick={() => setEndMinute(minute)} // 12시를 고정하고 분만 선택
                >
                  {minute}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 선택 완료 버튼 */}
      {/* {selectedTime && (
          <div className="mt-4 text-center">
            <p>선택한 시간: {selectedTime}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
              선택 완료
            </button>
          </div>
        )} */}
    </div>
  );
};
