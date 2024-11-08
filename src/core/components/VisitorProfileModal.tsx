import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import Image from "next/image";
import { useGetTargetUserProfile } from "../hooks/useGetProfile";
import useProfileStore2 from "../store/profile-v2-store";
import { getCountryName } from "../utils/handleCountryStateCityModify";
import { BadgeSection } from "./BadgeSection";
import { CloseIconWhite } from "./icons/CloseIcon";
import { ResidentIconBig } from "./icons/ResidentIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { TravelIconBig } from "./icons/TravelIcon";
import { LoadingSpinner } from "./LoadingSpinner";
import { PersonalProfileModal } from "./PersonalProfileModal";
import { useEffect, useState } from "react";
import { useDeleteFriend, usePostFriend } from "../hooks/useFriends";

interface VisitorProfileModalProps {
  session: Session | null;
  setIsVisitorProfileOpen: (value: boolean) => void;
  targetUserId: number;
}

export const VisitorProfileModal = ({
  session,
  setIsVisitorProfileOpen,
  targetUserId,
}: VisitorProfileModalProps) => {
  const {
    data: vistiorData,
    isLoading: isVisitorDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["visitor", targetUserId],
    queryFn: () => useGetTargetUserProfile(session?.accessToken, targetUserId),
    enabled: !!session,
    retry: 2,
  });

  const { profile } = useProfileStore2();
  const [friendStatus, setFriendStatus] = useState<undefined | string>(
    undefined
  );

  const handleAddFriend = async () => {
    try {
      const response = await usePostFriend(session?.accessToken, targetUserId);
      if (response) {
        setFriendStatus("FRIEND");
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFriend = async () => {
    try {
      const response = await useDeleteFriend(
        session?.accessToken,
        targetUserId
      );
      if (response) {
        setFriendStatus("UNREGISTERED");
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFriendStatus(vistiorData?.data.status);
  }, [vistiorData]);

  //사용자가 본인 프로필을 눌렀을 때
  if (targetUserId === profile?.userId) {
    return (
      <PersonalProfileModal
        session={session}
        setIsUserProfileModalOpen={setIsVisitorProfileOpen}
      />
    );
  } else {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
        <div className="bg-white rounded-[15px] w-[400px] h-[571px]">
          {isVisitorDataLoading && (
            <div className="flex flex-col justify-center items-center h-screen">
              <LoadingSpinner loading={isVisitorDataLoading} /> 로딩 스피너
              <span className="text-3xl font-bold mt-[20px]">
                로딩중... 잠시만 기다려주세요
              </span>
            </div>
          )}

          {/* 사용자 배경화면 */}
          {vistiorData && (
            <>
              <div className="w-full h-[172px] rounded-tl-[15px] rounded-tr-[15px] relative">
                <Image
                  src={vistiorData?.data.backgroundPhotoUrl}
                  fill
                  className="w-full h-[172px] object-cover"
                  alt="Background Photo"
                />
                {/* 공유버튼 */}
                <button className="absolute left-[15px] top-[15px]">
                  <ShareIcon />
                </button>
                {/* 닫기버튼 */}
                <button
                  className="absolute right-[15px] top-[15px]"
                  onClick={() => setIsVisitorProfileOpen(false)}
                >
                  <CloseIconWhite />
                </button>
                <BadgeSection profile={vistiorData?.data} />
              </div>

              {/* 사용자 프로필 이미지 */}
              <div className="relative">
                <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 w-[90px] h-[90px] flex items-center justify-center rounded-full">
                  <Image
                    src={vistiorData?.data?.profilePhotoUrl}
                    fill
                    className="w-full h-full object-cover rounded-full"
                    alt="Profile Photo"
                  />
                </div>
              </div>

              {/* 사용자 닉네임 & 레벨 */}
              <div className="flex items-center justify-center mt-[55px] gap-x-[5px]">
                <span className="text-xl font-bold">
                  {vistiorData?.data?.nickname}
                </span>
                <div className="my-[5px] bg-[#eeeeee] rounded-[2px] ">
                  <span className="px-[6px] pt-[3px] text-[#808080] text-[10px]">
                    lv.{vistiorData?.data.knowledgeValue}
                  </span>
                </div>
              </div>

              {/* 거주자 구분 / 년도 */}
              <div className="flex items-center justify-center mt-[5px] gap-x-[5px] my-auto">
                {vistiorData?.data.traveler ? (
                  <TravelIconBig />
                ) : (
                  <ResidentIconBig />
                )}
                <span className="block text-[13px] mt-[2px]">
                  {getCountryName(vistiorData?.data.residenceCountryCode)}/
                  {vistiorData?.data.residenceYear}년
                </span>
              </div>

              {/* 자기소개 */}
              <div className="mt-[15px] flex items-center justify-center mx-[80px]">
                <span className="text-sm overflow-hidden text-ellipsis h-[40px] line-clamp-2">
                  {vistiorData?.data.introduction}
                </span>
              </div>

              {/* 관심분야 */}
              <div className="flex items-center justify-center gap-x-[5px] mt-[10px]">
                <div className="px-[7px] py-[3px] bg-[#f6f6f6] rounded-[4px] flex">
                  <span className="text-[13px] text-[#808080]">
                    여행지 관심분야
                    <span className="text-[#e62a2f]">
                      {" "}
                      {vistiorData?.data.interests.length}
                    </span>
                  </span>
                </div>
                <div className="px-[7px] py-[3px] bg-[#f6f6f6] rounded-[4px] flex">
                  <span className="text-[13px] text-[#808080]">
                    거주지 전문분야
                    <span className="text-[#e62a2f]">
                      {" "}
                      {vistiorData?.data.expertises.length}
                    </span>
                  </span>
                </div>
              </div>

              <hr className="w-full bg-[#808080] my-[20px]" />

              <div className="flex items-center justify-center">
                {/* 운영 */}
                <div className="px-[26px] flex-col flex gap-y-[2px] items-center justify-center">
                  <span className="text-[13px] block">운영</span>
                  <span className="text-lg font-bold">
                    {vistiorData?.data.hostValue}
                  </span>
                </div>
                <div className="px-[26px] flex-col flex gap-y-[2px] items-center justify-center">
                  <span className="text-[13px] block">참여</span>
                  <span className="text-lg font-bold">
                    {vistiorData?.data.guestValue}
                  </span>
                </div>
                <div className="px-[15px] flex-col flex gap-y-[2px] items-center justify-center">
                  <span className="text-[13px] block">지식등급</span>
                  <span className="text-lg font-bold">
                    lv.{vistiorData?.data.knowledgeValue}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center mt-[20px] gap-x-[10px]">
                <button className="w-[150px] py-[15px] rounded-lg border border-[#eeeeee]">
                  <span className="text-sm">1:1 채팅</span>
                </button>
                {friendStatus === "UNREGISTERED" && (
                  <button
                    className="w-[150px] py-[15px] rounded-lg bg-[#e62a2f]"
                    onClick={handleAddFriend}
                  >
                    <span className="text-sm text-white">친구추가</span>
                  </button>
                )}
                {friendStatus === "FRIEND" && (
                  <button
                    className="w-[150px] py-[15px] rounded-lg bg-black"
                    onClick={handleDeleteFriend}
                  >
                    <span className="text-sm text-white">친구삭제</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
};
