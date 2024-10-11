interface PreviewAndSubmitButtonProps{
    onClick: () => void;
}

/**
 * @Description 페이지 하단의 미리보기 버튼과 작성완료 버튼
 * @author 김영서
 **/
export const PreviewAndSubmitButton = ({onClick}: PreviewAndSubmitButtonProps) => {
  return (
    <div className="flex justify-between gap-x-5">

        {/* 미리보기 버튼 */}
      <button
        type="button"
        className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 ml-auto"
        onClick={onClick}
      >
        미리보기
      </button>

      {/* 작성 완료 버튼 */}
      <input
        type="submit"
        className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white mr-auto"
        value="작성 완료"
      />
    </div>
  );
};
