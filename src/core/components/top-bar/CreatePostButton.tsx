// components/FaEditButton.tsx
'use client'; // 클라이언트 컴포넌트로 정의

import React from 'react';
import { FaEdit } from 'react-icons/fa';

/**
 * @Description TopBar의 게시글 작성 버튼
 * @author 김영서
 **/
interface CreatePostButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full p-1.5 flex items-center justify-center shadow-lg ${
        isActive ? 'bg-pink-500' : 'bg-gray-200'
      }`}
    >
      {/* 활성화여부에 따른 버튼 모양 변경 */}
      <FaEdit className={`w-8 h-8 rounded-full object-cover ${isActive ? 'text-black' : 'text-white'}`} />
    </button>
  );
};

export default CreatePostButton;