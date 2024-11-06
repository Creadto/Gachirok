import { Session } from "next-auth";
import Image from "next/image";
import useProfileStore2 from "../store/profile-v2-store";
import { CloseIconWhite } from "./icons/CloseIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { TravelIcon, TravelIconBig } from "./icons/TravelIcon";
import { ResidentIcon, ResidentIconBig } from "./icons/ResidentIcon";
import {
  getCountryName,
  getStateKoreanName,
} from "../utils/handleCountryStateCityModify";
import { BadgeSection } from "./BadgeSection";

interface UserProfileModalProps {
  session: Session | null;
  setIsUserProfileModalOpen: (value: boolean) => void;
}

export const UserProfileModal = ({
  session,
  setIsUserProfileModalOpen,
}: UserProfileModalProps) => {
  const { profile } = useProfileStore2();
  if (profile)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
        <div className="bg-white rounded-[15px] w-[400px] h-[491px]">
          {/* 사용자 배경화면 */}
          <div className="w-full h-[172px] bg-yellow-500 rounded-tl-[15px] rounded-tr-[15px] relative">
            <Image
              src={profile?.backgroundPhotoUrl}
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
              onClick={() => setIsUserProfileModalOpen(false)}
            >
              <CloseIconWhite />
            </button>
            <BadgeSection profile={profile}/>
          </div>

          {/* 사용자 프로필 이미지 */}
          <div className="relative">
            <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 w-[90px] h-[90px] flex items-center justify-center rounded-full">
              <Image
                src={profile?.profilePhotoUrl}
                fill
                className="w-full h-full object-cover rounded-full"
                alt="Profile Photo"
              />
            </div>
          </div>

          {/* 사용자 닉네임 & 레벨 */}
          <div className="flex items-center justify-center mt-[55px] gap-x-[5px]">
            <span className="text-xl font-bold">{profile?.nickname}</span>
            <div className="my-[5px] bg-[#eeeeee] rounded-[2px] ">
              <span className="px-[6px] pt-[3px] text-[#808080] text-[10px]">
                lv.{profile.knowledgeValue}
              </span>
            </div>
          </div>

          {/* 거주자 구분 / 년도 */}
          <div className="flex items-center justify-center mt-[5px] gap-x-[5px] my-auto">
            {profile.traveler ? <TravelIconBig /> : <ResidentIconBig />}
            <span className="block text-[13px] mt-[2px]">
              {getCountryName(profile.residenceCountryCode)}/
              {profile.residenceYear}년
            </span>
          </div>

          {/* 자기소개 */}
          <div className="mt-[15px] flex items-center justify-center mx-[80px]">
            <span className="text-sm overflow-hidden text-ellipsis h-[40px] line-clamp-2">
              {profile.introduction}
            </span>
          </div>

          {/* 관심분야 */}
          <div className="flex items-center justify-center gap-x-[5px] mt-[10px]">
            <div className="px-[7px] py-[3px] bg-[#f6f6f6] rounded-[4px] flex">
              <span className="text-[13px] text-[#808080]">
                여행지 관심분야
                <span className="text-[#e62a2f]">
                  {" "}
                  {profile.interests.length}
                </span>
              </span>
            </div>
            <div className="px-[7px] py-[3px] bg-[#f6f6f6] rounded-[4px] flex">
              <span className="text-[13px] text-[#808080]">
                거주지 전문분야
                <span className="text-[#e62a2f]">
                  {" "}
                  {profile.expertises.length}
                </span>
              </span>
            </div>
          </div>

          <hr className="w-full bg-[#808080] my-[20px]" />

          <div className="flex items-center justify-center">
            {/* 운영 */}
            <div className="px-[26px] flex-col flex gap-y-[2px]">
              <span className="text-[13px] block">운영</span>
              <span className="text-lg font-bold">{profile.hostValue}</span>
            </div>
            <div className="px-[26px] flex-col flex gap-y-[2px]">
              <span className="text-[13px] block">참여</span>
              <span className="text-lg font-bold">{profile.guestValue}</span>
            </div>
            <div className="px-[15px] flex-col flex gap-y-[2px] items-center">
              <span className="text-[13px] block">지식등급</span>
              <span className="text-lg font-bold">
                lv.{profile.knowledgeValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
};
