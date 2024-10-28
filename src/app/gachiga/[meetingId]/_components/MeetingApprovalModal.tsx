import CloseIcon from "@/core/components/icons/CloseIcon";
import { useGetPreGuestHistoryResponse } from "@/core/hooks/usePreGuest";
import { useQuery } from "@tanstack/react-query";
import { isSameDay, isThisWeek, isWithinInterval, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { PreGuestResponse } from "../../_types/PreGuestResponse";
import { AcceptConfirmModal } from "./AcceptConfirmModal";
import { AnswerModal } from "./AnswerModal";
import { ApprovalGuestsDetailList } from "./ApprovalGuestsDetailList";
import { RejectConfirmModal } from "./RejectConfirmModal";

interface MeetingApprovalModalProps {
  setIsMeetingApprovalModalOpen: (value: boolean) => void;
  accessToken: string | undefined;
  meetingId: number;
}

/**
 * @Description 해당 모임의 멤버 관리 모달창
 * @author 김영서
 **/
export const MeetingApprovalModal = ({
  setIsMeetingApprovalModalOpen,
  accessToken,
  meetingId,
}: MeetingApprovalModalProps) => {
  const {
    data: preGuestData,
    isLoading: isPreGuestDataLoading,
    isError: isPreGuestDataError,
    error: preGuestError,
    refetch: refetchPreGuestData,
  } = useQuery({
    queryKey: [meetingId, "pre-guest"],
    queryFn: () => useGetPreGuestHistoryResponse(accessToken, meetingId),
    enabled: !!meetingId,
    retry: 2,
  });

  //선택된 유저
  const [selectedPreGuest, setSelectedPreGuest] =
    useState<PreGuestResponse | null>(null);

  //답변 보기 모달 열림 여부
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);

  // 승인 수락 재확인 모달 열림 여부
  const [isAcceptConfirmModalOpen, setIsAcceptConfirmModalOpen] =
    useState(false);

  //거절 수락 재확인 모달 열림 여부
  const [isRejectConfirmModalOpen, setIsRejectConfirmModalOpen] =
    useState(false);

  const today = new Date();

  // 오늘, 이번주, 그 외로 분류한 게스트 데이터
  const categorizedPreGuestData = {
    today: [] as PreGuestResponse[],
    thisWeek: [] as PreGuestResponse[],
    others: [] as PreGuestResponse[],
  };

  const parseCustomDate = (dateString: string): Date => {
    const year = parseInt(dateString.split(" ")[0].replace("년", " "));
    const month = parseInt(dateString.split(" ")[1].replace("월", " "));
    const day = parseInt(dateString.split(" ")[2].replace("일", " "));

    return new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1
  };

  if (preGuestData?.data.preGuests) {
    preGuestData.data.preGuests.forEach((guest: PreGuestResponse) => {
      const guestDate = parseCustomDate(guest.dateTime);
      const sevenDaysAgo = subDays(new Date(), 8); //일주일 전을 기준점으로 잡음

      if (isSameDay(guestDate, today)) {
        categorizedPreGuestData.today.push(guest);
      } else if (
        isWithinInterval(guestDate, { start: sevenDaysAgo, end: today }) 
        //7일전부터 ~ 오늘까지 사이이면
      ) {
        categorizedPreGuestData.thisWeek.push(guest);
      } else {
        categorizedPreGuestData.others.push(guest);
      }
    });
  }

  useEffect(() => {
    //수락 확인 모달 혹은 거절 확인 모달 창이 닫히면 데이터 다시 불러오기
    if (
      preGuestData &&
      isAcceptConfirmModalOpen === false &&
      isRejectConfirmModalOpen === false
    ) {
      refetchPreGuestData();
    }
  }, [isAcceptConfirmModalOpen, isRejectConfirmModalOpen]);

  if (isPreGuestDataError) {
    return <div>{preGuestError.message}가 발생하였습니다.</div>;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 cursor-default">
        <div
          className="bg-white rounded-[15px] shadow-lg w-[550px] h-[657px] relative cursor-default px-[15px] scrollable-container overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 HEADER */}
          <div className="flex flex-row">
            <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
              <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
                모임 신청 내역
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsMeetingApprovalModalOpen(false);
              }}
              className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
            >
              <CloseIcon />
            </button>
          </div>

          {isPreGuestDataLoading && (
            <div className="flex items-center justify-center mt-[50%]">
              <span className="text-sm text-[#808080]">
                모임 신청 내역 데이터를 로딩중입니다...
              </span>
            </div>
          )}

          {/* 오늘 신청된 모임들 */}
          <div className="flex flex-col">
            <span className="mt-[20px] text-xs text-start text-[#808080]">
              오늘
            </span>

            {/* 오늘 모임 신청 내역 표시 */}
            {categorizedPreGuestData.today.length === 0 ? (
              <div className="flex items-center justify-center mt-[20px]">
                <span className="text-sm text-[#808080]">
                  오늘 신청된 내역이 없습니다.
                </span>
              </div>
            ) : (
              <>
                {/* 오늘 모임 신청 내역 목록 */}
                {categorizedPreGuestData.today.map(
                  (guest: PreGuestResponse) => {
                    return (
                      <ApprovalGuestsDetailList
                        guest={guest}
                        setIsAcceptConfirmModalOpen={
                          setIsAcceptConfirmModalOpen
                        }
                        setIsAnswerModalOpen={setIsAnswerModalOpen}
                        setSelectedPreGuest={setSelectedPreGuest}
                        setIsRejectConfirmModalOpen={
                          setIsRejectConfirmModalOpen
                        }
                      />
                    );
                  }
                )}
                {/* <div className="mt-[20px] h-[200px]"></div>
                <div className="mt-[20px] h-[200px]"></div>
                <div className="mt-[20px] h-[200px]"></div>
                <div className="mt-[20px] h-[200px]"></div> */}
              </>
            )}
            <hr className="w-full bg-[#eeeeee] mt-[30px]" />

            {/* 이번주 신청된 모임들 */}
            <div className="flex flex-col">
              <span className="mt-[20px] text-xs text-start text-[#808080]">
                이번주
              </span>

              {categorizedPreGuestData.thisWeek.length === 0 ? (
                <div className="flex items-center justify-center mt-[20px]">
                  <span className="text-sm text-[#808080]">
                    이번주 신청된 내역이 없습니다.
                  </span>
                </div>
              ) : (
                categorizedPreGuestData.thisWeek.map((guest) => (
                  // 이번주의 내역 출력
                  <ApprovalGuestsDetailList
                    guest={guest}
                    setIsAcceptConfirmModalOpen={setIsAcceptConfirmModalOpen}
                    setIsAnswerModalOpen={setIsAnswerModalOpen}
                    setSelectedPreGuest={setSelectedPreGuest}
                    setIsRejectConfirmModalOpen={setIsRejectConfirmModalOpen}
                  />
                ))
              )}
            </div>

            <hr className="w-full bg-[#eeeeee] mt-[30px]" />

            {/* 그 외의 신청 내역 */}
            <div className="flex flex-col">
              <span className="mt-[20px] text-xs text-start text-[#808080]">
                그 외
              </span>

              {categorizedPreGuestData.others.length === 0 ? (
                <div className="flex items-center justify-center mt-[20px]">
                  <span className="text-sm text-[#808080]">
                    그 외 신청된 내역이 없습니다.
                  </span>
                </div>
              ) : (
                categorizedPreGuestData.others.map((guest) => (
                  // 그 외의 내역 출력
                  <ApprovalGuestsDetailList
                    guest={guest}
                    setIsAcceptConfirmModalOpen={setIsAcceptConfirmModalOpen}
                    setIsAnswerModalOpen={setIsAnswerModalOpen}
                    setSelectedPreGuest={setSelectedPreGuest}
                    setIsRejectConfirmModalOpen={setIsRejectConfirmModalOpen}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {isAnswerModalOpen && selectedPreGuest && (
        <AnswerModal
          selectedPreGuest={selectedPreGuest}
          setIsAnswerModalOpen={setIsAnswerModalOpen}
          question={preGuestData?.data.question}
        />
      )}
      {isRejectConfirmModalOpen && selectedPreGuest && (
        <RejectConfirmModal
          selectedPreGuest={selectedPreGuest}
          setIsRejectConfirmModalOpen={setIsRejectConfirmModalOpen}
          accessToken={accessToken}
          meetingId={meetingId}
        />
      )}

      {isAcceptConfirmModalOpen && selectedPreGuest && (
        <AcceptConfirmModal
          selectedPreGuest={selectedPreGuest}
          setIsAcceptConfirmModalOpen={setIsAcceptConfirmModalOpen}
          accessToken={accessToken}
          meetingId={meetingId}
        />
      )}
    </>
  );
};
