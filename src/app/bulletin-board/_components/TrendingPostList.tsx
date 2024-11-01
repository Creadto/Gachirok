"use client"
import React, { useState } from "react";
import { categoryMap, Post } from "../_types/PostResponse";
import { useRouter } from "next/navigation";

const TrendingPostList = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = 3;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < Math.ceil(posts.length / postsPerPage) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const startIndex = currentIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden">
        <div className="flex transition-all">
          {posts// Filter to show only trending posts
            .slice(startIndex, endIndex) // Get the current set of posts to display
            .map(post => (
              <div key={post.id} className="w-full p-4 border rounded-lg mx-2">
                <button onClick={() => router.push(`/bulletin-board/${post.id}`)}>
                <div className="flex justify-between items-center">
                  <div className="justify-start space-x-2">
                    <span className="text-sm text-gray-600 border border-solid bg-slate-300">
                    {Object.keys(categoryMap).find(key => categoryMap[key] === post.category)}</span>
                    <span className="text-sm text-white border border-solid bg-pink-500">인기글</span>
                  </div>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="mt-2 font-bold text-lg">{post.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-700">{post.author}</div>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>조회 {post.views}</span>
                    <span>추천 {post.likes}</span>
                    <span>댓글 {post.comments}</span>
                  </div>
                </div>
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Left Arrow */}
      {currentIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          onClick={handlePrev}
        >
          ◀
        </button>
      )}

      {/* Right Arrow */}
      {currentIndex < Math.ceil(posts.length / postsPerPage) - 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
          onClick={handleNext}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default TrendingPostList;