"use client";
import Link from "next/link";
import CountrySelector from "./CountrySelector";
import { countryStore } from "@/core/store/country-store";
import { useRouter } from "next/navigation";

/**
 * @Description 왼쪽 Navigation Bar
 * @author 김영서
 **/
const Sidebar = () => {
  const { country, setCountry } = countryStore();
  const router = useRouter();
  return (
      <aside className="fixed top-14 left-0 h-full w-64 bg-gray-100 shadow">
        <div className="p-4">
          {/* 현재 국가 선택 버튼 */}
          <CountrySelector />
          <nav className="space-y-2.5">
            {/* 홈 버튼 */}
            <button
                onClick={() => {
                  router.push("/");
                  setCountry("KR");
                }}
            >
              <div className="flex items-center space-x-2 mt-4 cursor-pointer">
                <span className="text-orange-500">🏠</span>
                <span className="text-orange-500">Home</span>
              </div>
            </button>

            <hr className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 text-black" />
            <div className="text-gray-500">Universal</div>

            {/* Universal - News */}
            <div className="space-y-2">
              <Link href="/news/universal">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>📰</span>
                  <span>News</span>
                </div>
              </Link>

              {/* Universal - Accouncement */}
              <Link
                  href={{
                    pathname: "/announcement/universal/section/1",
                    query:{page:'1',limit:'8',sort:'newest'},
                  }}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>📢</span>
                  <span>Announcement</span>
                </div>
              </Link>

              {/* Universal - Bulletin Board */}
              <Link href="/bulletin-board">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>📋</span>
                  <span>Bulletin Board</span>
                </div>
              </Link>
            </div>
            <hr className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
            <div className="text-gray-500">Local</div>

            {/* Local - News */}
            <div className="space-y-2">
              <Link href={`/news/local/${country}`}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>📰</span>
                  <span>News</span>
                </div>
              </Link>

              {/* Local - Accouncement */}
              <Link href={{
                pathname: `/announcement/local/${country}/section/1`,
                query:{page:'1',limit:'8',sort:'newest'},
              }}>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>📢</span>
                  <span>Announcement</span>
                </div>
              </Link>

              {/* Local - Gathering */}
              <Link href="/local/gathering">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>👥</span>
                  <span>Gathering</span>
                </div>
              </Link>

              {/* Local - Bulletin Board */}
              <button
                  onClick={() => router.push(`/bulletin-board/local/${country}`)}
              >
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>📰</span>
                  <span>Bulletin Board</span>
                </div>
              </button>

              {/* Local - Real Estate */}
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>Real Estate</span>
              </div>

              {/* Local - Flea Market */}
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>Flea Market</span>
              </div>

              {/* Local - Recruit */}
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>Recruit</span>
              </div>

              {/* Local - Shop */}
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>Shop</span>
              </div>
            </div>

            {/* Policy */}
            <hr className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>📰</span>
              <span>Policy</span>
            </div>
          </nav>
        </div>
      </aside>
  );
};

export default Sidebar;