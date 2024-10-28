import CloseIcon from "@/core/components/icons/CloseIcon";
import {
  InterestSelectIcon,
  InterestUnselectIcon,
} from "@/core/components/icons/create-profile/InterestSelectIcon";
import { GreenCheckIcon } from "@/core/components/icons/GreenCheckIcon";
import { useState } from "react";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { useDeleteGuestFromemMeeting } from "@/core/hooks/useGuest";

interface CancelModalProps {
  setIsCancelModalOpen: (value: boolean) => void;
  meetingData: MeetingResponse;
  accessToken: string | undefined;
}

/**
 * @Description 모임 참가 취소를 눌렀을 때 등장하는 모달
 * @author 김영서
 **/
export const CancelModal = ({
  setIsCancelModalOpen,
  meetingData,
  accessToken
}: CancelModalProps) => {
  // 약관 동의 여부
  const [isAgreed, setisAgreed] = useState(false);

  const handleCancelMeeting = async() => {
    const response = await useDeleteGuestFromemMeeting(accessToken, meetingData.meetingId);
    if(response) {
      alert("모임이 성공적으로 참가 취소되었습니다.")
      window.location.reload();
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 cursor-default"
      onClick={() => setIsCancelModalOpen(false)}
    >
      <div
        className="bg-white rounded-[10px] shadow-lg w-[550px] h-[657px] relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 HEADER */}
        <div className="flex flex-row">
          <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
            <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
              참가취소
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCancelModalOpen(false)}
            className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 안내사항 */}
        <span className="text-lg font-semibold mt-[20px] pl-[15px] block text-start">
          참가취소 하기 전에 <br />
          아래의 사항을 함께 지켜주세요
        </span>

        <div className="mt-[30px]">
          <div className="flex flex-col gap-y-[10px] mx-[15px]">
            <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
              <GreenCheckIcon />
              <span className="text-sm block text-start">
                모임 참가를 취소하기 전, 미리 단체 채팅방을 통해
                <br />
                다른 멤버들에게 참가 취소 사항을 알려주세요.
              </span>
            </div>
            <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
              <GreenCheckIcon />
              <span className="text-sm block text-start">
                모임의 참가를 취소하는 이유를 분명히 밝혀,
                <br />
                서로간의 오해가 없도록 해주세요
              </span>
            </div>
          </div>
        </div>

        {/* 동의 버튼 */}
        <button
          className="flex mt-[130px] ml-[15px] gap-x-[10px]"
          onClick={(e) => {
            e.stopPropagation();
            setisAgreed((prev) => !prev);
          }}
        >
          {isAgreed ? <InterestSelectIcon /> : <InterestUnselectIcon />}
          <span className="text-sm font-semibold">아래 사항에 동의합니다.</span>
        </button>

        {/* 동의내용 */}
        <span className="text-[13px] text-[#e62a2f] mt-[15px] ml-[15px] block text-start">
          모임 참가를 취소하더라도 포인트는 환불되지 않습니다.
        </span>
        <span className="block mt-[5px] mx-[15px] text-[13px] text-[#808080] break-keep text-start">
          위의 사실을 확인 하였으며, 모임참가를 취소하더라도 포인트는 환불되지
          않는 다는 사실을 인지 하였습니다. 무단으로 불참하거나, 함께하는
          멤버들을 존중하지 않고 피해를 주는 경우, 신고를 통해 가치가에 함께
          하실 수 없습니다.
        </span>

        {/* 다음 버튼 */}
        <div className="mt-[30px] mx-[15px] mb-[15px]">
          <button
            onClick={handleCancelMeeting}
            className=" bg-black flex py-[16px] w-full  items-center justify-center rounded-[15px] disabled:bg-[#a3a3a3]"
            disabled={!isAgreed}
          >
            <span className="text-white flex items-center justify-center">
              참가 취소
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
