// components/DateTimePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";

// Props 타입 정의
interface SingleDateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  name: string;
}

/**
 * @Description 날짜/시간을 선택하게 해줄 수 있는 Dropdown 컴포넌트
 * @author 김영서
 **/
const SingleDateSelector: React.FC<SingleDateSelectorProps> = ({
  selectedDate,
  onDateChange,
  register,
  errors,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* 날짜 선택 */}
      <div className="relative">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <DatePicker
            {...register(`${name}`, { required: true })}
            selected={selectedDate}
            onChange={(date) => onDateChange(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full border-none outline-none text-base"
            placeholderText="입주날짜를 선택해주세요."
          />
        </div>
        {errors.meetingDate && (
          <p className="text-red-500">날짜는 필수항목입니다.</p>
        )}
      </div>
    </div>
  );
};

export default SingleDateSelector;
