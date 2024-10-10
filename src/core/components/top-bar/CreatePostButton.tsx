// components/FaEditButton.tsx
"use client"; // 클라이언트 컴포넌트로 정의

import React from "react";
import { FaEdit } from "react-icons/fa";
import { ActiveEditIcon, EditIcon } from "../icons/top-bar/EditIcon";

/**
 * @Description TopBar의 게시글 작성 버튼
 * @author 김영서
 **/
interface CreatePostButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({
  isActive,
  onClick,
}) => {
  return (
    <button onClick={onClick}>
      {/* 활성화여부에 따른 버튼 모양 변경 */}
      {isActive ? <ActiveEditIcon /> : <EditIcon />}
    </button>
  );
};

export default CreatePostButton;
