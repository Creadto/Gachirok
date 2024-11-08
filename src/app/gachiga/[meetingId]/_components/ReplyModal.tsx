import { BeforeIcon } from "@/core/components/icons/BackIcon";
import CloseIcon from "@/core/components/icons/CloseIcon";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { useState } from "react";
import { PurchaseModal } from "./PurchaseModal";
import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { PurchaseProfileResponse } from "@/app/profile/_types/PurchaseProfileResponse";

interface ReplyModalProps {
  meetingData: MeetingResponse;
  userPurchaseData: PurchaseProfileResponse | undefined;
  setIsReplyModalOpen: (value: boolean) => void;
  setIsJoinModalOpen: (value: boolean) => void;
  accessToken: string;
  setIsJoined: (value: boolean) => void;
}

/**
 * @Description 승인제일 경우 호스트가 지정한 질문에 답변하는 모달
 * @author 김영서
 **/
export const ReplyModal = ({
  meetingData,
  setIsReplyModalOpen,
  setIsJoinModalOpen,
  userPurchaseData,
  accessToken,
  setIsJoined
}: ReplyModalProps) => {
  const [replyValue, setReplyValue] = useState("");
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-[10px] shadow-lg w-[550px] h-[657px] relative">
      {isPurchaseModalOpen ? (
        <PurchaseModal
          setIsJoinModalOpen={setIsJoinModalOpen}
          setIsPurchaseModalOpen={setIsPurchaseModalOpen}
          meetingData={meetingData}
          userPurchaseData={userPurchaseData}
          acccessToken={accessToken}
          replyValue = {replyValue}
          setIsJoined={setIsJoined}
        />
      ) : (
        <>
          {/* 모달 HEADER */}
          <div className="flex flex-row">
            <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
              <button
                type="button"
                onClick={() => setIsReplyModalOpen(false)}
                className="absolute top-[15px] left-[15px] text-black hover:text-gray-800"
              >
                <BeforeIcon />
              </button>
              <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
                참가 답변하기
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
            >
              <CloseIcon />
            </button>
          </div>
          {/* 답변하기 안내 */}
          <span className="text-lg font-semibold mt-[20px] pl-[15px] block">
            모임 참가 신청 하기 전에 <br />
            호스트가 요청한 아래의 질문에 답변해주세요
          </span>
          <div className="mt-[30px]">
            <div className="flex flex-col gap-y-[10px] mx-[15px]">
              <span className="text-[13px] text-[#808080]">
                {meetingData.question}
              </span>
              <div className=" flex flex-col">
                <textarea
                  value={replyValue}
                  onChange={(e) => setReplyValue(e.target.value)}
                  placeholder="답변을 입력해주세요(6자 이상, 250자 이하)"
                  className="rounded-[15px] p-[15px] text-sm bg-[#f6f6f6] h-[300px]"
                  maxLength={250}
                />
                <span className="flex  items-end justify-end text-xs text-[#a3a3a3] mt-[10px]">
                  <span className="text-[#e62a2f]">{replyValue.length}</span>
                  /250
                </span>
              </div>
            </div>
          </div>
          {/* 다음버튼 */}
          <div className=" mx-[15px] mb-[15px] mt-[72px]">
            <button
              onClick={() => setIsPurchaseModalOpen(true)}
              className=" bg-black flex py-[16px] w-full  items-center justify-center rounded-[15px] disabled:bg-[#a3a3a3]"
              disabled={replyValue.length < 5}
            >
              <span className="text-white flex items-center justify-center">
                다음
              </span>
            </button>
          </div>
        </>
      )}

    </div>
  );
};
