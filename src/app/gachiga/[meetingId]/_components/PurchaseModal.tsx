import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { BeforeIcon } from "@/core/components/icons/BackIcon";
import CloseIcon from "@/core/components/icons/CloseIcon";
import { CoinIcon } from "@/core/components/icons/CoinIcon";
import { PackageIcon } from "@/core/components/icons/PackageIcon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MeetingResponse } from "../../_types/MeetingResponse";
import { ModalDescription } from "./ModalDescription";
import { PurchaseConfirmModal } from "./PurchaseConfirmModal";

interface PurchaseModalProps {
  setIsJoinModalOpen: (value: boolean) => void;
  setIsPurchaseModalOpen: (value: boolean) => void;
  meetingData: MeetingResponse;
  userData: ProfileResponse;
  acccessToken: string
  replyValue: string | null,
  setIsJoined: (value: boolean) => void;
}
export const PurchaseModal = ({
  setIsJoinModalOpen,
  setIsPurchaseModalOpen,
  meetingData,
  userData,
  acccessToken,
  replyValue,
  setIsJoined
  
}: PurchaseModalProps) => {
  const [needToPay, setNeedToPay] = useState(true);

  const [isPurchaseConfirmModalOpen, setIsPurchaseConfirmModalOpen] =
    useState(false);

  const purchasePackage = () => {
    if (userData.purchaseProfile.purchaseItem.all === "day_all") {
      return "하루 무제한 패키지 이용중";
    } else if (userData.purchaseProfile.purchaseItem.all === "week_all") {
      return "일주일 무제한 패키지 이용중";
    } else if (userData.purchaseProfile.purchaseItem.all === "month_all") {
      return "한달 무제한 패키지 이용중";
    } else if (
      userData.purchaseProfile.purchaseItem.all === null &&
      userData.purchaseProfile.purchaseItem.guest === "day_guest"
    ) {
      return "하루 게스트 패키지 이용중";
    } else if (
      userData.purchaseProfile.purchaseItem.all === null &&
      userData.purchaseProfile.purchaseItem.guest === "week_guest"
    ) {
      return "일주일 게스트 패키지 이용중";
    } else if (
      userData.purchaseProfile.purchaseItem.all === null &&
      userData.purchaseProfile.purchaseItem.guest === "month_guest"
    ) {
      return "한달 게스트 패키지 이용중";
    }
  };

  const handlePurchaseConfirm = () => {
    setIsPurchaseConfirmModalOpen((prev) => !prev);
  };

  useEffect(() => {
    userData.purchaseProfile.purchaseItem.all === null &&
    userData.purchaseProfile.purchaseItem.guest === null
      ? setNeedToPay(true)
      : setNeedToPay(false);
  }, [userData]);

  return (
    <div className="bg-white rounded-[10px] shadow-lg w-[550px] h-[657px] relative" onClick={(e) => e.stopPropagation()}>
      {/* 모달 HEADER */}
      <div className="flex flex-row">
        <div className="w-full h-[60px] flex items-start justify-start shadow-sm">
          <button
            type="button"
            onClick={() => setIsPurchaseModalOpen(false)}
            className="absolute top-[15px] left-[15px] text-black hover:text-gray-800"
          >
            <BeforeIcon />
          </button>
          <span className="font-bold text-lg flex mx-auto items-center justify-center my-auto">
            결제하기
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
      {/* 모임 사진 */}
      <div className="flex relative">
        <div className="mt-[30px] flex items-center justify-center w-[90px] h-[90px] rounded-full mx-auto overflow-hidden">
          <Image
            objectFit="true"
            width={90}
            height={90}
            src={meetingData.photoUrls[0]}
            alt="Meeting Photo"
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        {/* 보유 코인 */}
        <div className=" absolute top-[30px] right-[15px] flex items-center justify-center gap-x-[5px] bg-[#f6f6f6] rounded-[12px] p-[3px]">
          <div className="flex items-center justify-center py-[2px]">
            <CoinIcon width={20} height={20} />
          </div>
          <span className="text-[13px]">{userData.purchaseProfile.coin}</span>
        </div>
      </div>

      {/* 모임 제목 */}
      <div className="flex flex-col gap-y-[5px] items-center justify-center">
        <span className="flex mt-[20px] text-xs text-[#a3a3a3]">
          {meetingData.title}
        </span>
        <span className="font-bold text-lg flex">모임에 참가합니다.</span>
      </div>

      {/* 이용중인 패키지 */}
      {userData.purchaseProfile.purchaseItem.all === null &&
      userData.purchaseProfile.purchaseItem.guest === null ? (
        <div className="mt-[30px] bg-[#eff6ff] flex p-[15px] mx-[15px] rounded-lg">
          <div className="text-sm text-[#0676fc] flex">
            이용중인 패키지가 없습니다.
          </div>
          <div className="flex ml-auto">
            <PackageIcon />
          </div>
        </div>
      ) : (
        <div className="mt-[30px] bg-[#eff6ff] flex p-[15px] mx-[15px] rounded-lg">
          <div className="text-sm text-[#0676fc]">{purchasePackage()}</div>
          <div className="flex ml-auto">
            <PackageIcon />
          </div>
        </div>
      )}

      <div className="border-[#eeeeee] border mx-[15px] rounded-lg mt-[20px] p-[15px]">
        <div className="flex flex-col gap-y-[15px]">
          <ModalDescription meetingData={meetingData} />
        </div>
      </div>
      {/* 참여하기 버튼*/}
      <button
        className="mt-[75px] bg-[#e62a2f] px-[234px] flex py-5 rounded-md relative mx-[15px]"
        onClick={handlePurchaseConfirm}
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
      {isPurchaseConfirmModalOpen && (
        <PurchaseConfirmModal
          userData={userData}
          setIsPurchaseConfirmModalOpen={setIsPurchaseConfirmModalOpen}
          needToPay={needToPay}
          meetingData={meetingData}
          accessToken={acccessToken}
          replyValue = {replyValue}
          setIsJoinModalOpen={setIsJoinModalOpen}
          setIsJoined={setIsJoined}
        />
      )}
    </div>
  );
};
