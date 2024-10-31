import { ExitIcon } from "@/core/components/icons/ExitIcon";
import { ReportIcon } from "@/core/components/icons/ReportIcon";
import { useState } from "react";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { CancelApprovalModal } from "./CancelApprovalModal";
import { CancelModal } from "./CancelModal";
import { ReportModal } from "@/core/components/ReportModal";

interface VisitorMoreButtonProps {
  meetingData: MeetingResponse;
  accessToken: string | undefined;
}

/**
 * @Description 방문자 입장에서 더보기 버튼 눌렀을 때 등장하는 Dropdown
 * @author 김영서
 **/

export const VisitorMoreButton = ({
  meetingData,
  accessToken,
}: VisitorMoreButtonProps) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelApprovalModalOpen, setIsCancelApprovalModalOpen] =
    useState(false);

  //신고하기 모달
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  return (
    <>
      <div className="w-[200px] absolute top-[35px] right-0 border bg-white border-[#eeeeee] rounded-lg flex flex-col">
        {/* 참여하기 / 참가취소 */}

        {meetingData.visitorStatus === "accept" && (
          <button
            className="flex mt-[2px] p-3 gap-x-[8px] items-center shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsCancelModalOpen(true);
            }}
          >
            <ExitIcon />
            <span className="text-sm">참가취소</span>
          </button>
        )}

        {meetingData.visitorStatus === "wait" && (
          <button
            className="flex mt-[2px] p-3 gap-x-[8px] items-center shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsCancelApprovalModalOpen(true);
            }}
          >
            <ExitIcon />
            <span className="text-sm">참가 요청 취소</span>
          </button>
        )}

        {/* 신고하기 버튼 */}
        <button className="flex mb-[2px] p-3 gap-x-[8px] items-center shadow-sm"
        onClick={() => setIsReportModalOpen(true)}>
          <ReportIcon />
          <span className="text-sm">신고하기</span>
        </button>



      </div>
      {isCancelModalOpen && (
          <CancelModal
            setIsCancelModalOpen={setIsCancelModalOpen}
            meetingData={meetingData}
            accessToken={accessToken}
          />
        )}

        {isCancelApprovalModalOpen && (
          <CancelApprovalModal
            setIsCancelApprovalModalOpen={setIsCancelApprovalModalOpen}
            meetingData={meetingData}
            accessToken={accessToken}
          />
        )}

{isReportModalOpen && (
        <ReportModal setIsReportModalOpen={setIsReportModalOpen} 
        targetId={meetingData.meetingId}
        targetType="MEETING"
        accessToken = {accessToken}/>
      )}
    </>
  );
};
