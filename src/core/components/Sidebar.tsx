import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="fixed top-14 left-0 h-full w-64 bg-gray-100 shadow">
      <div className="p-4">
        <nav className="space-y-4">
            <Link href='/'>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-orange-500">🏠</span>
            <span className="text-orange-500">Home</span>
          </div>
          </Link>
          <hr className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 text-black" />
          <div className="text-gray-500">Universal</div>
          <div className="space-y-2">
            <Link href="/universal/news">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>News</span>
              </div>
            </Link>
            <Link href="/universal/announcement">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📢</span>
                <span>Announcement</span>
              </div>
            </Link>
            <Link href="/universal/bulletinboard">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📋</span>
                <span>Bulletin Board</span>
              </div>
            </Link>
          </div>
          <hr className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <div className="text-gray-500">Local</div>
          <div className="space-y-2">
            <Link href="/local/news">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📰</span>
                <span>News</span>
              </div>
            </Link>
            <Link href="/local/announcement">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>📢</span>
                <span>Announcement</span>
              </div>
            </Link>
            <Link href="/local/gathering">
              <div className="flex items-center space-x-2 cursor-pointer">
                <span>👥</span>
                <span>Gathering</span>
              </div>
            </Link>
            <Link href="/local/bulletinboard">
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
