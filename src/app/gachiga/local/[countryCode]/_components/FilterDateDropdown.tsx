import { ko } from "date-fns/locale"; // date-fns의 한국어 로케일
import DatePicker from "react-datepicker";

interface FilterDateDropdownProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export const FilterDateDropdown = ({
  startDate,
  setStartDate,
  setEndDate,
  endDate,
}: FilterDateDropdownProps) => {
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end && end < start) {
      setEndDate(start); // endDate를 startDate와 동일하게 설정
    } else {
      setStartDate(start ?? undefined); // null을 undefined로 처리
      setEndDate(end ?? undefined); // null을 undefined로 처리
    }
  };

  return (
    <div className="absolute top-[40px] left-0 z-10 flex flex-col w-[250px] bg-white rounded-lg shadow-md items-center justify-center py-[12px]">

        <DatePicker

        locale={ko}
        todayButton="오늘"
          selected={startDate} // null을 허용
          onChange={handleDateChange} // null을 처리
          startDate={startDate} // null을 허용
          endDate={endDate} // null을 허용
          selectsRange
          dateFormat="yyyy년 MM월 dd일"
          className="border rounded-md p-2 w-[230px]"
          inline={false} // 팝업 방식으로 표시
          isClearable
        />
      </div>
  );
};
