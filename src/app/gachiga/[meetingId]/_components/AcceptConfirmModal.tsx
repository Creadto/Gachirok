import Image from "next/image";
import { PreGuestResponse } from "../../_types/PreGuestResponse";
import { useGetPreGuestAccept } from "@/core/hooks/usePreGuest";

interface AcceptConfirmModalProps {
  selectedPreGuest: PreGuestResponse;
  setIsAcceptConfirmModalOpen: (value: boolean) => void;
  meetingId: number;
  accessToken: string | undefined
}

/**
 * @Description 승인제 모임에 신청한 특정 게스트를 거절하기 전 재확인하는 모달
 * @author 김영서
 **/
export const AcceptConfirmModal = ({
  selectedPreGuest,
  setIsAcceptConfirmModalOpen,
  accessToken, meetingId
}: AcceptConfirmModalProps) => {

  // 수락버튼을 눌렀을 때 해당 사용자 승인
  const handleAcceptConfirm = async() =>{
    try{
      const response = await useGetPreGuestAccept(accessToken, meetingId, selectedPreGuest.userId)
      if(response) {
        alert(`${selectedPreGuest.nickname}님을 성공적으로 수락하였습니다.`)
        setIsAcceptConfirmModalOpen(false);
      }
    }
    catch(error) {
      console.error("error")
    }
    
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-black bg-opacity-50  cursor-default"
    onClick={(e) => {
      e.stopPropagation();
      setIsAcceptConfirmModalOpen(false);
    }}>
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
            {selectedPreGuest.nickname}님을 수락하시겠어요?
          </span>
          <div className="flex w-full gap-x-[11px] mt-[40px]">

            {/* 취소 버튼 */}
            <button
              className="flex-1 flex px-[50.5px] py-[16px] bg-[#eeeeee] rounded-lg"
              onClick={() => setIsAcceptConfirmModalOpen(false)}
            >
              <span className="flex items-center justify-center font-semibold text-[15px]">
                취소
              </span>
            </button>

            {/* 해당 신청자 수락 */}
            <button className="flex-1 flex px-[50.5px] py-[16px] bg-[#e62a2f] rounded-lg text-white"
            onClick={handleAcceptConfirm}>
              <span className="flex items-center justify-center font-semibold text-[15px]">
                수락
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
