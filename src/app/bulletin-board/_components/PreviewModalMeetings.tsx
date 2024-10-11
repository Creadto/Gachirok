// components/PreviewModal.js
import React from "react";

interface PreviewModalMeetingsProps {
    isOpen: boolean,
    onClose: () => void,
    formData: any
}

/**
 * @Description 자유게시판 미리보기 창 모달
 * @author 김영서
 **/
const PreviewModalMeetings = ({ isOpen, onClose, formData }: PreviewModalMeetingsProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">미리보기</h2>
        <div className="mb-4">
          <strong>카테고리:</strong> {formData.category || "없음"}
        </div>
        <div className="mb-4">
          <strong>주제:</strong> {formData.title || "없음"}
        </div>
        <div className="mb-4">
          <strong>글 내용:</strong>
          <div
            className="p-2 bg-gray-100 rounded border"
            dangerouslySetInnerHTML={{ __html: formData.content }}
          />
        </div>
        <div className="mb-4">
          <strong>이미지 개수:</strong>{" "}
          {formData.images ? `${formData.images.length}개` : "0개"}
        </div>
        <div className="mb-4">
          <strong>위치:</strong> {formData.location || "없음"}
        </div>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default PreviewModalMeetings;