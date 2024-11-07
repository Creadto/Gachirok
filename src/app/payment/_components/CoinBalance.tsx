

export default function CoinBalance({coin} : {coin:number | undefined}){


    return(
        <div>
            {coin !== undefined ?
                <div className="flex flex-row py-[20px] border border-solid border-[#e6a55e] rounded-[10px] bg-[#e6a55e0d]">
                    <div className="px-[15px]">
                        <svg width="40" height="40" viewBox="0 0 20 20" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.701 10.291a8.802 8.802 0 0 1-1.858 5.43c-.26.338-.548.654-.86.945a8.137 8.137 0 0 1-1.55 1.177 6.635 6.635 0 0 1-.853.459c-.5.226-1.019.405-1.551.536-.278.063-.566.12-.852.162-.39.051-.782.077-1.174.078a3.499 3.499 0 0 1-.385-.014 8.5 8.5 0 0 1-.852-.07 8.31 8.31 0 0 1-1.551-.381 6.93 6.93 0 0 1-.852-.34 8.73 8.73 0 0 1-1.774-1.107 8.794 8.794 0 0 1 5.414-15.654 8.736 8.736 0 0 1 8.698 8.777"
                                fill="#FF8527"/>
                            <path d="M18.702 9.619a8.697 8.697 0 1 0-17.393 0 8.697 8.697 0 0 0 17.393 0z"
                                  fill="url(#36gx0o7kra)"/>
                            <path d="M3.139 9.62a6.861 6.861 0 1 0 13.722-.002 6.861 6.861 0 0 0-13.722.001z"
                                  fill="url(#n2elm4kcib)"/>
                            <path
                                d="M15.377 9.109a5.378 5.378 0 0 0-5.379 5.377 5.377 5.377 0 0 0-5.377-5.377A5.377 5.377 0 0 0 9.998 3.73a5.378 5.378 0 0 0 5.379 5.378z"
                                fill="#fff"/>
                            <defs>
                                <linearGradient id="36gx0o7kra" x1="10.005" y1=".922" x2="10.005" y2="18.315"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FEF887"/>
                                    <stop offset="1" stopColor="#FFA621"/>
                                </linearGradient>
                                <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#FC0"/>
                                    <stop offset="1" stopColor="#FF6F00"/>
                                </linearGradient>Warning: React does not recognize the `stopColor-` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `stopcolor-` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
                            </defs>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[#e6a45e] text-[15px]">
                            보유 코인
                        </div>
                        <div className="text-[18px]">
                            {coin}
                        </div>
                    </div>
                </div>
                : "로딩 중..."}
        </div>
    );
}