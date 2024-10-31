import { useEffect, useState } from "react";
import { ArrowRightIcon, ArrowRightIconLarge } from "./icons/ArrowRightIcon";
import CloseIcon from "./icons/CloseIcon";
import { DetailReportModal } from "./DetailReportModal";

interface ReportModalProps {
  setIsReportModalOpen: (value: boolean) => void;
  targetId: number;
  targetType: string;
  accessToken: string | undefined
}

export const ReportModal = ({ setIsReportModalOpen, targetId, targetType, accessToken }: ReportModalProps) => {
  const [type, setType] = useState("");
  const [isDetailReportModalOpen, setIsDetailReportModalOpen] = useState(false);



  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          setIsReportModalOpen(false);
        }}
      >
        <div
          className="bg-white rounded-[15px] shadow-lg w-[375px] h-[470px] relative cursor-default px-[15px] scrollable-container overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 HEADER */}
          <div className="flex flex-row">
            <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
              <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
                신고하기
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsReportModalOpen(false);
              }}
              className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
            >
              <CloseIcon />
            </button>
          </div>

          {/* 신고 종류 버튼 */}
          <div className="flex flex-col gap-y-[10px] mt-[20px]">
            {/* 광고 또는 음란성 */}
            <button
              className=" rounded-lg bg-[#f6f6f6] px-[15px] py-[20px] flex"
              onClick={() => {
                setIsDetailReportModalOpen(true);
                setType("ADVERTISING");
              }}
            >
              <span className="text-sm font-semibold items-center justify-start flex">
                광고 또는 음란성
              </span>
              <div className="items-center justify-center flex  ml-auto my-auto">
                <ArrowRightIconLarge />
              </div>
            </button>

            {/* 욕설 또는 부적절한 언어 사용 */}
            <button
              className=" rounded-lg bg-[#f6f6f6] px-[15px] py-[20px] flex"
              onClick={() => {
                setIsDetailReportModalOpen(true);
                setType("PROFANITY");
              }}
            >
              <span className="text-sm font-semibold items-center justify-start flex">
                욕설 또는 부적절한 언어 사용
              </span>
              <div className="items-center justify-center flex  ml-auto my-auto">
                <ArrowRightIconLarge />
              </div>
            </button>

            {/* 다른 회원 비방 */}
            <button
              className=" rounded-lg bg-[#f6f6f6] px-[15px] py-[20px] flex"
              onClick={() => {
                setIsDetailReportModalOpen(true);
                setType("SLANDER");
              }}
            >
              <span className="text-sm font-semibold items-center justify-start flex">
                다른 회원 비방
              </span>
              <div className="items-center justify-center flex  ml-auto my-auto">
                <ArrowRightIconLarge />
              </div>
            </button>

            {/* 도배 행위 */}
            <button
              className=" rounded-lg bg-[#f6f6f6] px-[15px] py-[20px] flex"
              onClick={() => {
                setIsDetailReportModalOpen(true);
                setType("SPAMMING");
              }}
            >
              <span className="text-sm font-semibold items-center justify-start flex">
                도배 행위
              </span>
              <div className="items-center justify-center flex  ml-auto my-auto">
                <ArrowRightIconLarge />
              </div>
            </button>

            {/* 기타 */}
            <button
              className=" rounded-lg bg-[#f6f6f6] px-[15px] py-[20px] flex"
              onClick={() => {
                setIsDetailReportModalOpen(true);
                setType("ETC");
              }}
            >
              <span className="text-sm font-semibold items-center justify-start flex">
                기타
              </span>
              <div className="items-center justify-center flex  ml-auto my-auto">
                <ArrowRightIconLarge />
              </div>
            </button>
          </div>
        </div>
      </div>
      {isDetailReportModalOpen && (
        <DetailReportModal
          type={type}
          setIsReportModalOpen={setIsReportModalOpen}
          setIsDetailReportModalOpen={setIsDetailReportModalOpen}
          targetId={targetId}
          targetType={targetType}
          accessToken={accessToken}
        />
      )}
    </>
  );
};
