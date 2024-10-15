"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CloseIcon from "./icons/CloseIcon";

/**
 * @Description 약간동의 후 혹은, 사용자의 profile이 null일 때 등장하는 모달창
 * @author 김영서
 **/
const ProfileModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
        <div className="bg-white rounded-[10px] shadow-lg h-[462px] w-[390px] relative">
          {/* 오른쪽 상단 X버튼 */}
          <button
            className="absolute top-[15px] right-[15px] text-gray-400 hover:text-gray-600 text-xl "
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>

          {/* 로고 */}
          <div className=" mt-[50px] w-[50px] h-[50px] flex items-center justify-center mx-auto">
            <img src="/images/no-text-logo.png" alt="Profile Icon" />
          </div>

          {/* 사용자 이름 */}
          <span className="text-[14px] mt-[30px] text-[#808080] flex items-center justify-center">
            {session?.user?.name} 님, 반가워요!
          </span>

          {/* 프로필 설정 설명 */}
          <div className="w-[205px] h-[84px] flex items-center justify-center mt-[5px] mx-auto flex-col">
            <p
              className="font-semibold text-[20px] text-center"
              style={{ wordBreak: "keep-all", whiteSpace: "normal" }}
            >
              프로필 설정하고 가치락에서 함께 가치있는 여행을 즐겨보세요
            </p>
          </div>
          <div className="mt-5 w-[267px] h-[40px] flex items-center justify-center mx-auto">
            <p
              className="text-[14px] text-center text-[#808080]"
              style={{ wordBreak: "keep-all", whiteSpace: "normal" }}
            >
              프로필을 설정하셔야 가치 커뮤니티 및 채팅 등 세부 기능을 원활하게
              사용하실 수 있습니다.
            </p>
          </div>

          {/* 프로필 생성하기 버튼 */}
          <div className="flex justify-center w-[330px] h-[60px] mx-[30px] mt-[40px]">
            <button
              className="bg-[#E62A2F] text-white rounded-lg w-full"
              onClick={() => router.push("/create-profile")}
            >
              <span className="font-semibold text-[15px] ">
                프로필 설정하고 가치가 시작하기!
              </span>
            </button>
          </div>

          {/* 닫기 버튼 */}
          <div className="text-center mt-[15px]">
            <button onClick={() => setIsOpen(false)}>
              <span className="underline text-[13px]">나중에 하기</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
