import React, { useState } from "react";

interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  trending: boolean;
}

const TrendingPostList = ({ posts }: { posts: Post[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < posts.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {posts.map((post) =>
            post.trending === true ? (
              <div
                key={post.id}
                className="min-w-[33.33%] p-4 border rounded-lg mx-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{post.category}</span>
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
              </div>
            ) : (
              <></>
            )
          )}
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
      {currentIndex < posts.length - 3 && (
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
