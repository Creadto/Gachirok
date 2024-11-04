import CloseIcon from "@/core/components/icons/CloseIcon";
import {
  InterestSelectIcon,
  InterestUnselectIcon,
} from "@/core/components/icons/create-profile/InterestSelectIcon";
import { GreenCheckIcon } from "@/core/components/icons/GreenCheckIcon";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { useState } from "react";

interface JoinModalCommon {
  setIsJoinModalOpen: (value: boolean) => void;
  meetingData: MeetingResponse;
  setIsReplyModalOpen: (value: boolean) => void;
  setIsPurchaseModalOpen: (value: boolean) => void;
}

/**
 * @Description 공통적으로 뜨는 참여하기 모달 창
 * @author 김영서
 **/
export const JoinModalCommon = ({
  setIsJoinModalOpen,
  meetingData,
  setIsPurchaseModalOpen,
  setIsReplyModalOpen,
}: JoinModalCommon) => {
  const [isAgreed, setisAgreed] = useState(false);

  return (
    <div className="bg-white rounded-[10px] shadow-lg w-[550px] h-[657px] relative">
      {/* 모달 HEADER */}
      <div className="flex flex-row">
        <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
          <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
            참여하기
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsJoinModalOpen(false);
          }}
          className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
        >
          <CloseIcon />
        </button>
      </div>

      {/* 안내사항 */}
      <span className="text-lg font-semibold mt-[20px] pl-[15px] block">
        모임 참가 신청 하기 전에 <br />
        아래의 사항을 함께 지켜주세요
      </span>

      <div className="mt-[30px]">
        <div className="flex flex-col gap-y-[10px] mx-[15px]">
          <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
            <GreenCheckIcon />
            <span className="text-sm block">
              모임 참가 이후 단체 채팅방에 입정하게 됩니다.
              <br />
              채팅 매너를 지켜주세요.
            </span>
          </div>
          <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
            <GreenCheckIcon />
            <span className="text-sm block">
              다른 사람들의 의견도 가치있는 의견이니,
              <br />귀 기울여 함께 하는 가치있는 분들을 존중해 주세요.
            </span>
          </div>
          <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
            <GreenCheckIcon />
            <span className="text-sm block">
              모임 시작 전 다양한 이유로 모임의 참가를 취소하는 경우,
              <br />
              같이 있는 분들께 이유를 분명히 밝혀, 서로간의 오해가 없도록
              해주세요.
            </span>
          </div>
        </div>
      </div>

      {/* 동의 버튼 */}
      <button
        className="flex mt-[50px] ml-[15px] gap-x-[10px]"
        onClick={(e) => {
          e.stopPropagation();
          setisAgreed((prev) => !prev);
        }}
      >
        {isAgreed ? <InterestSelectIcon /> : <InterestUnselectIcon />}
        <span className="text-sm font-semibold">아래 사항에 동의합니다.</span>
      </button>

      {/* 동의내용 */}
      <span className="text-[13px] text-[#e62a2f] mt-[15px] ml-[15px] block">
        모임 참가를 취소하더라도 포인트는 환불되지 않습니다.
      </span>
      <span className="block mt-[5px] mx-[15px] text-[13px] text-[#808080] break-keep">
        위의 사실을 확인 하였으며, 모임참가를 취소하더라도 포인트는 환불되지
        않는 다는 사실을 인지 하였습니다. 무단으로 불참하거나, 함께하는 멤버들을
        존중하지 않고 피해를 주는 경우, 신고를 통해 가치가에 함께 하실 수
        없습니다.
      </span>

      {/* 다음 버튼 */}
      <div className="mt-[30px] mx-[15px] mb-[10px]">
        <button
          onClick={() =>
            meetingData.approval
              ? setIsReplyModalOpen(true)
              : setIsPurchaseModalOpen(true)
          }
          className=" bg-black flex py-[16px] w-full  items-center justify-center rounded-md disabled:bg-[#a3a3a3]"
          disabled={!isAgreed}
        >
          <span className="text-white flex items-center justify-center">
            다음
          </span>
        </button>
      </div>
    </div>
  );
};
