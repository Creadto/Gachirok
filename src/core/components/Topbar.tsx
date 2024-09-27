import { FaBell, FaCommentAlt, FaEdit, FaGlobe } from "react-icons/fa";
import ProfileIcon from "./ProfileIcon";
import Country from "@/core/components/Country";

export default function Topbar() {

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
            <Country/> {/* 나라 이름 */}
          </div>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className="px-4 py-2 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* 오른쪽 아이콘들 */}
        <div className="flex items-center space-x-6 ">
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 p-1.5 flex items-center justify-center shadow-lg hover:bg-gray-300">
              <FaEdit className="w-8 h-8 rounded-full object-cover text-white border-solid border-black" />
            </button>
          </div>

          {/* Message Icon */}
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 p-1.5 flex items-center justify-center shadow-lg hover:bg-gray-300">
              <FaCommentAlt className="w-8 h-8 rounded-full object-cover text-white" />
            </button>
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 p-1.5 flex items-center justify-center shadow-lg hover:bg-gray-300">
              <FaBell className="w-8 h-8 rounded-full object-cover text-white border-solid border-black" />
            </button>
          </div>

          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-200 p-1.5 flex items-center justify-center shadow-lg hover:bg-gray-300">
              <FaGlobe className="w-8 h-8 rounded-full object-cover text-white border-solid border-black" />
            </button>
          </div>
          <ProfileIcon />
        </div>
      </div>
    </header>
  );
}
