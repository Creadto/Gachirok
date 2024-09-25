"use client";
import { useState } from "react";
import useUserStore from "../store/user-store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProfileModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUserStore();
  const router = useRouter();
  const { data: session } = useSession();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlCreateProfileClick = () => {
    router.push("/create-profile");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="bg-red-500">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-5 text-gray-400 hover:text-gray-600 text-xl "
              onClick={handleClose}
            >X
            </button>
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 bg-pink-500 rounded-full flex items-center justify-center">
                <img src="/images/no-profile.png" alt="Profile Icon" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-center">
              {session?.user?.name} 님, 반가워요!
            </h2>
            <p className="text-center text-sm my-2">
              프로필 설정하고 가치가에서 함께 가치있는 여행을 즐겨보세요
            </p>
            <p className="text-xs text-gray-500 text-center mb-4">
              프로필을 설정하셔야 가치 커뮤니티 및 채팅 등 세부 기능을 원활하게
              사용하실 수 있습니다.
            </p>
            <div className="flex justify-center">
              <button
                className="bg-pink-500 text-white rounded-full py-2 px-6"
                onClick={handlCreateProfileClick}
              >
                프로필 설정하고 가치가 시작하기!
              </button>
            </div>
            <div className="text-center mt-3">
              <button className="text-gray-400 text-sm" onClick={handleClose}>
                나중에 하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
