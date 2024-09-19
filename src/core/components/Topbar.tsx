import Sidebar from "./Sidebar";

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
            <span>싱가포르</span>
          </div>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className="px-4 py-2 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* 오른쪽 아이콘들 */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600">💬</button> {/* 채팅 아이콘 */}
          <button className="text-gray-600">➕ Create</button> {/* 생성 버튼 */}
          <button className="text-gray-600">🔔</button> {/* 알림 */}
          <button className="text-gray-600">🌐</button> {/* 언어 */}
          <div className="rounded-full bg-gray-200 w-8 h-8"></div> {/* 프로필 */}
        </div>
      </div>
    </header>
    );
  }