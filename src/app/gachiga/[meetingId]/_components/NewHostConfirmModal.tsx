import Image from "next/image";
import { MemberResponse } from "../../_types/MemberResponse";
import { usePutMeetingNewHost } from "@/core/hooks/usePutMeetings";

interface NewHostConfirmModalProps {
  setIsNewHostConfirmModalOpen: (value: boolean) => void;
  selectedMember: MemberResponse;
  accessToken: string | undefined;
  meetingId: number;
}

/**
 * @Description 방장 위임을 취소/확인하는 재확인 모달창
 * @author 김영서
 **/
export const NewHostConfirmModal = ({
  setIsNewHostConfirmModalOpen,
  selectedMember,
  accessToken,
  meetingId,
}: NewHostConfirmModalProps) => {
  //방장 위임 버튼을 눌렀을 때 API호출하는 함수
  const handleNewHost = async () => {
    try {
      const response = await usePutMeetingNewHost(
        accessToken,
        selectedMember.userId,
        meetingId
      );

      if (response) {
        alert(
          `모임의 방장 권한이 ${selectedMember.nickname}님에게 성공적으로 위임되었습니다.`
        );
        window.location.reload();
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
        setIsNewHostConfirmModalOpen(false);
      }}
    >
      <div
        className="bg-white rounded-[15px] shadow-lg w-[295px] h-[251px] relative cursor-default px-[15px] pt-[30px] pb-[20px] scrollable-container overflow-y-auto"
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
            {selectedMember.nickname}님에게
            <br />
            방장 권한을 위임하시겠어요?
          </span>
          <div className="mt-[40px] flex gap-x-[11px] w-full">
            <button
              className=" bg-[#eeeeee] flex items-center justify-center flex-1 py-[16px] rounded-lg"
              onClick={() => setIsNewHostConfirmModalOpen(false)}
            >
              <span className=" font-semibold text-[15px]">취소</span>
            </button>
            <button
              className="flex bg-[#e62a2f] items-center justify-center flex-1  py-[16px] rounded-lg"
              onClick={handleNewHost}
            >
              <span className=" font-semibold text-[15px] text-white">
                방장 위임
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
