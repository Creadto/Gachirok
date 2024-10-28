import Image from "next/image";
import { PreGuestResponse } from "../../_types/PreGuestResponse";
import { useGetPreGuestReject } from "@/core/hooks/usePreGuest";

interface RejectConfirmModalProps {
  selectedPreGuest: PreGuestResponse;
  setIsRejectConfirmModalOpen: (value: boolean) => void;
  meetingId: number;
  accessToken: string | undefined;
}

/**
 * @Description 승인제 모임에 신청한 특정 게스트를 거절하기 전 재확인하는 모달
 * @author 김영서
 **/
export const RejectConfirmModal = ({
  selectedPreGuest,
  setIsRejectConfirmModalOpen,
  accessToken,
  meetingId,
}: RejectConfirmModalProps) => {
  // 거절버튼을 눌렀을 때 해당 사용자 승인
  const handleAccpetReject = async () => {
    try {
      const response = await useGetPreGuestReject(
        accessToken,
        meetingId,
        selectedPreGuest.userId
      );
      if (response) {
        alert(`${selectedPreGuest.nickname}님을 성공적으로 거절하였습니다.`);
        setIsRejectConfirmModalOpen(false);
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50  bg-black bg-opacity-50 cursor-default"
      onClick={(e) => {
        e.stopPropagation();
        setIsRejectConfirmModalOpen(false);
      }}
    >
      <div
        className="bg-white rounded-[15px] shadow-lg px-[15px] pt-[30px] pb-[15px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center">
          <Image
            src={selectedPreGuest.profilePhotoUrl}
            width={50}
            height={50}
            alt="Host Profile Photo"
            className="w-[50px] h-[50px] rounded-full object-cover flex items-center justify-center"
          />
          <span className="flex items-center justify-center mt-[10px] font-bold text-lg">
            {selectedPreGuest.nickname}님을 거절하시겠어요?
          </span>
          <div className="flex w-full gap-x-[11px] mt-[40px]">
            {/* 취소 버튼 */}
            <button
              className="flex-1 flex px-[50.5px] py-[16px] bg-[#eeeeee] rounded-lg"
              onClick={() => setIsRejectConfirmModalOpen(false)}
            >
              <span className="flex items-center justify-center font-semibold text-[15px]">
                취소
              </span>
            </button>

            {/* 해당 신청자 거절 */}
            <button
              className="flex-1 flex px-[50.5px] py-[16px] bg-black rounded-lg text-white"
              onClick={handleAccpetReject}
            >
              <span className="flex items-center justify-center font-semibold text-[15px]">
                거절
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
