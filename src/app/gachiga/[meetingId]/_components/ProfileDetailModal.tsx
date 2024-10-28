import CloseIcon from "@/core/components/icons/CloseIcon";
import { MemberResponse } from "../../_types/MemberResponse";
import Image from "next/image";
import { CrownIcon } from "@/core/components/icons/CrownIcon";
import { AnswerIcon } from "@/core/components/icons/AnswerIcon";
import { ReportIcon } from "@/core/components/icons/ReportIcon";
import { useState } from "react";
import { NewHostConfirmModal } from "./NewHostConfirmModal";
import { AnswerModal } from "./AnswerModal";
import { ExileIcon } from "@/core/components/icons/ExileIcon";
import { ExileGuestConfirmModal } from "./ExileGuestConfirmModal";
interface ProfileDetailModalProps {
  setIsMemberManageModalOpen: (value: boolean) => void;
  selectedMember: MemberResponse;
  setIsProfileDetailOpen: (value: boolean) => void;
  accessToken: string | undefined;
  meetingId: number;
  approval: boolean;
  question: string;
}

/**
 * @Description 사용자의 방장위임 / 답변보기 / 신고하기 버튼이 보이는 모달창
 * @author 김영서
 **/
export const ProfileDetailModal = ({
  selectedMember,
  setIsProfileDetailOpen,
  accessToken,
  meetingId,
  approval,
  question,
  setIsMemberManageModalOpen,
}: ProfileDetailModalProps) => {
  //방장 위임 버튼 눌렀을 때 등장하는 모달
  const [isNewHostConfirmModalOpen, setIsNewHostConfirmModalOpen] =
    useState(false);

  //답변 보기 버튼 눌렀을 떄 등장하는 모달
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  //사용자 추방 모달
  const [isExileGuestModalOpen, setIsExileGuestModalOpen] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          setIsProfileDetailOpen(false);
        }}
      >
        <div
          className="bg-white rounded-[15px] shadow-lg w-[375px] relative cursor-default px-[15px] pt-[30px] pb-[20px] scrollable-container overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-x-[10px]" key={selectedMember.userId}>
            <Image
              src={selectedMember.profilePhotoUrl}
              width={40}
              height={40}
              alt="Host Profile Photo"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="flex gap-x-[5px] items-center">
                <span className="font-semibold text-[15px]">
                  {selectedMember.nickname}
                </span>
                {/* <span className="px-[6px] py-[3px] bg-[#eeeeee] text-[#808080] rounded-[2px] text-[10px]">
                  lv.{selectedMember.guestValue}
                </span> */}
              </div>
              <span className="text-xs text-[#808080] text-start">
                {selectedMember.introduction}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsProfileDetailOpen(false);
            }}
            className="absolute top-[30px] right-[15px] text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>

          <hr className="border border-[#eeeeee] w-full mt-[20px] mb-[10px]" />

          <div className="flex flex-col">
            <button
              className="flex gap-x-[8px] items-center my-[11px]"
              onClick={() => setIsNewHostConfirmModalOpen(true)}
            >
              <CrownIcon />
              <span className="text-sm">방장 위임</span>
            </button>
            {approval && (
              <button
                className="flex gap-x-[8px] items-center my-[11px]"
                onClick={() => setIsAnswerModalOpen(true)}
              >
                <AnswerIcon />
                <span className="text-sm">답변 보기</span>
              </button>
            )}

            <button className="flex gap-x-[8px] items-center my-[11px]">
              <ReportIcon />
              <span className="text-sm">신고하기</span>
            </button>

            <button
              className="flex gap-x-[8px] items-center my-[11px]"
              onClick={() => setIsExileGuestModalOpen(true)}
            >
              <ExileIcon />
              <span className="text-sm">추방하기</span>
            </button>
          </div>
        </div>
      </div>
      {isNewHostConfirmModalOpen && (
        <NewHostConfirmModal
          setIsNewHostConfirmModalOpen={setIsNewHostConfirmModalOpen}
          selectedMember={selectedMember}
          accessToken={accessToken}
          meetingId={meetingId}
        />
      )}

      {isAnswerModalOpen && (
        <AnswerModal
          setIsAnswerModalOpen={setIsAnswerModalOpen}
          selectedMember={selectedMember}
          question={question}
        />
      )}
      {isExileGuestModalOpen && (
        <ExileGuestConfirmModal
          setIsExileGuestModalOpen={setIsExileGuestModalOpen}
          setIsMemberManageModalOpen={setIsMemberManageModalOpen}
          selectedMember={selectedMember}
          accessToken={accessToken}
          meetingId={meetingId}
        />
      )}
    </>
  );
};
