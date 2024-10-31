import Image from "next/image";
import { MemberResponse } from "../../_types/MemberResponse";
import { usePutMeetingNewHost } from "@/core/hooks/usePutMeetings";
import { usePutGuestExile } from "@/core/hooks/useGuest";

interface ExileGuestConfirmModalProps {
  setIsMemberManageModalOpen: (value: boolean) => void;
  setIsExileGuestModalOpen: (value: boolean) => void;
  selectedMember: MemberResponse;
  accessToken: string | undefined;
  meetingId: number;
}

/**
 * @Description 멤버의 추방을 취소/확인하는 재확인 모달창
 * @author 김영서
 **/
export const ExileGuestConfirmModal = ({
  setIsMemberManageModalOpen,
  setIsExileGuestModalOpen,
  selectedMember,
  accessToken,
  meetingId,
}: ExileGuestConfirmModalProps) => {
  //방장 위임 버튼을 눌렀을 때 API호출하는 함수
  const handleExileGuest = async () => {
    try {
      const response = await usePutGuestExile(
        accessToken,
        meetingId,
        selectedMember.userId
      );

      if (response) {
        alert(
          `${selectedMember.nickname}님이 모임에서 성공적으로 추방되었습니다.`
        );
        window.location.reload();
        // setIsExileGuestModalOpen(false)
        // setIsMemberManageModalOpen(false);
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-default"
      onClick={(e) => {
        e.stopPropagation();
        setIsExileGuestModalOpen(false);
      }}
    >
      <div
        className="bg-white rounded-[15px] shadow-lg w-[295px] relative cursor-default px-[15px] pt-[30px] pb-[20px] scrollable-container overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex  items-center justify-center flex-col">
          <Image
            src={selectedMember.profilePhotoUrl}
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover rounded-full"
            alt="Profile Photo"
          />
          <span className="flex mt-[10px] font-bold text-lg">
            {selectedMember.nickname}님을
            <br />
            모임에서 추방하시겠어요?
          </span>
          <div className="mt-[40px] flex gap-x-[11px] w-full">
            <button
              className=" bg-[#eeeeee] flex items-center justify-center flex-1 py-[16px] rounded-lg"
              onClick={() => setIsExileGuestModalOpen(false)}
            >
              <span className=" font-semibold text-[15px]">취소</span>
            </button>
            <button
              className="flex bg-[#e62a2f] items-center justify-center flex-1  py-[16px] rounded-lg"
              onClick={handleExileGuest}
            >
              <span className=" font-semibold text-[15px] text-white">
                멤버 추방
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
