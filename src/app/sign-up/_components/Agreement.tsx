"use client"
import { useState } from "react";

const Agreement = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [requiredAgreed, setRequiredAgreed] = useState({
    terms: false,
    privacy: false,
    community: false,
    age: false,
  });
  const[optionalAgreed, setOptionalAgreed] = useState({
    marketing: false
  })

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setRequiredAgreed({
      terms: checked,
      privacy: checked,
      community: checked,
      age: checked,
    });
    setOptionalAgreed({
      marketing: checked
    })
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const checked = e.target.checked;
    setRequiredAgreed((prev) => ({
      ...prev,
      [field]: checked,
    }));
    setAllChecked(
      checked && Object.values({ ...requiredAgreed, [field]: checked }).every((v) => v)
    );
  };

  // const handleSubmit = async() => {
  //   const res = await fetch("/users",{
  //     method: 'POST',
  //     body: {
  //       noticeMarketing: requiredAgreed,
  //     }
  //   })
  // }

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
                onChange={(e) => handleCheck(e, "terms")}
              />
              <span>필수: 서비스 이용약관 동의</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.privacy}
                onChange={(e) => handleCheck(e, "privacy")}
              />
              <span>필수: 개인정보 수집 및 이용 동의</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.community}
                onChange={(e) => handleCheck(e, "community")}
              />
              <span>필수: 커뮤니티 가이드 동의</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={requiredAgreed.age}
                onChange={(e) => handleCheck(e, "age")}
              />
              <span>필수: 만 19세 이상 동의</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={optionalAgreed.marketing}
                onChange={(e) => handleCheck(e, "marketing")}
              />
              <span>선택: 혜택 및 이벤트 알림 수신 동의</span>
            </div>
          </div>
        </div>
        <button
          className={`w-full mt-6 py-3 text-white font-bold ${
            allChecked
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!allChecked}
          // onSubmit={handleSubmit}
        >
          동의하고 가기!
        </button>
      </div>
    </div>
  );
};

export default Agreement;