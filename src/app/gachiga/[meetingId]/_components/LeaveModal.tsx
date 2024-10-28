import CloseIcon from "@/core/components/icons/CloseIcon";
import {
  InterestSelectIcon,
  InterestUnselectIcon,
} from "@/core/components/icons/create-profile/InterestSelectIcon";
import { GreenCheckIcon } from "@/core/components/icons/GreenCheckIcon";
import { usePutMeetingLeave } from "@/core/hooks/usePutMeetings";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LeaveModalProps {
  setIsLeaveModalOpen: (value: boolean) => void;
  meetingId: number;
  accessToken: string | undefined;
}

export const LeaveModal = ({
  setIsLeaveModalOpen,
  meetingId,
  accessToken
}: LeaveModalProps) => {
  // 약관 동의 여부
  const [isAgreed, setisAgreed] = useState(false);
  const router = useRouter();

  const handleLeaveModal = async() => {
    try{
      const response = await usePutMeetingLeave(accessToken, meetingId);

      if(response) {
        alert("모임에서 정상적으로 나가졌습니다.")
        router.back();
        
      }
    } catch(error) {
      console.error(error)
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 cursor-default"
      onClick={() => setIsLeaveModalOpen(false)}
    >
      <div
        className="bg-white rounded-[10px] shadow-lg w-[550px] h-[657px] relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 HEADER */}
        <div className="flex flex-row">
          <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
            <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
              모임 나가기
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsLeaveModalOpen(false)}
            className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 안내사항 */}
        <span className="text-lg font-semibold mt-[20px] pl-[15px] block text-start">
          모임을 나가기 전에 <br />
          아래의 사항을 함께 지켜주세요
        </span>

        <div className="mt-[30px]">
          <div className="flex flex-col gap-y-[10px] mx-[15px]">
            <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
              <GreenCheckIcon />
              <span className="text-sm block text-start">
                모임 나가기 전, 미리 다른 멤버에게 방장 권한을 위임해주세요.
                <br />
                방장 권한을 위임하지 않고 나갈 시, 방장은 멤버들 중 랜덤으로
                정해집니다.
              </span>
            </div>
            <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
              <GreenCheckIcon />
              <span className="text-sm block text-start">
                모임 나가기 전, 미리 단체 채팅방을 통해
                <br />
                다르 멤버들에게 참가 취소 사항을 알려주세요.
              </span>
            </div>
            <div className="rounded-[15px] p-[15px] bg-[#f6f6f6] flex gap-x-[10px]">
              <GreenCheckIcon />
              <span className="text-sm block text-start">
                모임의 참가를 취소하는 이유를 분명히 밝혀,
                <br />
                서로간의 오해가 없도록 해주세요.
              </span>
            </div>
          </div>
        </div>

        {/* 동의 버튼 */}
        <button
          className="flex mt-[65px] ml-[15px] gap-x-[10px]"
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
          모임을 나가더라도 포인트는 환불되지 않습니다.
        </span>
        <span className="block mt-[5px] mx-[15px] text-[13px] text-[#808080] break-keep text-start">
          다른 참가 인원들에게 취소 사실을 알렸으며, 모임을 나가더라도 포인트는
          환불되지 않는다는 사실을 인지하였습니다.
        </span>

        {/* 다음 버튼 */}
        <div className="mt-[30px] mx-[15px] mb-[15px]">
          <button
            onClick={handleLeaveModal}
            className=" bg-black flex py-[16px] w-full  items-center justify-center rounded-[15px] disabled:bg-[#a3a3a3]"
            disabled={!isAgreed}
          >
            <span className="text-white flex items-center justify-center">
              다음
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
