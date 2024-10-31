// components/DateTimePicker.tsx
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { ko } from "date-fns/locale"; // date-fns의 한국어 로케일
import { MeetingResponse } from "@/app/gachiga/_types/MeetingResponse";
import { EditStartTimeButton } from "./EditStartTimeButton";
import { EditEndTimeButton } from "./EditEndTimeButton";

// Props 타입 정의
interface EditDoubleDateTimeSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  meetingData: MeetingResponse;
  setValue: UseFormSetValue<any>;
  startHour: number | null;
  startMinute: number | null;
  setStartHour: (hour: number | null) => void;
  setStartMinute: (minute: number | null) => void;
  endHour: number | null;
  endMinute: number | null;
  setEndHour: (hour: number | null) => void;
  setEndMinute: (minute: number | null) => void;
}

/**
 * @Description 날짜/시간을 선택하게 해줄 수 있는 Dropdown 컴포넌트
 * @author 김영서
 **/
const EditDoubleDateTimeSelector: React.FC<EditDoubleDateTimeSelectorProps> = ({
  selectedDate,
  onDateChange,
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  endMinute,
  setEndHour,
  setEndMinute,

  register,
  errors,
  meetingData,
  setValue,
}) => {


  // meetingData를 초기값으로 설정
  useEffect(() => {
    if (meetingData.meetingDate) {
      setValue("meetingDate", meetingData.meetingDate);
      const formattedDateString = meetingData.meetingDate.replace(
        /(\d{4})\.(\d{2})\.(\d{2})\(.+\)/,
        "$1-$2-$3"
      );
      const formatDate = new Date(formattedDateString);
      onDateChange(formatDate);
    }
  }, [meetingData, setValue, onDateChange]);

  // useEffect(() => {
  //   if (selectedStartTime && selectedEndTime) {
  //     const [startHour, startMinute] = selectedStartTime.split(":").map(Number);
  //     const [endHour, endMinute] = selectedEndTime.split(":").map(Number);

  //     const startTime = new Date().setHours(startHour, startMinute);
  //     const endTime = new Date().setHours(endHour, endMinute);

  //     if (endTime <= startTime) {
  //       setTimeError("종료 시간은 시작 시간보다 늦어야 합니다.");
  //     } else {
  //       setTimeError(null);
  //     }
  //   }
  // }, [selectedStartTime, selectedEndTime]);

  return (
    <div className="flex flex-row justify-between w-full gap-x-[10px]">
      {/* 날짜 선택 */}
      <div className="flex flex-col flex-1">
        <label className="block text-xs text-[#808080] mb-[10px]">날짜</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2 h-[42px]">
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

      <div className="flex flex-1 flex-col">
        <label className="block text-xs text-[#808080] mb-[10px]">
          시작 시간
        </label>
        <EditStartTimeButton
          meetingData={meetingData}
          startHour={startHour}
          startMinute={startMinute}
          setStartHour={setStartHour}
          setStartMinute={setStartMinute}
        />
        {startHour === null || startMinute === null && (
           <p className="text-red-500">시작 시간은 필수항목입니다.</p>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <label className="block text-xs text-[#808080] mb-[10px]">
          시작 시간
        </label>
        <EditEndTimeButton
          meetingData={meetingData}
          endHour={endHour}
          endMinute={endMinute}
          setEndHour={setEndHour}
          setEndMinute={setEndMinute}
        />
        {endHour === null || endMinute === null && (
           <p className="text-red-500">종료 시간은 필수항목입니다.</p>
        )}
      </div>

    </div>
  );
};

export default EditDoubleDateTimeSelector;
