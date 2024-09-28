"use client";
import { usePostUserCreateRequest } from "@/core/hooks/usePostUserCreateRequest";
import { mapUserResponse } from "@/core/mapper/user-mapper";
import useUserStore, { User } from "@/core/store/user-store";
import axios from "axios";
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
  const { user, setUser } = useUserStore();

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
        const response = await usePostUserCreateRequest(`Bearer ${session?.accessToken}`, optionalAgreed.marketing)
        const data = response.data
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">환영합니다!</h1>
        <p className="mb-6">아래 약관에 동의해주세요.</p>
        <div className="space-y-4">
          <div className="flex items-center">
            {/* 모두선택하는 버튼 */}
            <input
              type="checkbox"
              className="mr-2"
              checked={allChecked}
              onChange={handleCheckAll}
            />
            <span>모든 약관 동의</span>
          </div>
          {/* 서비스 이용약관 동의 */}
          <div className="pl-4 space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.terms}
                onChange={(e) => handleCheckRequired(e, "terms")}
              />
              <span>필수: 서비스 이용약관 동의</span>
            </div>
            {/* 개인정보 수집 및 이용 동의 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.privacy}
                onChange={(e) => handleCheckRequired(e, "privacy")}
              />
              <span>필수: 개인정보 수집 및 이용 동의</span>
            </div>
            {/* 커뮤니티 가이드 동의 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.community}
                onChange={(e) => handleCheckRequired(e, "community")}
              />
              <span>필수: 커뮤니티 가이드 동의</span>
            </div>
            {/* 만 19세 이상 동의 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.age}
                onChange={(e) => handleCheckRequired(e, "age")}
              />
              <span>필수: 만 19세 이상 동의</span>
            </div>
            {/* 선택: 혜택 및 이벤트 알림 수신 동의 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={optionalAgreed.marketing}
                onChange={(e) => handleCheckOptional(e, "marketing")}
              />
              <span>선택: 혜택 및 이벤트 알림 수신 동의</span>
            </div>
          </div>
        </div>
        {/* 동의하고 가치락 시작하기 버튼 */}
        <button
          className={`w-full mt-6 py-3 text-white font-bold ${
            Object.values(requiredAgreed).every(Boolean)
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!Object.values(requiredAgreed).every(Boolean)}
          onClick={handleClick}
        >
          동의하고 가치락 시작가기!
        </button>
      </div>
    </div>
  );
};

export default Agreement;
