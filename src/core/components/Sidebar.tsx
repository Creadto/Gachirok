import Link from "next/link";
import CountryDropDown from "@/core/components/CountryDropDown";




const Sidebar = () => {
  return (
    <aside className="fixed top-14 left-0 h-full w-64 bg-gray-100 shadow">
      <div className="p-4">
        <nav className="space-y-4">
          <div className="border-2 p-1">
            <p className="text-gray-500">현재 국가</p>
            <CountryDropDown list={["대한민국","일본","중국","미국","싱가포르"]}/>
          </div>
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-orange-500">🏠</span>
              <span className="text-orange-500">Home</span>
            </div>
          </Link>
          <hr className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 text-black" />
          <div className="text-gray-500">Universal</div>
          <div className="space-y-2">
            <Link href="/news/universal">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>News</span>
              </div>
            </Link>
            <Link href="/announcement">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📢</span>
                <span>Announcement</span>
              </div>
            </Link>
            <Link href="/bulletinboard">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📋</span>
                <span>Bulletin Board</span>
              </div>
            </Link>
          </div>
          <hr className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <div className="text-gray-500">Local</div>
          <div className="space-y-2">
            <Link href="/news">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>News</span>
              </div>
            </Link>
            <Link href="/announcement">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📢</span>
                <span>Announcement</span>
              </div>
            </Link>
            <Link href="/gathering">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>👥</span>
                <span>Gathering</span>
              </div>
            </Link>
            <Link href="/bulletinboard">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>Bulletin Board</span>
              </div>
            </Link>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>📰</span>
              <span>Real Estate</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>📰</span>
              <span>Flea Market</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>📰</span>
              <span>Recruit</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span>📰</span>
              <span>Shop</span>
            </div>
          </div>
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
