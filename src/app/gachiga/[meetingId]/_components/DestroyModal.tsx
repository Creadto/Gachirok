import CloseIcon from "@/core/components/icons/CloseIcon";
import {
  InterestSelectIcon,
  InterestUnselectIcon,
} from "@/core/components/icons/create-profile/InterestSelectIcon";
import { useDeleteMeetings } from "@/core/hooks/useDeleteMeetings";
import { useState } from "react";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { useRouter } from "next/navigation";

interface DestroyModalProps {
  setIsDestroyModalOpen: (value: boolean) => void;
  accessToken: string | undefined;
  meetingData: MeetingResponse
}

/**
 * @Description 멤버 없을 때 모임 폐쇄 시 뜨는 모달창
 * @author 김영서
 **/
export const DestroyModal = ({ setIsDestroyModalOpen, accessToken, meetingData }: DestroyModalProps) => {
  // 약관 동의 여부
  const [isAgreed, setisAgreed] = useState(false);
  const router = useRouter()

  const handleDestroyMeeting = async() => {
    const response = await useDeleteMeetings(accessToken, meetingData.meetingId);
    if(response) {
      alert("모임이 성공적으로 폐쇄되었습니다.")
      router.back();
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 cursor-default"
      onClick={() => setIsDestroyModalOpen(false)}
    >
      <div
        className="bg-white rounded-[10px] shadow-lg w-[550px] h-[372px] relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 HEADER */}
        <div className="flex flex-row">
          <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
            <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
              모임 폐쇄
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsDestroyModalOpen(false)}
            className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 안내사항 */}
        <span className="text-lg font-semibold mt-[20px] pl-[15px] block text-start">
          모임 폐쇄는 들어온 멤버가
          <br />
          없을 시에만 가능합니다.
        </span>

        <hr className="items-center justify-center bg-[#EEEEEE] mt-[30px] mb-[30px] flex mx-[15px]" />

        {/* 동의 버튼 */}
        <button
          className="flex ml-[15px] gap-x-[10px]"
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
          모임을 폐쇄하더라도 포인트는 환불되지 않습니다.
        </span>
        <span className="block mt-[5px] mx-[15px] text-[13px] text-[#808080] break-keep text-start">
          모임을 폐쇄하더라도 포인트는 환불되지 않는다는 사실을 인지하였습니다.
        </span>

        {/* 다음 버튼 */}
        <div className="mt-[30px] mx-[15px] mb-[15px]">
          <button
            onClick={handleDestroyMeeting}
            className=" bg-black flex py-[16px] w-full  items-center justify-center rounded-[15px] disabled:bg-[#a3a3a3]"
            disabled={!isAgreed}
          >
            <span className="text-white flex items-center justify-center">
              모임 폐쇄하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
