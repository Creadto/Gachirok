import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { CoinIcon } from "@/core/components/icons/CoinIcon";
import {
  FavoriteOffIcon,
  FavoriteOnIcon,
} from "@/core/components/icons/FavoriteIcon";
import { usePostMeetingsBookmark } from "@/core/hooks/usePostMeetings";
import { useEffect, useState } from "react";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { JoinModal } from "./JoinModal";
import { ModalDescription } from "./ModalDescription";
import { PurchaseProfileResponse } from "@/app/profile/_types/PurchaseProfileResponse";

interface RightFloatModalInterface {
  meetingData: MeetingResponse;
  accessToken: string;
  userPurchaseData: PurchaseProfileResponse | undefined;
  setIsJoined: (join: boolean) => void;
}

/**
 * @Description 오른쪽에 뜨는 참여하기 버튼이 있는 모달창
 * @author 김영서
 **/
export const RightFloatModal = ({
  meetingData,
  accessToken,
  userPurchaseData,
  setIsJoined,
}: RightFloatModalInterface) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // 참여하기 버튼 눌림 여부
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // 코인 지불해야하는 여부
  const [needToPay, setNeedToPay] = useState(true);

  useEffect(() => {
    if (meetingData?.bookmark !== undefined) {
      setIsFavorite(meetingData.bookmark);
    }

    userPurchaseData?.purchaseItem.all === null &&
    userPurchaseData?.purchaseItem.guest === null
      ? setNeedToPay(true)
      : setNeedToPay(false);
  }, [meetingData, userPurchaseData]);

  const handleBookmark = (meetingId: number) => {
    try {
      if (accessToken) {
        usePostMeetingsBookmark(accessToken, meetingId);
        setIsFavorite((isFavorite: boolean) => !isFavorite);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  //참여하기 버튼 클릭
  const handleJoinButton = () => {
    setIsJoinModalOpen(true);
  };

  const handleVisitorStatus = () => {
    if (
      meetingData.visitorStatus === "accept" ||
      meetingData.visitorStatus === "host"
    ) {
      return (
        <button
          className="mt-7 bg-black w-full flex py-5 rounded-md relative"
          onClick={handleJoinButton}
        >
          <span className="text-white font-semibold text-sm whitespace-nowrap flex items-center justify-center mx-auto py-0.5">
            채팅방 입장
          </span>
        </button>
      );
    } else if (meetingData.visitorStatus === "visit") {
      if (meetingData.maxMember - (meetingData.members.length) === 0) {
        return (
          <div className="mt-7 bg-[#a3a3a3] w-full flex py-5 rounded-md relative">
            <span className="text-white font-semibold text-sm whitespace-nowrap flex items-center justify-center mx-auto py-0.5">
              잔여 좌석이 없습니다
            </span>
          </div>
        );
      } else if (meetingData.finished === true) {
        return (
          <div className="mt-7 bg-[#a3a3a3] w-full flex py-5 rounded-md relative">
            <span className="text-white font-semibold text-sm whitespace-nowrap flex items-center justify-center mx-auto py-0.5">
              종료된 모임입니다
            </span>
          </div>
        );
      }
      return (
        <button
          className="mt-7 bg-[#e62a2f] w-full flex py-5 rounded-md relative"
          onClick={handleJoinButton}
        >
          <span className="text-white font-semibold text-sm whitespace-nowrap flex items-center justify-center mx-auto py-0.5">
            참여하기
          </span>

          <div className="rounded-full bg-white flex items-center justify-center py-0.5 absolute right-5">
            <div className="pl-1">
              <CoinIcon width={20} height={20} />
            </div>
            {needToPay ? (
              <span className="text-xs pr-2">1</span>
            ) : (
              <span className="text-xs pr-2">무료</span>
            )}
          </div>
        </button>
      );
    } else if (meetingData.visitorStatus === "wait") {
      return (
        <div className="mt-7 bg-[#a3a3a3] w-full flex py-5 rounded-md relative">
          <span className="text-white font-semibold text-sm whitespace-nowrap flex items-center justify-center mx-auto py-0.5">
            모임 수락 대기중입니다.
          </span>
        </div>
      );
    } else if (meetingData.visitorStatus === "cancel") {
      return (
        <div className="mt-7 bg-[#a3a3a3] w-full flex py-5 rounded-md relative">
          <span className="text-white font-semibold text-sm whitespace-nowrap flex items-center justify-center mx-auto py-0.5">
            취소된 모임은 가입이 불가합니다.
          </span>
        </div>
      );
    } else if(meetingData.visitorStatus === "reject"){
      return (
        <div className="mt-7 bg-[#a3a3a3] w-full flex py-5 rounded-md relative">
          <span className="text-white font-semibold text-sm text-center flex items-center justify-center mx-auto py-0.5">
            호스트로부터 가입이 거절 혹은 추방된 모임입니다.
          </span>
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-[40%]  h-[100px] flex sticky top-[100px]">
        <div className="absolute w-full bg-white rounded-[10px] border-2 border-[#eeeeee] p-5">
          <div className="flex items-center ">
            <span className="font-semibold text-lg">모임 정보</span>
            <div className="flex items-center justify-center ml-auto">
              {/* 즐겨찾기 버튼 */}
              <button onClick={() => handleBookmark(meetingData.meetingId)}>
                {isFavorite === true ? <FavoriteOnIcon /> : <FavoriteOffIcon />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-[15px] mt-[15px]">
            <ModalDescription meetingData={meetingData} />

            {/* 참여하기 버튼*/}
            {handleVisitorStatus()}

            {meetingData.approval && (
              <span className="text-xs text-[#808080] flex items-center justify-center">
                호스트가 수락해야 참여할 수 있는 모임입니다.
              </span>
            )}
          </div>
        </div>
      </div>
      {isJoinModalOpen && (
        <JoinModal
          setIsJoinModalOpen={setIsJoinModalOpen}
          meetingData={meetingData}
          userPurchaseData={userPurchaseData}
          accessToken={accessToken}
          setIsJoined={setIsJoined}
        />
      )}
    </>
  );
};
