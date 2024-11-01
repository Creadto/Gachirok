interface AlertToastProps {
content: string;
}

export const AlertToast = ({content}:AlertToastProps) => {
  return(
    <div className="flex flex-row item-center fixed bottom-[50px] right-[50px] w-[320px] h-[60px] px-[20px] py-[15px] border border-l-4 border-solid border-[#eee] border-l-[#e62a2f] rounded-[5px] bg-[#fff] animate-bounce">
    <div className="flex items-center justify-center mr-[15px]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#fgfdvtzs6a)">
          <path
            d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z"
            fill="#E62A2F"
          />
          <path
            d="m5.672 8.708 2.565 2.565L12.33 6.73"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="fgfdvtzs6a">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
    <hr className="w-[1px] h-[30px] bg-[#eee]" />
    <div className="flex items-center justify-center ml-[15px] text-[15px]">
      {content}
    </div>
  </div>
  )
}