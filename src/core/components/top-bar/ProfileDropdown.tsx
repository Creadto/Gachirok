"use client";
import { Profile } from "@/core/store/profile-store";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";
import { ResidentIcon } from "../icons/ResidentIcon";
import { getCountryName } from "@/core/utils/handleCountryStateCityModify";
import { useRouter } from "next/navigation";
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
  ProfileVersionIcon,
} from "../icons/ProfileDropdownIcons";
import { signOut } from "next-auth/react";
import { useState } from "react";
import SignOutModal from "../SignOutModal";

interface ProfileDropdownProps {
  profile: Profile | null;
  closeModal: () => void;
}

/**
 * @Description 프로필을 클릭했을 때 등장하는 Dropdown
 * @author 김영서
 **/
export const ProfileDropdown = ({
  profile,
  closeModal,
}: ProfileDropdownProps) => {
  const router = useRouter();

  //SignOut 눌렀을 때 등장하는 모달 여부
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);

  return (
    <>
      <div className="absolute w-[320px] h-[681px] top-[50px] right-0 bg-white rounded-[15px] border border-[#EEEEEE] z-30">
        {/* 프로필 아이콘 버튼 */}
        <button
          onClick={() => {
            router.push("/profile");
            closeModal();
          }}
        >
          <div className="flex flew-row h-[61px] mt-[20px] mx-[20px] space-x-[67px]">
            {/* 프로필 사진 */}
            <div className="w-[201px] flex flex-row space-x-[15px]">
              <div className="flex ">
                <img
                  src={profile?.profilePhotoUrl}
                  alt="Profile Preview"
                  className="object-cover w-[61px] h-[61px] border-none rounded-full"
                />
              </div>

              <div className="flex flex-col  mt-[4px] space-y-[5px]">
                <div className="flex gap-x-[5px] w-[125px] text-start">
                  <p className="w-full  h-[28px] text-[20px] font-bold">
                    {profile?.nickname}
                  </p>
                  <div className="flex w-[34px] h-[18px] bg-[#EEEEEE] my-[5px] mr-[1px] text-[#808080} text-[10px] items-center justify-center">
                    lv.{profile?.answerPoint}
                  </div>
                </div>

                <div className="flex-row flex w-full bg-white space-x-[5px] items-start">
                  <ResidentIcon />
                  <div className="text-[13px] whitespace-nowrap">
                    {getCountryName(profile?.residenceCountryCode)}/
                    {profile?.residenceYear}년
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center">
              <ArrowRightIcon />
            </div>
          </div>
        </button>

        {/* 보유 포인트 버튼 */}
        <div className="flex mt-[20px] bg-[#E6A55E] bg-opacity-20 h-[76px] mx-[20px]">
          <div className="flex flex-row mx-[12px] my-[15px] w-[256px] h-[46px] space-x-[15px]">
            <div className="flex my-[4px] items-center">
              <CoinIcon width={36} height={36} />
            </div>
            <div className="flex flex-col space-y-[2px]">
              <div className="text-[13px] text-[#E6A45E]">보유 포인트</div>
              <div className="text-[18px] font-bold">
                {profile?.purchaseProfile?.coin}
              </div>
            </div>
          </div>
        </div>

        {/* 나의 뱃지 현황 */}
        <button className="flex mt-[10px] mx-[20px] mb-[5px] h-[42px] flex-row items-center space-x-[10px]">
          <ProfileBadgeIcon />
          <span className="text-[15px]">나의 뱃지 현황</span>
        </button>

        {/* 내가 쓴 글 */}
        <button className="  h-[42px] flex ml-[20px] my-[5px] flex-row items-center space-x-[10px]">
          <ProfileMyPostsIcon />
          <span className="text-[15px]">내가 쓴 글</span>
        </button>

        {/* 설정 */}
        <button className="h-[42px] flex mx-[20px] my-[5px]  flex-row items-center space-x-[10px]">
          <ProfileSettingIcon />
          <span className="text-[15px]">설정</span>
        </button>

        {/* 초대코드 등록하기 */}
        <button className="h-[42px] flex mx-[20px] my-[5px]  flex-row items-center space-x-[10px]">
          <ProfileReferralIcon />
          <span className="text-[15px]">초대코드 등록하기</span>
        </button>

        {/* 공지사항 */}
        <button className="h-[42px] flex mx-[20px] my-[5px]  flex-row items-center space-x-[10px]">
          <ProfileAnnouncementIcon />
          <span className="text-[15px]">공지사항</span>
        </button>

        {/* 고객센터 */}
        <button className="h-[42px] flex mx-[20px] my-[5px] flex-row items-center space-x-[10px]">
          <ProfileCustomerServiceIcon />
          <span className="text-[15px]">고객센터</span>
        </button>

        {/* 개인정보 처리방침 */}
        <button className="h-[42px] flex mx-[20px] my-[5px] flex-row items-center space-x-[10px]">
          <ProfilePrivacyIcon />
          <span className="text-[15px]">개인정보처리방침</span>
        </button>

        {/* 서비스 이용약관 */}
        <button className="h-[42px] flex mx-[20px] my-[5px]  flex-row items-center space-x-[10px]">
          <ProfilePolicyIcon />
          <span className="text-[15px]">서비스이용약관</span>
        </button>

        {/* 버전정보 */}
        <button className="h-[42px] flex mx-[20px] my-[5px]   flex-row items-center space-x-[10px]">
          <ProfileVersionIcon />
          <span className="text-[15px]">버전정보</span>
        </button>

        {/* 로그아웃 */}
        <button
          className="h-[42px] flex mx-[20px] my-[5px]  flex-row items-center space-x-[10px]"
          onClick={() => setIsSignOutOpen(true)}
        >
          <ProfileLogoutIcon />
          <span className="text-[15px]">로그아웃</span>
        </button>
      </div>

      {isSignOutOpen ? (
        <SignOutModal
          onClickClose={() => setIsSignOutOpen(false)}
          onClickSignOut={() =>
            signOut({
              callbackUrl: "/", //로그아웃 시 callbackurl을 통해 홈페이지로 자동 이동
            })
          }
        />
      ) : (
        <></>
      )}
    </>
  );
};
