import { AccountIcon } from "@/core/components/icons/AccountIcon";
import { DeleteIcon } from "@/core/components/icons/DeleteIcon";
import { HistoryIcon } from "@/core/components/icons/HistoryIcon";
import { EditIcon } from "@/core/components/icons/top-bar/EditIcon";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { useState } from "react";
import { DestroyModal } from "./DestroyModal";
import { MemberManagementModal } from "./MemberManagementModal";
import { MeetingApprovalModal } from "./MeetingApprovalModal";
import { LeaveModal } from "./LeaveModal";
import { useRouter } from "next/navigation";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface HostMoreButtonProps {
  meetingData: MeetingResponse;
  accessToken: string | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<MeetingResponse, unknown>>;
}

/**
 * @Description Host입장에서 더보기 버튼 눌렀을 때 등장하는 Dropdown
 * @author 김영서
 **/
export const HostMoreButton = ({
  meetingData,
  accessToken,
  refetch,
}: HostMoreButtonProps) => {
  const router = useRouter();

  //모임 떠나기 모달 열림 여부
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  //모임 폐쇄 모달 열림 여부
  const [isDestroyModalOpen, setIsDestroyModalOpen] = useState(false);

  //멤버 관리 모달 열림 여부
  const [isMemberManageModalOpen, setIsMemberManageModalOpen] = useState(false);

  //모임 신청 내역 모달 열림 여부
  const [isMeetingApprovalModalOpen, setIsMeetingApprovalModalOpen] =
    useState(false);

  return (
    <>
      <div className="w-[200px] absolute top-[35px] right-0 border bg-white border-[#eeeeee] rounded-lg flex flex-col z-10">
        {/* 참여하기 / 참가취소 */}
        <button
          className="flex mt-[2px] p-3 gap-x-[8px] items-center shadow-sm"
          onClick={() => {
            router.push(`/gachiga/${meetingData.meetingId}/edit`);
            refetch(); //모임 상세가 중간에 바뀌었을 수도 있기 때문에 데이터 다시 가져옴
          }}
        >
          <EditIcon className="w-[24px] h-[24px]" />
          <span className="text-sm">모임 수정</span>
        </button>

        {/* 모임 신청 내역 버튼 */}
        {meetingData.approval ? (
          <button
            className="flex mb-[2px] p-3 gap-x-[8px] items-center shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsMeetingApprovalModalOpen(true);
            }}
          >
            <HistoryIcon />
            <span className="text-sm">모임 신청 내역</span>
          </button>
        ) : (
          <></>
        )}

        {/* 멤버관리 버튼 */}
        <button
          className="flex mb-[2px] p-3 gap-x-[8px] items-center shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsMemberManageModalOpen(true);
          }}
        >
          <AccountIcon />
          <span className="text-sm">멤버 관리</span>
        </button>

        {/* 모임 폐쇄 버튼 */}
        <button
          className="flex mb-[2px] p-3 gap-x-[8px] items-center shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            meetingData.members.length === 1
              ? setIsDestroyModalOpen(true)
              : setIsLeaveModalOpen(true);
          }}
        >
          <DeleteIcon />
          <span className="text-sm">
            {/* 사용자가 방장밖에 없으면 모임폐쇄 */}
            {meetingData.members.length === 1 ? "모임 폐쇄" : "모임 나가기"}
          </span>
        </button>
      </div>

      {isDestroyModalOpen && (
        <DestroyModal
          setIsDestroyModalOpen={setIsDestroyModalOpen}
          accessToken={accessToken}
          meetingData={meetingData}
        />
      )}
      {isMemberManageModalOpen && (
        <MemberManagementModal
          setIsMemberManageModalOpen={setIsMemberManageModalOpen}
          accessToken={accessToken}
          meetingId={meetingData.meetingId}
          approval={meetingData.approval}
          question={meetingData.question}
        />
      )}

      {isMeetingApprovalModalOpen && (
        <MeetingApprovalModal
          setIsMeetingApprovalModalOpen={setIsMeetingApprovalModalOpen}
          accessToken={accessToken}
          meetingId={meetingData.meetingId}
        />
      )}

      {isLeaveModalOpen && (
        <LeaveModal
          setIsLeaveModalOpen={setIsLeaveModalOpen}
          meetingId={meetingData.meetingId}
          accessToken={accessToken}
        />
      )}
    </>
  );
};
