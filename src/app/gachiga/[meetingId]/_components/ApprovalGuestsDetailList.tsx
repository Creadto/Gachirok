import { BlueCheckIcon } from "@/core/components/icons/create-profile/CheckIcon";
import { PreGuestResponse } from "../../_types/PreGuestResponse";
import Image from "next/image";

interface ApprovalGuestsDetailListprops {
  guest: PreGuestResponse;
  setSelectedPreGuest: (value: PreGuestResponse) => void;
  setIsAnswerModalOpen: (value: boolean) => void;
  setIsAcceptConfirmModalOpen: (value: boolean) => void;
  setIsRejectConfirmModalOpen: (value: boolean) => void;
}

/**
 * @Description 모임 신청 내역에서 출력되는 게스트 데이터에 관한 컴포넌트
 * @author 김영서
 **/
export const ApprovalGuestsDetailList = ({
  guest,
  setIsAnswerModalOpen,
  setSelectedPreGuest,
  setIsAcceptConfirmModalOpen,
  setIsRejectConfirmModalOpen,
}: ApprovalGuestsDetailListprops) => {
  return (
    <div className="flex flex-col">
      <div className="mt-[15px] flex gap-x-[15px]" key={guest.userId}>
        <Image
          src={guest.profilePhotoUrl}
          width={50}
          height={50}
          alt="Host Profile Photo"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-y-[2px]">
          <div className="flex gap-x-[5px] items-center">
            <span className="font-semibold text-[15px]">{guest.nickname}</span>
          </div>
          <span className="text-xs text-[#808080] text-start">
            {guest.introduction}
          </span>
        </div>
        <button
          className="flex justify-center items-center ml-auto px-[12px] py-[8px] border border-[#eeeeee] rounded-[50px] my-[9px]"
          onClick={() => {
            setSelectedPreGuest(guest);
            setIsAnswerModalOpen(true);
          }}
        >
          <span className="text-xs flex items-center justify-center">
            답변보기
          </span>
        </button>
      </div>
      <div className="ml-[65px] flex gap-x-[5px]">
        {/* 수락 / 거절 버튼 */}
        {guest.status === "wait" && (
          <>
            <button
              className="text-white px-[10px] py-[7px] items-center justify-center bg-[#e62a2f] rounded-[5px] flex"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPreGuest(guest);
                setIsAcceptConfirmModalOpen(true);
              }}
            >
              <span className="text-xs">수락</span>
            </button>
            <button
              className=" px-[10px] py-[7px] items-center justify-center border border-[##eeeeee] rounded-[5px] flex"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPreGuest(guest);
                setIsRejectConfirmModalOpen(true);
              }}
            >
              <span className="text-xs">거절</span>
            </button>
          </>
        )}

        {/* 수락 거절된 상태 */}
        {guest.status === "reject" && (
          <span className="text-[13px] text-[#808080]">수락거절</span>
        )}

        {/* 수락된 상태 */}
        {guest.status === "accept" && (
          <div className="flex gap-x-[2px]">
            <span className="text-[13px] text-[#0676fc] flex items-center justify-center">
              수락됨
            </span>
            <div className="flex items-center justify-center py-[3px]">
              <BlueCheckIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
