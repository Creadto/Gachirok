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
    <aside className="fixed top-[100px] left-[20px] h-[879px] w-[230px] bg-white">
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


        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
