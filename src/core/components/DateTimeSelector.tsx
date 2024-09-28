// components/DateTimePicker.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

// Props 타입 정의
interface DateTimeSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

/**
 * @Description 날짜/시간을 선택하게 해줄 수 있는 Dropdown 컴포넌트
 * @author 김영서
 **/
const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange
}) => {
  return (
    <div className="flex flex-col space-y-4">
      
      {/* 날짜 선택 */}
      <div className="relative">
        <label className="block text-gray-700 mb-1">날짜</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => onDateChange(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full border-none outline-none"
            placeholderText="날짜를 선택해주세요."
          />
        </div>
      </div>
      
      {/* 시간 선택 */}
      <div className="relative">
        <label className="block text-gray-700 mb-1">시간</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaClock className="text-gray-500 mr-2" />
          <select
            className="w-full border-none outline-none"
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
          >
            <option value="">시간을 선택해주세요.</option>
            {Array.from({ length: 24 }, (_, hour) => (
              Array.from({ length: 2 }, (_, half) => {
                const formattedTime = `${hour < 10 ? `0${hour}` : hour}:${half === 0 ? '00' : '30'}`;
                return (
                  <option key={formattedTime} value={formattedTime}>
                    {formattedTime}
                  </option>
                );
              })
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
