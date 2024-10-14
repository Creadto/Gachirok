"use client";


import { CheckedIcon, UncheckedIcon } from "@/core/components/icons/agreement/CheckedIcon";
import { ArrowRightIcon } from "@/core/components/icons/ArrowRightIcon";
import { usePostUserCreateRequest } from "@/core/hooks/usePostUserCreateRequest";
import { mapUserResponse } from "@/core/mapper/user-mapper";
import useUserStore, { User } from "@/core/store/user-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * @Description signedUpUser가 false일 때 등장하는 약관동의 페이지
 * @author 김영서
 **/
const Agreement = () => {
  const [allChecked, setAllChecked] = useState(false);
  const { data: session } = useSession();

  const [requiredAgreed, setRequiredAgreed] = useState({
    terms: false,
    privacy: false,
    community: false,
    age: false,
  });
  const [optionalAgreed, setOptionalAgreed] = useState({
    marketing: false,
  });
  const router = useRouter();
  const { setUser } = useUserStore();

  //세션의 정보를 검사한 후, signedUpUser가 true이면 hompage으로 redirect
  useEffect(() => {
    if (session?.signedUpUser === true) {
      router.replace("/");
    }
  });

  //모든 약관 동의 버튼 상태 관리
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAllChecked(!allChecked);
    setRequiredAgreed({
      terms: checked,
      privacy: checked,
      community: checked,
      age: checked,
    });
    setOptionalAgreed({
      marketing: checked,
    });
  };

  //필수항목 체크 상태 관리
  const handleCheckRequired = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const checked = e.target.checked;
    setRequiredAgreed((prev) => ({
      ...prev,
      [field]: checked,
    }));

    setAllChecked(
      checked &&
        Object.values({
          ...requiredAgreed,
          ...optionalAgreed,
          [field]: checked,
        }).every((v) => v)
    );
  };

  //선택항목 체크 상태 관리
  const handleCheckOptional = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const checked = e.target.checked;

    setOptionalAgreed((prev) => ({
      ...prev,
      [field]: checked,
    }));

    setAllChecked(
      checked &&
        Object.values({
          ...requiredAgreed,
          ...optionalAgreed,
          [field]: checked,
        }).every((v) => v)
    );
    console.log("optional", optionalAgreed);
  };

  //동의하고 가치락 시작하기 버튼 눌렀을 때 API에 Response 요청
  const handleClick = async () => {
    if (session?.accessToken) {
      try {
        const response = await usePostUserCreateRequest(
          `Bearer ${session?.accessToken}`,
          optionalAgreed.marketing
        );
        const data = response.data;
        const updatedUser: User = mapUserResponse(data);
        setUser(updatedUser);
        if (data) {
          router.push("/");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  return (
    <div className="fixed inset-0 flex mx-auto items-center justify-center h-[566px] w-[390px] my-auto flex-col gap-y-[20px]">
      <div className="flex mx-auto mb-0">
        <img
          src="images/logo.png"
          alt="가치락 로고"
          className="h-[40px] w-[118px]"
        />
      </div>
      <div className="w-full h-[506px] bg-white border rounded-[10px] shadow-md">
        <div className="ml-[30px] text-[20px] font-semibold leading-7">
          <p className="mt-[30px]">환영합니다!</p>
          <p>아래 약관에 동의해주세요.</p>
        </div>
        <div className="ml-[30px] mt-[40px]">
          <div>
            {/* 모두선택하는 버튼 */}
            <input
              id="checkAll"
              type="checkbox"
              className="hidden"
              checked={allChecked}
              onChange={handleCheckAll}
            />
            <label htmlFor="checkAll" className="flex flex-row  gap-x-[10px]">
              {allChecked ? <CheckedIcon /> : <UncheckedIcon />}
              <span className="font-semibold text-[15px] leading-[22px]">
                모든 약관 동의
              </span>
            </label>
          </div>
          <hr className="w-[330px] h-[1px] bg-[#EEEEEE] my-[15px] mr-[30px]" />

          <div className="space-y-[15px]">
            {/* 서비스 이용약관 동의 */}
            <div className="flex items-center">
              <input
                id="checkTerms"
                type="checkbox"
                className="hidden"
                checked={requiredAgreed.terms}
                onChange={(e) => handleCheckRequired(e, "terms")}
              />
              <label
                htmlFor="checkTerms"
                className="flex flex-row gap-x-[10px]"
              >
                {requiredAgreed.terms ? <CheckedIcon /> : <UncheckedIcon />}
                <span className="text-[14px] leading-[20px]">
                  <span className="text-[#E62A2F]">필수</span> 서비스 이용약관
                  동의
                </span>
              </label>
              <button className="mr-[37px] flex ml-auto">
                <ArrowRightIcon />
              </button>
            </div>

            {/* 개인정보 수집 및 이용 동의 */}
            <div className="flex items-center">
              <input
                id="checkPrivacy"
                type="checkbox"
                className="hidden"
                checked={requiredAgreed.privacy}
                onChange={(e) => handleCheckRequired(e, "privacy")}
              />
              <label
                htmlFor="checkPrivacy"
                className="flex flex-row  gap-x-[10px]"
              >
                {requiredAgreed.privacy ? <CheckedIcon /> : <UncheckedIcon />}
                <span className="text-[14px] leading-[20px]">
                  <span className="text-[#E62A2F]">필수</span> 개인정보 수집 및
                  이용 동의
                </span>
              </label>
              <button className="mr-[37px] flex ml-auto">
                <ArrowRightIcon />
              </button>
            </div>

            {/* 커뮤니티 가이드 동의 */}
            <div className="flex items-center">
              <input
                id="checkCommunity"
                type="checkbox"
                className="hidden"
                checked={requiredAgreed.community}
                onChange={(e) => handleCheckRequired(e, "community")}
              />
              <label
                htmlFor="checkCommunity"
                className="flex flex-row  gap-x-[10px]"
              >
                {requiredAgreed.community ? <CheckedIcon /> : <UncheckedIcon />}
                <span className="text-[14px] leading-[20px]">
                  <span className="text-[#E62A2F]">필수 </span> 커뮤니티 가이드
                  동의
                </span>
              </label>
              <button className="mr-[37px] flex ml-auto">
                <ArrowRightIcon />
              </button>
            </div>

            {/* 만 19세 이상 동의 */}
            <div className="flex items-center">
              <input
                id="checkAge"
                type="checkbox"
                className="hidden"
                checked={requiredAgreed.age}
                onChange={(e) => handleCheckRequired(e, "age")}
              />
              <label htmlFor="checkAge" className="flex flex-row  gap-x-[10px]">
                {requiredAgreed.age ? <CheckedIcon /> : <UncheckedIcon />}
                <span className="text-[14px] leading-[20px]">
                  <span className="text-[#E62A2F]">필수</span> 만 19세 이상 동의
                  동의
                </span>
              </label>
              <button className="mr-[37px] flex ml-auto">
                <ArrowRightIcon />
              </button>
            </div>

            {/* 선택: 혜택 및 이벤트 알림 수신 동의 */}
            <div className="flex items-center">
              <input
                id="checkMarketing"
                type="checkbox"
                className="hidden"
                checked={optionalAgreed.marketing}
                onChange={(e) => handleCheckOptional(e, "marketing")}
              />
              <label
                htmlFor="checkMarketing"
                className="flex flex-row gap-x-[10px]"
              >
                {optionalAgreed.marketing ? <CheckedIcon /> : <UncheckedIcon />}
                <span className="text-[14px] leading-[20px]">
                  <span className="text-[#A3A3A3]">선택</span> 혜택 및 이벤트
                  알림 수신 동의
                </span>
              </label>
              <button className="mr-[37px] flex ml-auto">
                <ArrowRightIcon />
              </button>
            </div>
            <div className="flex items-center justify-center w-[249px] h-[28px] ml-[30px]">
              <span className="text-[11px] text-[#A3A3A3] leading-[14px]">
                수신 동의를 하지 않으면 맞춤형 추천 모임, 이벤트 소식 등
                멤버분들만을 위한 특별한 혜택 정보를 받을 수 없어요.
              </span>
            </div>
          </div>
        </div>
        {/* 동의하고 가치락 시작하기 버튼 */}
        <div className="w-[330px] h-[60px] flex items-center justify-center mx-auto mt-[30px]">
          <button
            className={`w-full mt-6 py-[19px] text-white font-bold rounded-lg ${
              Object.values(requiredAgreed).every(Boolean)
                ? "bg-[#E62A2F]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!Object.values(requiredAgreed).every(Boolean)}
            onClick={handleClick}
          >
            <span className="text-[15px] font-semibold flex items-center justify-center">동의하고 가치락 시작가기!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
