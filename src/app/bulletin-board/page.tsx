"use client";

import { ActiveBulletinBoardIcon } from "@/core/components/icons/side-bar/BulletinBoardIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UniversalPosts } from "./_components/UniversalPosts";

/**
 * @Description Universal Bulletin Board의 메인 페이지
 * @author 김영서
 **/
const UniversalBulletinBoardPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const size = searchParams ? Number(searchParams.get("size")) || 10 : 10;
  const [page, setPage] = useState(
    searchParams ? Number(searchParams.get("page")) || 0 : 0
  );

  useEffect(() => {
    console.log(page, size);
  }, [page, size]);

  return (
    <>
      <div className="ml-[8.1%] min-w-[1460px] max-w-[1460px] bg-yellow-100 flex mx-auto mr-[8.1%] flex-col">
        {/* 자유게시판 헤더 */}
        <header className="mt-[30px] flex gap-x-[5px]">
          <div className="rounded-full w-[30px] h-[30px] flex items-center justify-center bg-[#ffe9ea]">
            <ActiveBulletinBoardIcon />
          </div>
          <span className="font-bold text-[22px] flex">자유게시판</span>
          <div className="my-[3px] bg-[#dddddd] px-[7px] py-[3px] flex items-center justify-center rounded-[4px] ">
            <span className="text-[13px] text-[#808080]">Universal</span>
          </div>
        </header>

        {/* 게시글 표시 */}
        <UniversalPosts page={page} size={size} setPage={setPage} />
      </div>
    </>
  );
};

export default UniversalBulletinBoardPage;
