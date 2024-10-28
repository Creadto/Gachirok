import CloseIcon from "@/core/components/icons/CloseIcon";
import { MemberResponse } from "../../_types/MemberResponse";
import { PreGuestResponse } from "../../_types/PreGuestResponse";

interface AnswerModalProps {
  setIsAnswerModalOpen: (value: boolean) => void;
  selectedMember?: MemberResponse;
  selectedPreGuest?: PreGuestResponse;
  question: string;
}

/**
 * @Description 사용자의 답변을 볼 수 있는 모달
 * @author 김영서
 **/
export const AnswerModal = ({
  selectedMember,
  selectedPreGuest,
  setIsAnswerModalOpen,
  question,
}: AnswerModalProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-default"
      onClick={(e) => {
        e.stopPropagation();
        setIsAnswerModalOpen(false);
      }}
    >
      <div
        className="bg-white rounded-[15px] shadow-lg w-[375px] h-[396px] relative cursor-default px-[15px]  scrollable-container overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 HEADER */}
        <div className="flex flex-row">
          <div className="w-full py-[17px] flex items-start justify-start shadow-sm">
            <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
              답변 보기
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsAnswerModalOpen(false);
            }}
            className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 질문 */}
        <div className="mt-[20px] flex flex-col gap-y-[10px]">
          <span className="text-[13px] text-[#808080] text-start ">
            {question}
          </span>
          {selectedMember && (
            <textarea
              value={selectedMember?.answer}
              readOnly={true}
              className="rounded-[15px] p-[15px] text-sm bg-[#f6f6f6] h-[250px] hover:border-none text-start resize-none overflow-hidden"
            />
          )}
          {selectedPreGuest && (
            <textarea
              value={selectedPreGuest?.answer}
              readOnly={true}
              className="rounded-[15px] p-[15px] text-sm bg-[#f6f6f6] h-[250px] hover:border-none text-start resize-none overflow-hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};
