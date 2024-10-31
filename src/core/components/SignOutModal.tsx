interface SignOutModalProps {
  onClickClose: () => void;
  onClickSignOut: () => void;
}

const SignOutModal = ({ onClickClose, onClickSignOut }: SignOutModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="flex w-[295px] h-[203px] bg-white rounded-[15px]">
        <div className="mt-[30px] mb-[15px] mx-[15px] flex flex-col w-full gap-y-[40px]">
          {/* 로그아웃 Text */}
          <div className="flex flex-col gap-y-[10px] w-full">
            <span className="whitespace-nowrap text-[20px] font-semibold flex items-center mx-[59px] w-[147px] justify-center">
              로그아웃
            </span>
            <span className="whitespace-nowrap flex text-[14px] text-[#808080] w-[147px] items-center justify-center mx-[59px]">
              정말 로그아웃 하시겠어요?
            </span>
          </div>
          {/* 로그아웃 버튼 */}
          <div className="flex h-[60px] gap-x-[11px]">
            <button
              onClick={onClickClose}
              className="border border-none rounded-[8px] bg-[#EEEEEE] flex flex-1 h-full font-semibold text-[15px] m-auto items-center justify-center"
            >
              취소
            </button>
            <button
              onClick={onClickSignOut}
              className="border border-none rounded-[8px] flex flex-1 bg-black text-white font-semibold  text-[15px] h-full m-auto items-center justify-center"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
