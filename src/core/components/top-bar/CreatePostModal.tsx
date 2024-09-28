"use client";

import { countryStore } from "@/core/store/country-store";

interface CreatePostModalProps {
  onClickUniversal: () => void;
  onClickLocal: () => void;
  toggleModal: () => void;
}

/**
 * @Description 글쓰기 버튼을 눌렀을 때 Universal or Local에 작성할지에 관한 모달창
 * @author 김영서
 **/
const CreatePostModal = ({
  onClickLocal,
  onClickUniversal,
  toggleModal,
}: CreatePostModalProps) => {
  const {countryName } = countryStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg">업로드 위치 선택</h2>

        <p>
          {`Universal' 또는 'Local : ${countryName}' 중 업로드 위치를
            선택해주세요.`}
        </p>
        <div className="flex flex-row gap-x-6 mt-6">
          <button
            className="border border-black"
            onClick={onClickUniversal}
          >
            Universal
          </button>
          <button className="border-black border" onClick={onClickLocal}>
            Local
          </button>
        </div>
        <button
          className="mt-4 bg-gray-200 px-4 py-2 rounded"
          onClick={toggleModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
