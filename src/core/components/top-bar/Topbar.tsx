"use client";

import useEditButtonStore from "@/core/store/button-store";
import { countryStore } from "@/core/store/country-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatIcon from "../icons/top-bar/ChatIcon";
import LanguageIcon from "../icons/top-bar/LanguageIcon";
import NotificationIcon from "../icons/top-bar/NotificationIcon";
import SearchIcon from "../icons/top-bar/SearchIcon";
import CreatePostButton from "./CreatePostButton";
import CreatePostModal from "./CreatePostModal";
import ProfileIcon from "./ProfileIcon";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";

/** 상단 navigation bar에 대한 컴포넌트
 * @Description
 * @author 김영서
 **/
export default function Topbar() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [_isActive, setIsActive] = useState(false);
  const { active, setActive } = useEditButtonStore();
  const toggleModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setActive(!active);
  };
  const router = useRouter();
  const pathname = usePathname();
  const { country } = countryStore();

  //Edit Button이 활성화되는 경우(pathname)
  useEffect(() => {
    if (
      pathname === "/bulletin-board/universal/create" ||
      pathname === `/bulletin-board/local/${country}/create` ||
      pathname === `/bulletin-board/local/${country}/create/meetings` ||
      pathname === `/bulletin-board/local/${country}/create/real-estate` ||
      pathname === `/bulletin-board/local/${country}/create/recruiting` ||
      pathname === `/bulletin-board/local/${country}/create/flea-market`
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname, setIsActive, country]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 h-[80px]">
      <div className="top-[20px] bottom-[20px] flex relative">
        {/* 로고 */}
        <button
          onClick={() => router.push("/")}
          className="flex h-[48px] w-[118px] left-[20px] absolute"
        >
          <img src="/images/logo.png" alt="Gachirok" />
        </button>

        {/* 중앙 검색 바 */}
        <div className=" flex mx-[37.5%] justify-center items-center">
          <div className="relative w-[480px] h-[40px]">
            <SearchIcon />
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="w-full h-full px-10 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>
        <div className="flex absolute right-[50px] items-center justify-center h-[40px] gap-x-[30px] ">
          <div className="container flex my-[5px] space-x-[20px] h-[30px] relative">
            <div className="relative m-0 h-full">
              <CreatePostButton onClick={toggleModal} isActive={active} />
            </div>

            {/* 메세지 아이콘 */}
            <div className="relative m-0 h-full">
              <button>
                <ChatIcon />
              </button>
            </div>

            {/* 알림 */}
            <div className="relative m-0 h-full">
              <button>
                <NotificationIcon />
              </button>
            </div>

            {/* 언어 선택 */}
            <div className="relative m-0 h-full">
              <button className="flex items-center justify-center">
                <LanguageIcon />
                <ArrowDownIcon />
              </button>
            </div>
            {/* 프로필 아이콘 */}
          </div>
          <ProfileIcon />

        </div>
        
        
      </div>

      {isEditModalOpen && (
        <CreatePostModal
          onClickUniversal={() => {
            router.push("/bulletin-board/universal/create");
            setIsEditModalOpen(false);
            setActive(true);
          }}
          onClickLocal={() => {
            router.push(`/bulletin-board/local/${country}/create`);
            setIsEditModalOpen(false);
            setActive(true);
          }}
          toggleModal={toggleModal}
        />
      )}
    </header>
  );
}
