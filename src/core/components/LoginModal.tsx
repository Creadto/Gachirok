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
  const [loading, setLoading] = useState(false);
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
      console.log("response", response)
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
      console.log("response", response)
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
      console.log("response", response)
      setLoading(false);

    }
  };

  if (isModalOpen) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[480px] relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-6 text-black hover:text-gray-800"
            >
              &#10005;
            </button>
            <div className="text-center mb-4">
              <img
                src="/images/no-profile.png"
                alt="Logo"
                className="mx-auto w-12 h-12"
              />
              <div className="h-4" />
              <h2 className="text-2xl font-bold">
                가치락과 함께
                <br />
                가치를 더하세요
              </h2>
              <p className="text-gray-600">가치락 10초만에 시작하기</p>
              <div className="h-14" />
            </div>

            {/* 카카오 로그인 버튼 */}
            <div className="flex flex-col gap-y-2.5 ">
              <button
                className="bg-yellow-500 text-black py-2 rounded w-full relative"
                onClick={handleSignInKakao}
              >
                <RiKakaoTalkFill className="size-5 absolute top-2.5 left-2.5 bg-inherit" />
                카카오로 시작
              </button>

              {/* 애플 로그인 버튼 */}
              <button
                className="bg-black text-white py-2 rounded w-full relative"
                onClick={handleSignInApple}
              >
                <FaApple className="size-5 absolute top-2.5 left-2.5" />
                애플로 시작
              </button>
              <button
                className="bg-white border border-gray-300 py-2 rounded w-full relative"
                onClick={handleSignInGoogle}
              >
                <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                구글로 시작
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return;
};
