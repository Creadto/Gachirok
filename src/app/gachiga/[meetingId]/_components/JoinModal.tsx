import { useState } from "react";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { JoinModalCommon } from "./JoinModalCommon";
import { ReplyModal } from "./ReplyModal";
import { BeforeIcon } from "@/core/components/icons/BackIcon";
import CloseIcon from "@/core/components/icons/CloseIcon";
import { PurchaseModal } from "./PurchaseModal";
import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";

interface JoinModalProps {
  setIsJoinModalOpen: (value: boolean) => void;
  meetingData: MeetingResponse;
  userData: ProfileResponse
  accessToken: string
  setIsJoined: (value: boolean) => void;
}

/**
 * @Description 승인제/선착순 여부에 따라 답변하기 or 결제하기 화면으로 이동
 * @author 김영서
 **/
export const JoinModal = ({
  setIsJoinModalOpen,
  meetingData,
  userData,
  accessToken,
  setIsJoined
}: JoinModalProps) => {
  // 참여하기 버튼 눌림 여부

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {isReplyModalOpen ? (
        <ReplyModal
          meetingData={meetingData}
          setIsReplyModalOpen={setIsReplyModalOpen}
          setIsJoinModalOpen={setIsJoinModalOpen}
          userData={userData}
          accessToken={accessToken}
          setIsJoined={setIsJoined}
        />
      ) : isPurchaseModalOpen ? (
        <PurchaseModal setIsJoinModalOpen={setIsJoinModalOpen} setIsPurchaseModalOpen={setIsPurchaseModalOpen} meetingData={meetingData} userData={userData} acccessToken={accessToken} replyValue={null} setIsJoined={setIsJoined}/>
      ) : (
        <JoinModalCommon
          meetingData={meetingData}
          setIsJoinModalOpen={setIsJoinModalOpen}
          setIsPurchaseModalOpen={setIsPurchaseModalOpen}
          setIsReplyModalOpen={setIsReplyModalOpen}
        />
      )}
    </div>
  );
};
