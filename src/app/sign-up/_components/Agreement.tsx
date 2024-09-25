"use client";
import useUserStore, { User } from "@/core/store/user-store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [signedUpUser, setSignedUpUser] = useState(false);
  const { user,setUser } = useUserStore();
  console.log("required", requiredAgreed);
  console.log("optional", optionalAgreed);

  useEffect(() => {
    if (session?.signedUpUser === true) {
      router.replace("/");
    }
  });

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
    console.log("Required", requiredAgreed),
      console.log("Optional", optionalAgreed);
  };

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

  const handleClick = async () => {
    console.log(optionalAgreed.marketing);
    if (session?.accessToken) {
      console.log("exists", session?.accessToken);
      try {
        const res = await axios.post(
          "/api/users",
          {
            deviceToken: Math.floor(Math.random() * 1000).toString(),
            countryCode: "China",
            noticeMarketing: optionalAgreed.marketing,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        const data = res.data;
        const updatedUser: User ={
          ...user,
          signedUpUser: true,
          userId: res.data.userId,
          platform: res.data.platform,
          email: res.data.email,
          referralCode: res.data.referralCode,
        }
        setUser(updatedUser);
        console.log("data", data)
        if (data) {
          router.push("/");
          console.log("user after", user)
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">환영합니다!</h1>
        <p className="mb-6">아래 약관에 동의해주세요.</p>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={allChecked}
              onChange={handleCheckAll}
            />
            <span>모든 약관 동의</span>
          </div>
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
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.privacy}
                onChange={(e) => handleCheckRequired(e, "privacy")}
              />
              <span>필수: 개인정보 수집 및 이용 동의</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.community}
                onChange={(e) => handleCheckRequired(e, "community")}
              />
              <span>필수: 커뮤니티 가이드 동의</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.age}
                onChange={(e) => handleCheckRequired(e, "age")}
              />
              <span>필수: 만 19세 이상 동의</span>
            </div>
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
        <button
          className={`w-full mt-6 py-3 text-white font-bold ${
            Object.values(requiredAgreed).every(Boolean)
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!Object.values(requiredAgreed).every(Boolean)}
          onClick={handleClick}
        >
          동의하고 가기!
        </button>
      </div>
    </div>
  );
};

export default Agreement;
