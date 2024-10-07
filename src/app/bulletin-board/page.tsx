"use client";

import { useRouter } from "next/navigation";
import TrendingPostList from "./_components/TrendingPostList";
import PostList from "./_components/PostList";
import { useState } from "react";
import { categoryMap } from "./_types/Posts";
import { posts } from "./_data/mock_post";

/**
 * @Description Universal Bulletin Board의 메인 페이지
 * @author 김영서
 **/
const UniversalBulletinBoardPage = () => {
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState(1);

  //한 페이지당 포스트 개수 
  const postsPerPage = 8;
  

  const filteredPosts = selectedCategory === "전체"
    ? posts
    : posts.filter((post) => post.category === categoryMap[selectedCategory]);

    const totalPages =  Math.ceil(filteredPosts.length / postsPerPage);

  //slice를 통해서 현재 페이지의 시작이랑 끝 출력
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  //다음 페이지 
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //이전 페이지
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <header className="flex flex-row text-center my-8 h-8 gap-x-5">
          <h1 className="text-3xl font-bold">자유게시판</h1>
          <p className="text-xl border bg-slate-300 rounded-md">Universal</p>
        </header>

        <nav className="flex flex-row justify-start space-x-2 mb-6 items-center">
          <div className="flex-1">
            {Object.keys(categoryMap).map((label) => (
              <button
                key={label}
                className={`px-4 py-2 border rounded-md ${selectedCategory === label ? "bg-gray-200" : ""}`}
                onClick={() => {
                  setSelectedCategory(label);
                  setCurrentPage(1); //카테고리 바뀌면 1페이지로 자동 세팅
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-1 justify-end">
            <button
              className="px-4 py-2 bg-blue-300 text-white border border-solid border-black rounded-md"
              onClick={() => router.push("/bulletin-board/universal/create")}
            >
              글쓰기
            </button>
          </div>
        </nav>

        <div className="flex flex-row ">
          <h1 className="text-xl font-bold flex-1">인기글 </h1>
        </div>
        <TrendingPostList posts={posts.filter((post) => post.trending)} />
      </div>

      <h1 className="text-xl font-bold flex-1">{`${filteredPosts.length}개의 게시글`}</h1>
      <div>
        {currentPosts.length > 0 ? (
          <>
            <PostList filteredPosts={currentPosts} />
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === 1 ? "bg-gray-300" : "bg-white"
                }`}
              >
                이전 페이지
              </button>

              <span>
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === totalPages ? "bg-gray-300" : "bg-white"
                }`}
              >
                다음 페이지
              </button>
            </div>
          </>
        ) : (
          <p>해당 카테고리의 게시물이 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default UniversalBulletinBoardPage;
