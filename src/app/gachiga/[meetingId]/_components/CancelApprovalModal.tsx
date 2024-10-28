import CloseIcon from "@/core/components/icons/CloseIcon";
import {
  InterestSelectIcon,
  InterestUnselectIcon,
} from "@/core/components/icons/create-profile/InterestSelectIcon";
import { GreenCheckIcon } from "@/core/components/icons/GreenCheckIcon";
import { useState } from "react";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { useDeleteGuestFromemMeeting, useDeletePreGuestFromMeeting } from "@/core/hooks/useGuest";

interface CancelApprovalModalProps {
  setIsCancelApprovalModalOpen: (value: boolean) => void;
  meetingData: MeetingResponse;
  accessToken: string | undefined;
}

/**
 * @Description 모임에 승인을 기다리고 있는 상태에서 참가 요청 취소 버튼을 눌렀을 때 등장하는 모달
 * @author 김영서
 **/
export const CancelApprovalModal = ({
  setIsCancelApprovalModalOpen,
  meetingData,
  accessToken
}: CancelApprovalModalProps) => {


  const handleCancelApprovalMeeting = async() => {
    const response = await useDeletePreGuestFromMeeting(accessToken, meetingData.meetingId);
    if(response) {
      alert("모임의 참가 요청이 성공적으로 취소되었습니다.")
      window.location.reload();
    }
  }

  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 cursor-default"
    onClick={() => setIsCancelApprovalModalOpen(false)}
  >
    <div
      className="bg-white rounded-[10px] shadow-lg w-[550px] relative cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 모달 HEADER */}
      <div className="flex flex-row">
        <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
          <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
            모임 참가 취소
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsCancelApprovalModalOpen(false)}
          className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
        >
          <CloseIcon />
        </button>
      </div>

      {/* 안내사항 */}
      <span className="text-lg font-semibold mt-[20px] pl-[15px] block text-start">
        지금 모임 참가 취소 시 해당 모임은 재참가가 불가합니다.
        <br />
         그래도 진행하시겠습니까?
      </span>

      <hr className="items-center justify-center bg-[#EEEEEE] mt-[20px] mb-[20px] flex mx-[15px]" />

      {/* 동의내용 */}
      <span className="text-[13px] text-[#e62a2f] mt-[10px] ml-[15px] block text-start">
        단, 호스트의 승인 전 모임 참가를 취소하면 코인은 환불됩니다.
      </span>
      {/* 다음 버튼 */}
      <div className="mt-[30px] mx-[15px] mb-[15px]">
        <button
          onClick={handleCancelApprovalMeeting}
          className=" bg-black flex py-[16px] w-full  items-center justify-center rounded-[15px] disabled:bg-[#a3a3a3]"
        >
          <span className="text-white flex items-center justify-center">
            모임 참가 요청 취소
          </span>
        </button>
      </div>
    </div>
  </div>
  );
};
