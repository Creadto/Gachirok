"use client";

import { useRouter } from "next/navigation";

/**
 * @Description Universal Bulletin Board의 메인 페이지
 * @author 김영서
 **/
const UniversalBulletinBoardPage = () => {
  const router = useRouter();
  return (
    <>
      <div>Bulletin Board</div>
      <button
        className="bg-blue-300 text-white border border-solid border-black rounded-md"
        onClick={() => router.push("/bulletin-board/universal/create")}
      >
        글쓰기
      </button>
    </>
  );
};

export default UniversalBulletinBoardPage;
