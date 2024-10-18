import Image from "next/image";
import { useEffect, useState } from "react";
import { FilterAgeButton } from "./FilterAgeButton";
import { FilterApprovalButton } from "./FilterApprovalButton";
import { FilterCostButton } from "./FilterCostButton";
import { FilterDateButton } from "./FilterDateButton";
import { FilterEndTimeButton } from "./FilterEndTimeButton";
import { FilterInterestButton } from "./FilterInterestsButton";
import { FilterSexTypesButton } from "./FilterSexTypesButton";
import { FilterSlotButton } from "./FilterSlotButton";
import { FilterStartTimeButton } from "./FilterStartTimeButton";
import { FilterWeekDaysButton } from "./FilterWeekDaysButton";
import { useGetFilteredMeetings } from "@/core/hooks/useGetMeetings";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

interface FilterSectionProps {
  countryCode: string;

}

export const FilterSection = ({countryCode} : FilterSectionProps) => {
  const router = useRouter();
  const {data: session} = useSession();

  // 제목 검색
  const [searchContent, setSearchContent] = useState<string | null>(null);

  //관심 분야
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  //지참비용
  const [cost, setCost] = useState<boolean | null>(null);

  //모집방식
  const [approval, setApproval] = useState<boolean | null>(null);

  //모집인원
  const [sexType, setSexType] = useState<string | null>(null);

  //최소연령
  const [startAge, setStartAge] = useState<string>("20");
  //최대연령
  const [endAge, setEndAge] = useState<string>("60");

  //잔여석 수
  const [slot, setSlot] = useState<number>(0);
  //이후 string으로 변환해야함

  //시작날짜
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  //종료날짜
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  //시작시간
  const [startHour, setStartHour] = useState<number | null>(null);
  const [startMinute, setStartMinute] = useState<number | null>(null);

  //종료시간
  const [endHour, setEndHour] = useState<number | null>(null);
  const [endMinute, setEndMinute] = useState<number | null>(null);

  //모집요일
  const [weekDays, setWeekDays] = useState<string[]>([]);

  // 관심분야 선택 로직
  const handleInterestClick = (value: string) => {
    setSelectedInterests((prev) => {
      const newSelectedInterests = prev.includes(value)
        ? prev.filter((interest) => interest !== value) // 이미 선택된 경우 제거
        : [...prev, value]; // 새로 선택된 경우 추가

      return newSelectedInterests;
    });
  };

  //모집요일을 선택 로직
  const handleDaysOfWeek = (value: string) => {
    setWeekDays((prev) => {
      const newWeekDays = prev.includes(value)
        ? prev.filter((weekDays) => weekDays !== value) // 이미 선택된 경우 제거
        : [...prev, value]; // 새로 선택된 경우 추가

      return newWeekDays;
    });
  };

  const onRangeChange = (min: string, max: string) => {
    setStartAge(min);
    setEndAge(max);
  };

  //초기화 버튼 클릭 로직
  const handleResetClick = () => {
    setSearchContent(null);
    setSelectedInterests([]);
    setCost(null);
    setApproval(null);
    setSexType(null);
    setStartAge("20");
    setEndAge("60");
    setSlot(0);
    setStartDate(undefined);
    setEndDate(undefined);
    setStartHour(null);
    setStartMinute(null);
    setEndHour(null);
    setEndMinute(null);
    setWeekDays([]);
  };

    //API Request의 형식에 맞게 날짜 format 바꾸기
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
      const day = date.getDate();
      return `${year}년 ${month}월 ${day}일`; //API로 보내는 형식
    };

      //API Request의 형식에 맞게 시간 format 바꾸기
  const formatTime = (startHour: number, startMinute: number): string => {
    const hours = startHour.toString(); // 앞의 '0' 제거
    const minutes = startMinute.toString(); //앞의 '0' 제거
    return `${hours}시 ${minutes}분`;
  };

  const handleFilterClick = async() => {
    const params = new URLSearchParams();

    if (countryCode) params.set("countryCode", countryCode);
    if (searchContent !== null) params.set("title", searchContent);
    if (weekDays.length > 0) params.set("daysOfWeek", weekDays.join(","));
    if (selectedInterests.length > 0)
      params.set("interests", selectedInterests.join(","));
    if (slot !== null) params.set("slot", slot.toString());
    if (cost !== null) params.set("costly", cost.toString());
    if (approval !== null) params.set("approval", approval.toString());
    if (sexType !== null) params.set("sexType", sexType);
    if (startAge !== null) params.set("startAge", startAge);
    if (endAge != null) params.set("endAge", endAge);
    if (startDate !== undefined)
      params.set("meetingStartDate", formatDate(startDate));
    if (endDate !== undefined) params.set("meetingEndDate", formatDate(endDate));
    if (startHour !== null && startMinute !== null)
      params.set("meetingStartTime", formatTime(startHour, startMinute));
    if (endHour !== null && endMinute !== null) params.set("meetingEndTime", formatTime(endHour, endMinute));

    try {
      if (session?.accessToken) {
        const response = await useGetFilteredMeetings(
          session.accessToken,
          params.toString()
        );
        //sessionStorage 초기화
        sessionStorage.removeItem("meetings");
        //sessionStorage에 새로운 데이터 넣기
        sessionStorage.setItem("meetings", JSON.stringify(response));
        //필터적용이 된 페이지로 이동
        router.push(`/gachiga/local?${params.toString()}`);
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  useEffect(() => {
    console.log("start", startAge);
    console.log("end", endAge);
  }, [startAge, endAge]);

  return (
    <div className="flex mt-5 text-xs gap-x-[5px] w-full">
      {/* 초기화 버튼 */}

      <button
        className="flex items-center justify-center rounded-[50px] py-[9px] pl-[8px] pr-[12px] gap-x-[5px] bg-white  "
        onClick={handleResetClick}
        disabled={
          !(
            searchContent !== null ||
            selectedInterests.length !== 0 ||
            cost !== null ||
            approval !== null ||
            sexType !== null ||
            (startAge !== "20" && endAge !== "60") ||
            slot !== 0 ||
            startDate !== undefined ||
            endDate !== undefined ||
            startHour !== null ||
            startMinute !== null ||
            endHour !== null ||
            endMinute !== null ||
            weekDays.length !== 0
          )
        }
      >
        <Image
          width={16}
          height={16}
          src="/images/icons/reset.webp"
          alt="Reset"
        />
        <span className="text-[13px] ">초기화</span>
      </button>

      {/* 제목 */}
      <div className=" flex flex-row items-center justify-center gap-x-[3px]">
        <input
          placeholder="검색항목을 입력해주세요"
          onChange={(e) =>
            setSearchContent(e.target.value === "" ? null : e.target.value)
          }
          className="flex border border-[#eeeeee] rounded-[50px] bg-white  py-[9px] pl-[12px] pr-[8px] gap-x-[2px] text-[13px] "
        />
      </div>

      {/* 관심분야 필터 */}
      <FilterInterestButton
        selectedInterests={selectedInterests}
        handleInterestClick={handleInterestClick}
      />

      {/*  지침비용 */}
      <FilterCostButton cost={cost} setCost={setCost} />

      {/* 모집방식 */}
      <FilterApprovalButton approval={approval} setApproval={setApproval} />

      {/* 모집성별 */}
      <FilterSexTypesButton sexType={sexType} setSexType={setSexType} />

      {/* 모집연령 */}
      <FilterAgeButton
        startAge={startAge}
        endAge={endAge}
        onRangeChange={onRangeChange}
      />

      {/* 잔여석 수 */}
      <FilterSlotButton slot={slot} setSlot={setSlot} />

      {/* 기간 */}
      <FilterDateButton
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* 시작시간 */}
      <FilterStartTimeButton
        startHour={startHour}
        setStartHour={setStartHour}
        startMinute={startMinute}
        setStartMinute={setStartMinute}
      />

      {/* 종료시간 */}
      <FilterEndTimeButton
        endHour={endHour}
        endMinute={endMinute}
        setEndHour={setEndHour}
        setEndMinute={setEndMinute}
      />

      {/* 모집요일 */}
      <FilterWeekDaysButton
        weekDays={weekDays}
        handleDaysOfWeek={handleDaysOfWeek}
      />

      {/* 필터 적용하기 버튼 */}
      {searchContent !== null ||
      selectedInterests.length !== 0 ||
      cost !== null ||
      approval !== null ||
      sexType !== null ||
      (startAge !== "20" && endAge !== "60") ||
      slot !== 0 ||
      startDate !== undefined ||
      endDate !== undefined ||
      startHour !== null ||
      startMinute !== null ||
      endHour !== null ||
      endMinute !== null ||
      weekDays.length !== 0 ? (
        <div className="flex items-center justify-center ml-auto">
          <button className="flex rounded-[50px] border bg-[#ffe9ea] py-[9px] pl-[15px] pr-[12px] gap-x-[2px] text-[#e62a2f] font-bold" onClick={handleFilterClick}>
            필터 적용하기
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
