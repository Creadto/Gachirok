"use client";
import { Profile } from "@/core/store/profile-store";
import { getCountryName } from "@/core/utils/handleCountryStateCityModify";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { UserProfileModal } from "../UserProfileModal";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { CoinIcon } from "../icons/CoinIcon";
import {
  ProfileAnnouncementIcon,
  ProfileBadgeIcon,
  ProfileCustomerServiceIcon,
  ProfileLogoutIcon,
  ProfileMyPostsIcon,
  ProfilePolicyIcon,
  ProfilePrivacyIcon,
  ProfileReferralIcon,
  ProfileSettingIcon,
} from "../icons/ProfileDropdownIcons";
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import SignOutModal from "../SignOutModal";
import { ProfileResponse } from "@/app/profile/_types/ProfileResponse";
import { EditProfileIcon } from "../icons/create-profile/EditProfileIcon";
import { ResidentIcon } from "../icons/ResidentIcon";

interface ProfileDropdownProps {
  profile: ProfileResponse | null;
  closeModal: () => void;
  session: Session | null;
  setIsUserProfileModalOpen: (value: boolean) => void;
}

/**
 * @Description 프로필을 클릭했을 때 등장하는 Dropdown
 * @author 김영서
 **/
export const ProfileDropdown = ({
  profile,
  closeModal,
  session,
  setIsUserProfileModalOpen,
}: ProfileDropdownProps) => {
  const router = useRouter();

  //SignOut 눌렀을 때 등장하는 모달 여부
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  return (
    <>
      <div className="absolute w-[320px] top-[50px] right-0 bg-white rounded-[15px] border border-[#EEEEEE] p-[20px]">
        {/* 프로필 아이콘 버튼 */}
        <div>
          <div className="flex gap-x-[15px] w-full">
            {/* 프로필 사진 */}
            <div className="flex ">
              <button
                className="flex w-[61px] h-[61px] relative "
                onClick={() => {
                  router.push("/profile");
                  closeModal();
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <img
                  src={profile?.profilePhotoUrl}
                  alt="Profile Preview"
                  className="object-cover w-[61px] h-[61px] border-none rounded-full"
                />
                <EditProfileIcon className="absolute bottom-0 right-0" />
              </button>
            </div>

            <button
              type="button"
              className="flex w-full"
              onClick={() => {
                setIsUserProfileModalOpen(true);
                closeModal();
              }}
            >
              <div className="flex flex-col  mt-[4px] gap-y-[5px] w-full">
                <div className="flex gap-x-[5px] text-start">
                  <p className="text-[20px] font-bold">{profile?.nickname}</p>
                  <div className="flex px-[6px] py-[2px] rounded-[2px] bg-[#EEEEEE] my-[5px] text-[#808080} text-[10px] items-center justify-center">
                    lv.{profile?.knowledgeValue}
                  </div>
                </div>

                <div className=" flex bg-white space-x-[5px] items-start">
                  <ResidentIcon />
                  <div className="text-[13px] whitespace-nowrap">
                    {getCountryName(profile?.residenceCountryCode)}/
                    {profile?.residenceYear}년
                  </div>
                </div>
              </div>
              <div className=" flex justify-center items-center ml-auto my-auto">
                <ArrowRightIcon />
              </div>
            </button>
          </div>
        </div>

        {/* 보유 포인트 버튼 */}
        <div
          className="flex mt-[20px] bg-[#E6A55E] bg-opacity-20 px-[12px] py-[15px] rounded-lg cursor-pointer"
          onClick={() => {
            router.push("/payment");
            closeModal();
          }}
        >
          <div className="flex gap-x-[15px]">
            <div className="flex items-center">
              <CoinIcon width={36} height={36} />
            </div>
            <div className="flex flex-col space-y-[2px]">
              <span className="text-[13px] text-[#E6A45E]">보유 포인트</span>
              <div className="text-lg font-bold">{profile?.coin}</div>
            </div>
          </div>
        </div>

        {/* 나의 뱃지 현황 */}
        <button className="flex mt-[5px] py-[15px] items-center gap-x-[10px] w-full">
          <ProfileBadgeIcon />
          <span className="text-[15px] flex">나의 뱃지 현황</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 내가 쓴 글 */}
        <button className="flex mt-[5px] py-[15px] items-center gap-x-[10px] w-full">
          <ProfileMyPostsIcon />
          <span className="text-[15px]">내가 쓴 글</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 설정 */}
        <button className="flex mt-[5px] py-[15px] items-center gap-x-[10px] w-full">
          <ProfileSettingIcon />
          <span className="text-[15px]">설정</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 초대코드 등록하기 */}
        <button className="flex mt-[5px] py-[15px] items-center gap-x-[10px] w-full">
          <ProfileReferralIcon />
          <span className="text-[15px]">초대코드 등록하기</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 공지사항 */}
        <button className="flex py-[15px] items-center gap-x-[10px] w-full">
          <ProfileAnnouncementIcon />
          <span className="text-[15px]">공지사항</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 고객센터 */}
        <button className="flex py-[15px] items-center gap-x-[10px] w-full">
          <ProfileCustomerServiceIcon />
          <span className="text-[15px]">고객센터</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 개인정보 처리방침 */}
        <button className="flex py-[15px] items-center gap-x-[10px] w-full">
          <ProfilePrivacyIcon />
          <span className="text-[15px]">개인정보처리방침</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 서비스 이용약관 */}
        <button className="flex py-[15px] items-center gap-x-[10px] w-full">
          <ProfilePolicyIcon />
          <span className="text-[15px]">서비스이용약관</span>
          <div className=" flex ml-auto">
            <ArrowRightIcon />
          </div>
        </button>

        {/* 버전정보 */}
        {/* <button className="h-[42px] flex mx-[20px] my-[5px]   flex-row items-center space-x-[10px]">
          <ProfileVersionIcon />
          <span className="text-[15px]">버전정보</span>
        </button> */}

        {/* 로그아웃 */}
        <button
          className="flex py-[15px] items-center gap-x-[10px] w-full"
          onClick={() => setIsSignOutOpen(true)}
        >
          <ProfileLogoutIcon />
          <span className="text-[15px]">로그아웃</span>
        </button>
      </div>
      {isSignOutOpen && (
        <SignOutModal
          onClickClose={() => setIsSignOutOpen(false)}
          onClickSignOut={() =>
            signOut({
              callbackUrl: "/", //로그아웃 시 callbackurl을 통해 홈페이지로 자동 이동
            })
          }
        />
      )}
    </>
  );
};
