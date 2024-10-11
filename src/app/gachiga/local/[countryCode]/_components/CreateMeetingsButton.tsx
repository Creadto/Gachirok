interface CreateMeetingsButtonProps {
  onClick: () => void;
}

/** 모임 개설하기 버튼
 * @Description 
 * @author 김영서
 **/
export const CreateMeetingsButton = ({
  onClick,
}: CreateMeetingsButtonProps) => {
  return (
    <button
      className=" border-double border-4 border-white rounded-2xl  bg-black  flex flew-row text-white w-max p-2 gap-[10px]"
      onClick={onClick}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="m-auto"
      >
        <path
          d="M3.04688 7H10.9544"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M7 3.04688L7 10.9544"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      모임 개설하기
    </button>
  );
};
