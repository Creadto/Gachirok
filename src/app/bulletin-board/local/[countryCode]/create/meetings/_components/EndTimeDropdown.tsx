
interface EndTimeDropdownProps {
  endHour: number | null;
  endMinute: number | null;
  setEndHour: (hour: number | null) => void;
  setEndMinute: (minute: number | null) => void;
}

export const EndTimeDropdown = ({
  endHour, setEndHour, setEndMinute, endMinute
}: EndTimeDropdownProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i + 0); // 12시부터 35시까지 생성
  const minutes = Array.from({ length: 60 }, (_, i) => i + 0); // 30부터 35까지 분 설정]


  return (
    <div className="absolute top-[50px] left-0 z-10 flex flex-col w-full h-[346px]  bg-white rounded-lg shadow-md border border-gray-300">

      {/* 시간대 선택 */}
      <div className="flex flex-row overflow-hidden mb-[20px] mt-[10px]">
        <div className="flex flex-1 justify-center items-start overflow-y-auto">
          <div className="flex flex-col items-center justify-center w-[65px] ">
            <div className="flex flex-col gap-y-[16px] w-full px-[6px]">
              {hours.map((hour) => (
                <button
                type="button"
                  key={hour}
                  className={` w-full h-[24px] ${
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
                type="button"
                  key={minute}
                  className={`w-full h-[24px] ${
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

    </div>
  );
};
