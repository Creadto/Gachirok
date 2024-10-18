// components/DateTimePicker.tsx
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { ko } from "date-fns/locale"; // date-fns의 한국어 로케일

// Props 타입 정의
interface DoubleDateTimeSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  selectedStartTime: string;
  selectedEndTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

/**
 * @Description 날짜/시간을 선택하게 해줄 수 있는 Dropdown 컴포넌트
 * @author 김영서
 **/
const DoubleDateTimeSelector: React.FC<DoubleDateTimeSelectorProps> = ({
  selectedDate,
  onDateChange,
  selectedStartTime,
  selectedEndTime,
  onStartTimeChange,
  onEndTimeChange,
  register,
  errors,
}) => {
  const [timeError, setTimeError] = useState<string | null>(null);

  useEffect(() => {
    // 시작시간과 종료시간에 대한 비교 / 종료시간이 시작시간보다 이르면 오류 출력
    if (selectedStartTime && selectedEndTime) {
      const [startHour, startMinute] = selectedStartTime.split(":").map(Number);
      const [endHour, endMinute] = selectedEndTime.split(":").map(Number);

      const startTime = new Date().setHours(startHour, startMinute);
      const endTime = new Date().setHours(endHour, endMinute);

      if (endTime <= startTime) {
        setTimeError("종료 시간은 시작 시간보다 늦어야 합니다.");
      } else {
        setTimeError(null);
      }
    }
  }, [selectedStartTime, selectedEndTime]);

  return (
    <div className="flex flex-row space-x-4">
      {/* 날짜 선택 */}
      <div className="w-full">
      <label className="block text-xs text-[#808080] mb-[10px]">날짜</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <DatePicker
            {...register("meetingDate", { required: true })}
            selected={selectedDate}
            onChange={(date) => onDateChange(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full border-none outline-none"
            placeholderText="날짜를 선택해주세요."
            locale={ko}
          />
        </div>
        {errors.meetingDate && (
          <p className="text-red-500">날짜는 필수항목입니다.</p>
        )}
      </div>

      {/* 시작 시간 선택 */}
      <div className="w-full">
      <label className="block text-xs text-[#808080] mb-[10px]">시작 시간</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaClock className="text-gray-500 mr-2" />
          <select
            className="w-full border-none outline-none"
            value={selectedStartTime}
            {...register("meetingStartTime", { required: true })}
            onChange={(e) => onStartTimeChange(e.target.value)}
          >
            <option value="">시간을 선택해주세요.</option>
            {Array.from({ length: 24 }, (_, hour) =>
              Array.from({ length: 2 }, (_, half) => {
                const formattedTime = `${hour < 10 ? `0${hour}` : hour}:${
                  half === 0 ? "00" : "30"
                }`;
                return (
                  <option key={formattedTime} value={formattedTime}>
                    {formattedTime}
                  </option>
                );
              })
            )}
          </select>
        </div>
        {errors.meetingStartTime && (
          <p className="text-red-500">시작 시간은 필수항목입니다.</p>
        )}
      </div>

      {/* 종료 시간 선택 */}
      <div className="w-full relative">
      <label className="block  text-xs text-[#808080] mb-[10px]">종료 시간</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaClock className="text-gray-500 mr-2" />
          <select
            className="w-full border-none outline-none"
            value={selectedEndTime}
            {...register("meetingEndTime", { required: true })}
            onChange={(e) => onEndTimeChange(e.target.value)}
          >
            <option value="">시간을 선택해주세요.</option>
            {Array.from({ length: 24 }, (_, hour) =>
              Array.from({ length: 2 }, (_, half) => {
                const formattedTime = `${hour < 10 ? `0${hour}` : hour}:${
                  half === 0 ? "00" : "30"
                }`;
                return (
                  <option key={formattedTime} value={formattedTime}>
                    {formattedTime}
                  </option>
                );
              })
            )}
          </select>
        </div>
        {errors.meetingEndTime && (
          <p className="text-red-500">종료 시간은 필수항목입니다.</p>
        )}
        {timeError && <p className="text-red-500">{timeError}</p>}
      </div>
    </div>
  );
};

export default DoubleDateTimeSelector;
