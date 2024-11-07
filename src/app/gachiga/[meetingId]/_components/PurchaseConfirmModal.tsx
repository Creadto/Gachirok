import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import CloseIcon from "@/core/components/icons/CloseIcon";
import { CoinIcon } from "@/core/components/icons/CoinIcon";
import axios from "axios";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { useRouter } from "next/navigation";
import { usePostGuestCreateRequest } from "@/core/hooks/useGuest";
import { PurchaseProfileResponse } from "@/app/profile/_types/PurchaseProfileResponse";

interface PurchaseConfirmModal {
  setIsPurchaseConfirmModalOpen: (value: boolean) => void;
  userPurchaseData: PurchaseProfileResponse | undefined
  needToPay: boolean;
  meetingData: MeetingResponse;
  accessToken: string;
  replyValue: string | null;
  setIsJoinModalOpen: (value: boolean) => void;
  setIsJoined: (value: boolean) => void;
}

/**
 * @Description 결제 여부를 최종 확인하는 모달
 * @author 김영서
 **/
export const PurchaseConfirmModal = ({
  setIsPurchaseConfirmModalOpen,
  userPurchaseData,
  needToPay,
  meetingData,
  accessToken,
  replyValue,
  setIsJoinModalOpen,
  setIsJoined,
}: PurchaseConfirmModal) => {
  const meetingId = meetingData.meetingId;

  const purchasePackage = () => {
    if (userPurchaseData?.purchaseItem.all === "day_all") {
      return "day_all";
    } else if (userPurchaseData?.purchaseItem.all === "week_all") {
      return "week_all";
    } else if (userPurchaseData?.purchaseItem.all === "month_all") {
      return "month_all";
    } else if (
      userPurchaseData?.purchaseItem.all === null &&
      userPurchaseData?.purchaseItem.guest === "day_guest"
    ) {
      return "day_guest";
    } else if (
      userPurchaseData?.purchaseItem.all === null &&
      userPurchaseData?.purchaseItem.guest === "week_guest"
    ) {
      return "week_guest";
    } else if (
      userPurchaseData?.purchaseItem.all === null &&
      userPurchaseData?.purchaseItem.guest === "month_guest"
    ) {
      return "month_guest";
    }
    return("none")
  };

  const handleGuestCreateRequest = async () => {
    try{
      const response = await usePostGuestCreateRequest(
        accessToken, replyValue, purchasePackage(), needToPay, meetingId
      )
  
      // const response = await axios.post(
      //   `/api/meetings/${meetingId}/guests`,
      //   {
      //     answer: replyValue !== null && replyValue,
      //     packageItem: purchasePackage(),
      //     coin: needToPay ? -1 : -0,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );
      if (response) {
        alert("모임이 성공적으로 가입되었습니다.");
        window.location.reload();
      }

    } 
    catch(error) {
      console.error("error")
    }

  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-60  bg-black bg-opacity-50">
      <div className="bg-white rounded-[15px] shadow-lg w-[375px] h-[352px] relative px-[15px] pt-[30px] pb-[15px]">
        {/* 모달 HEADER */}
        <div className="flex flex-row relative">
          <span className="font-semibold text-xl flex items-center justify-start ">
            모임에 참여합니다.
          </span>
          <button
            type="button"
            onClick={() => setIsPurchaseConfirmModalOpen(false)}
            className="absolute top-0 right-0 text-black hover:text-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 환불 안내 */}
        <span className="block mt-[10px] text-sm text-[#808080]">
          모임이 개설된 이후, 다른 호스트로 임명 또는 <br />
          모임을 폐쇄하더라도 포인트는 환불되지 않습니다.
        </span>

        {/* 보유 포인트 안내 */}
        <div className="border border-[#eeeeee] flex-col p-[15px] mt-[15px] rounded-lg flex gap-y-[15px]">
          <div className="flex text-sm">
            <label className=" flex text-[#a3a3a3]">내 보유 포인트</label>
            <span className="flex ml-auto">
              {userPurchaseData?.coin}
            </span>
          </div>
          <div className="flex text-sm">
            <label className=" flex text-[#a3a3a3]">차감 포인트</label>
            <span className="flex ml-auto text-[#ff006f]">
              -{needToPay ? 1 : 0}
            </span>
          </div>
          <div className="flex text-sm">
            <label className=" flex text-[#a3a3a3]">참여 시 남은 포인트</label>
            <span className="flex ml-auto">
              {needToPay && userPurchaseData
                ? userPurchaseData?.coin - 1
                : userPurchaseData?.coin}
            </span>
          </div>
        </div>

        <button
          className="mt-[35px] bg-[#e62a2f] px-[146.5px] flex py-5 rounded-md relative"
          onClick={handleGuestCreateRequest}
        >
          <span className="text-white font-semibold text-sm whitespace-nowrap flex items-center justify-center mx-auto py-0.5">
            참여하기
          </span>

          <div className="rounded-full bg-white flex gap-5 items-center justify-center py-0.5 absolute right-5">
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
      </div>
    </div>
  );
};
