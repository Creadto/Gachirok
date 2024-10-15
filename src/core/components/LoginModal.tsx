"use client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

/**
 * @Description 로그인관련 모달
 * @author 김영서
 **/
export const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  const handleSignInKakao = async () => {
    setLoading(true);
    const result = await signIn("kakao", {
      redirect: false,
      callbackUrl: session?.signedUpUser === true ? "/" : "/sign-up",
    });

    if (result?.ok) {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      console.log("response", response);
      setLoading(false);
    }
  };

  const handleSignInGoogle = async () => {
    setLoading(true);
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: session?.signedUpUser === true ? "/" : "/sign-up",
    });

    if (result?.ok) {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      console.log("response", response);
      setLoading(false);
    }
  };

  const handleSignInApple = async () => {
    setLoading(true);
    const result = await signIn("google", {
      redirect: false,
    });
    if (result?.ok) {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      console.log("response", response);
      setLoading(false);
    }
  };

  if (isModalOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-[10px] shadow-lg w-[390px] h-[506px] relative">
          <button
            onClick={closeModal}
            className="absolute top-[15px] right-[15px] text-black hover:text-gray-800"
          >
            &#10005;
          </button>
          <div className="text-center mb-4 mt-[50px]">
            <img
              src="/images/no-text-logo.png"
              alt="Logo"
              className="mx-auto w-12 h-12"
            />
          </div>

          <div className="flex items-center justify-center flex-col mt-[10px] h-[56px]">
            <p className="text-[20px] font-semibold leading-[28px] flex items-center justify-center">
              가치락과 함께
            </p>
            <p className="text-[20px] font-semibold leading-[28px] flex items-center justify-center">
              가치있는 여행을 즐겨보세요
            </p>
          </div>

          <p className="text-[#808080] mt-[40px] flex items-center justify-center text-[13px]">
            가치락 10초만에 시작하기
          </p>
          {/* 카카오 로그인 버튼 */}
          <div className="flex flex-col mt-[10px] gap-y-[10px]  ">
            <button
              className="bg-[#FFE000] text-black rounded-[8px] mx-[20px] relative h-[50px] flex flex-row space-x-[89px] items-center"
              onClick={handleSignInKakao}
            >
              <RiKakaoTalkFill className="size-[30px] ml-[15px] bg-inherit" />
              <span className="text-[15px] font-semibold block ">
                카카오로 시작
              </span>
            </button>

            {/* 애플 로그인 버튼 */}
            <button
              className="bg-black text-white rounded-[8px] mx-[20px] relative h-[50px] flex flex-row space-x-[89px] items-center"
              onClick={handleSignInApple}
            >
              <FaApple className="size-[30px] ml-[15px] bg-inherit" />
              <span className="text-[15px] font-semibold block ">
                애플로 시작
              </span>
            </button>

            {/* 구글 로그인 버튼 */}
            <button
              className="bg-white text-black border border-[#EEEEEE] rounded-[8px] mx-[20px] relative h-[50px] flex flex-row space-x-[89px] items-center"
              onClick={handleSignInGoogle}
            >
              <FcGoogle className="size-[30px] ml-[15px] bg-inherit" />
              <span className="text-[15px] font-semibold block ">
                구글로 시작
              </span>
            </button>
          </div>

          {/* 이용약관 / 개인정보처리방침 */}
          <div className="mt-[30px] w-full h-[18px] flex flex-row space-x-[15px] items-center justify-center text-[13px]">
            <button>이용약관</button>
            <button>개인정보처리방침</button>
          </div>
          <span className="flex mt-[10px] items-center justify-center whitespace-nowrap text-[11px] text-[#A3A3A3] ">
            &copy; 2024 Creadto. All rights reserved.
          </span>
        </div>
      </div>
    );
  }

  return;
};
