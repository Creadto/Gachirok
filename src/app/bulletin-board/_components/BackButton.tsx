import { BackIcon } from "@/core/components/icons/BackIcon";

interface BackButtonProps {
    onClick: () => void;
}
/**
 * @Description Bulletin Board에서 글을 작성할 때 사용되는 뒤로가기 버튼
 * @author 김영서
 **/
export const BackButton = ({onClick}: BackButtonProps) => {
    return(
     <button
        className="text-gray-500"
        onClick={onClick}
      >
        <BackIcon />
      </button>
    )
}