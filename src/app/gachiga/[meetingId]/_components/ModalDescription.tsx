import { getCountryName } from "@/core/utils/handleCountryStateCityModify";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { sexTypes } from "@/core/types/DataForUI";
import { useState } from "react";
import { QuestioNMarkButton } from "@/core/components/icons/QuestionMarkButton";

interface ModalDescriptionProps {
  meetingData: MeetingResponse
}

/**
 * @Description 모달창에서 모임에 관한 정보를 포함하고 있는 부분
 * @author 김영서
 **/
export const ModalDescription = ({meetingData}: ModalDescriptionProps) => {

    // 힌트 버튼 열림 여부
    const [isHintOpen, setIsHintOpen] = useState(false);
    
  return (
    <>
      {/* 위치 */}
      <div className="flex flex-row">
        <label className="text-[#a3a3a3] text-sm">위치</label>
        <span className="text-sm ml-auto flex">
          {meetingData.location}, {getCountryName(meetingData.countryCode)}
        </span>
      </div>

      {/* 일시 */}
      <div className="flex flex-row">
        <label className="text-[#a3a3a3] text-sm">일시</label>
        {meetingData.meetingType === "ALWAYS" ? (
          <span className="text-sm ml-auto flex">언제나</span>
        ) : (
          <span className="text-sm ml-auto flex">
            {meetingData.meetingDate} {meetingData.meetingStartTime}
          </span>
        )}
      </div>

      {/* 모집인원 */}
      <div className="flex flex-row gap-x-[5px]">
        <label className="text-[#a3a3a3] text-sm">모집 인원</label>
        <span className="text-sm ml-auto flex">{meetingData.maxMember}명</span>
        <div className="w-[2px] h-[2px] bg-[#a3a3a3] flex items-center justify-center rounded-full my-auto"></div>
        <span className="text-sm">
          {sexTypes.find((type) => type.value === meetingData.sexType)?.label}
        </span>
      </div>

      {/* 모임비용 */}
      <div className="flex flex-row items-center justify-ce">
        <div className="flex gap-x-[5px] items-center relative">
          <span className="text-[#a3a3a3] text-sm">모임 비용</span>
          <button onClick={()=> setIsHintOpen((prev) => !prev)}>
            <QuestioNMarkButton />
          </button>
          {isHintOpen && (
            <>
              <div className="bg-black border-none rotate-45 absolute top-[90%] right-0 w-[10px] h-[10px]" />
              <div className="w-[261px] px-[12px] py-[10px] absolute bg-black top-[110%] rounded-[5px] left-0 ">
                <span className="text-[13px] text-white">
                  콘텐츠, 대관료, 재료비, 기타(맥주 및 안주비용 발생) 이 포함된
                  비용입니다.
                </span>
              </div>
            </>
          )}
        </div>
        {meetingData.cost === "없음" ? (
          <span className="flex ml-auto text-[13px]">없음</span>
        ) : (
          <span className="flex ml-auto text-[13px]">{meetingData.cost}</span>
        )}
      </div>
    </>
  );
};
