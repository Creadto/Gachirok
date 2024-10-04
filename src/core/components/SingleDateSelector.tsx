// components/DateTimePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";

// Props 타입 정의
interface SingleDateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  name: string;
  placeholder: string;
  setValue: UseFormSetValue<any>;
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
  placeholder,
  setValue,
}) => {
  //입력받은 날짜를 API로 보내기 위한 데이터로 변환
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* 날짜 선택 */}
      <div className="relative">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <DatePicker
            {...register(`${name}`, { required: true })}
            selected={selectedDate}
            onChange={(date) => {
              onDateChange(date);
              if (date) {
                setValue(name, formatDate(date));
              }
            }}
            dateFormat="yyyy-MM-dd"
            className="w-full border-none outline-none text-base"
            placeholderText={placeholder}
          />
        </div>
        {errors[name] && <p className="text-red-500">날짜는 필수항목입니다.</p>}
      </div>
    </div>
  );
};

export default SingleDateSelector;
