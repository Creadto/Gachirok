"use client";

import React, { useEffect, useState } from "react";

const ScrollToButton: React.FC = () => {
  const [showBottomButton, setShowBottomButton] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  // 스크롤 위치에 따라 버튼의 표시 여부를 결정
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 특정 위치에 도달했는지 체크 (예: 화면 높이의 70% 이상)
    if (scrollPosition > windowHeight * 0.7) {
      setShowBottomButton(true);
      setShowTopButton(true);
    } else {
      setShowBottomButton(false);
      setShowTopButton(false);
    }
  };

  // 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 버튼 클릭 시 페이지 맨 아래로 스크롤
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  }

  return (
    <>
      {showBottomButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 right-4 bg-[#e62a2f] text-white p-2 rounded-full shadow-lg hover:animate-bounce"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              width={18}
              height={18}
              className="transform rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            <span className="text-xs flex items-center justify-center">
              
            </span>
          </div>
        </button>
      )}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[60px] right-4 bg-[#e62a2f] text-white p-2 rounded-full shadow-lg hover:animate-bounce"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              width={18}
              height={18}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            <span className="text-xs flex items-center justify-center">
              
            </span>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToButton;
