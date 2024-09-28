"use client";
import { FaBell, FaCommentAlt, FaGlobe } from "react-icons/fa";

import useEditButtonStore from "@/core/store/button-store";
import { countryStore } from "@/core/store/country-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePostButton from "./CreatePostButton";
import CreatePostModal from "./CreatePostModal";
import ProfileIcon from "./ProfileIcon";

/** 상단 navigation bar에 대한 컴포넌트
 * @Description
 * @author 김영서
 **/
export default function Topbar() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { active, setActive } = useEditButtonStore();
  const toggleModal = () => setIsEditModalOpen(!isEditModalOpen);
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
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center space-x-2">
          <span className="text-orange-500 text-2xl font-bold">가치樂ROK</span>
        </div>

        {/* 중앙 검색 바 */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>🌍</span> {/* 위치 아이콘 */}
            <span>싱가포르</span>
          </div>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className="px-4 py-2 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* 오른쪽 아이콘들 */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <CreatePostButton onClick={toggleModal} isActive={active} />
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
          </div>

          {/* 메세지 아이콘 */}
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 p-1.5 flex items-center justify-center shadow-lg hover:bg-gray-300">
              <FaCommentAlt className="w-8 h-8 rounded-full object-cover text-white" />
            </button>
          </div>

          {/* 알림 */}
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 p-1.5 flex items-center justify-center shadow-lg hover:bg-gray-300">
              <FaBell className="w-8 h-8 rounded-full object-cover text-white border-solid border-black" />
            </button>
          </div>

          {/* 언어 선택 */}
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 p-1.5 flex items-center justify-center shadow-lg hover:bg-gray-300">
              <FaGlobe className="w-8 h-8 rounded-full object-cover text-white border-solid border-black" />
            </button>
          </div>
          {/* 프로필 아이콘 */}
          <ProfileIcon />
        </div>
      </div>
    </header>
  );
}
