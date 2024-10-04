"use client";

import { useRouter } from "next/navigation";
import TrendingPostList from "./_components/TrendingPostList";
import PostList from "./_components/PostList";

/**
 * @Description Universal Bulletin Board의 메인 페이지
 * @author 김영서
 **/
const UniversalBulletinBoardPage = () => {
  const router = useRouter();

  const trendingPosts = [
    {
      id: 1,
      category: "일상토크",
      title: "롤 브론즈",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: true
    },
    {
      id: 2,
      category: "정보공유",
      title: "롤 실버",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: true
    },
    {
      id: 3,
      category: "정보공유",
      title: "롤 골드",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: true
    },
    {
      id: 4,
      category: "정보공유",
      title: "롤 플레",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: false
    },
    {
      id: 5,
      category: "정보공유",
      title: "롤 에메랄드",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: false
    },
    {
      id: 6,
      category: "정보공유",
      title: "롤 다이아몬드",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: true
    },
    {
      id: 7,
      category: "정보공유",
      title: "롤 마스터",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: false
    },
    {
      id: 8,
      category: "정보공유",
      title: "롤 그랜드 마스터",
      author: "별빛여행자",
      date: "24-08-26",
      views: 301,
      likes: 3,
      comments: 3,
      trending: true
    },
  
  ];

  return (
    <>
      <div className="container mx-auto">
        <header className=" flex flex-row text-center my-8 h-8 gap-x-5">
          <h1 className="text-3xl font-bold">자유게시판</h1>
          <p className="text-xl border bg-slate-300 rounded-md">Universal</p>
        </header>

        <nav className="flex flex-row justify-start space-x-2 mb-6 items-center">
          <div className="flex-1">
            <button className="px-4 py-2 border rounded-md">전체</button>
            <button className="px-4 py-2 border rounded-md ">일상토크</button>
            <button className="px-4 py-2 border rounded-md">정보공유</button>
            <button className="px-4 py-2 border rounded-md">질문답변</button>
            <button className="px-4 py-2 border rounded-md">자유토론</button>
            <button className="px-4 py-2 border rounded-md">고민상담</button>
          </div>
          <div className="flex flex-1 justify-end">
          <button
            className="px-4 py-2  bg-blue-300 text-white border border-solid border-black rounded-md"
            onClick={() => router.push("/bulletin-board/universal/create")}
          >
            글쓰기
          </button></div>
        </nav>

        <div className="flex flex-row ">
          <h1 className="text-xl font-bold flex-1">인기글 </h1>
        </div>
        <TrendingPostList posts={trendingPosts} />
      </div>

      <h1 className="text-xl font-bold flex-1">52개의 게시글 </h1>
      <PostList posts={trendingPosts} />
      
    </>
  );
};

export default UniversalBulletinBoardPage;
