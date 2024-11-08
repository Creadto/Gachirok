

export default function GuestPackage({subscribeTime,allTime} : {subscribeTime : string | null | undefined, allTime : string | null | undefined}) {



    return (
        <div className="w-full max-w-[20%] border rounded-2xl bg-white shadow-lg p-4">
            <div className="mb-[24px]">
                <h1 className="text-[18px] font-bold">게스트 패키지</h1>
                <p className="text-[13x] text-[#a3a3a3]">모임 참여 기능 활성화</p>
            </div>
            <div className="text-[16px]">
                <div
                    className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                    onClick={() => {
                    }}
                >
                    <div className="flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path data-name="사각형 146138" style={{fill:"none"}} d="M0 0h24v24H0z"/>
                            <g data-name="그룹 82851">
                                <g data-name="그룹 82849">
                                    <path data-name="패스 43301"
                                          d="M5.444 4.354V2.62A1.62 1.62 0 0 1 7.064 1h10.37a1.62 1.62 0 0 1 1.62 1.62v15.716a1.62 1.62 0 0 1-1.62 1.62H7.064a1.62 1.62 0 0 1-1.62-1.62v-1.9"
                                          transform="translate(1.166 1.522)"
                                          style={{strokeMiterlimit:10,stroke:"#91949b",strokeLinecap:"round",strokeWidth:"1.5px",fill:"none"}}/>
                                    <path data-name="빼기 2"
                                          d="M7.136 18.956a1.632 1.632 0 0 1-.739-.178l-5.755-2.9A1.2 1.2 0 0 1 0 14.809V4.147a1.2 1.2 0 0 1 .643-1.073L6.4.178A1.632 1.632 0 0 1 7.136 0a1.761 1.761 0 0 1 1.712 1.8v15.354a1.761 1.761 0 0 1-1.712 1.802zM3.176 8.44a1.038 1.038 0 1 0 1.038 1.037A1.04 1.04 0 0 0 3.176 8.44z"
                                          transform="translate(11.374 2.522)"
                                          style={{stroke:"transparent",fill:"#91949b",strokeMiterlimit:10}}/>
                                    <g data-name="그룹 82852">
                                        <path data-name="패스 43303"
                                              d="M6.225 13.6H1.648a.5.5 0 0 1-.537-.543v-1.6a.5.5 0 0 1 .537-.543h4.577a.626.626 0 0 1 .685.543v1.6a.626.626 0 0 1-.685.543"
                                              transform="translate(.29 -.261)" style={{fill:"#91949b"}}/>
                                        <path data-name="패스 43304"
                                              d="M4.78 15.708V9.58a.471.471 0 0 1 .776-.359l3.478 2.958a.472.472 0 0 1 .012.708l-3.478 3.17a.471.471 0 0 1-.789-.348"
                                              transform="translate(1.068 -.644)"  style={{fill:"#91949b"}}/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        1회
                    </div>
                    <div className="flex flex-row rounded-[13px] bg-[#fff] p-[2px] pr-[13px] text-[12px] items-center">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="mr-[13px]"
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
                                </linearGradient>
                                Warning: React does not recognize the `stopColor-` prop on a DOM element. If you
                                intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase
                                `stopcolor-` instead. If you accidentally passed it from a parent component, remove it
                                from the DOM element.
                            </defs>
                        </svg>
                        5
                    </div>
                </div>
                <div
                    className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                    onClick={() => {
                    }}
                >
                    <div className="flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path data-name="사각형 146138" style={{fill: "none"}} d="M0 0h24v24H0z"/>
                            <g data-name="그룹 82851">
                                <g data-name="그룹 82849">
                                    <path data-name="패스 43301"
                                          d="M5.444 4.354V2.62A1.62 1.62 0 0 1 7.064 1h10.37a1.62 1.62 0 0 1 1.62 1.62v15.716a1.62 1.62 0 0 1-1.62 1.62H7.064a1.62 1.62 0 0 1-1.62-1.62v-1.9"
                                          transform="translate(1.166 1.522)"
                                          style={{
                                              strokeMiterlimit: 10,
                                              stroke: "#91949b",
                                              strokeLinecap: "round",
                                              strokeWidth: "1.5px",
                                              fill: "none"
                                          }}/>
                                    <path data-name="빼기 2"
                                          d="M7.136 18.956a1.632 1.632 0 0 1-.739-.178l-5.755-2.9A1.2 1.2 0 0 1 0 14.809V4.147a1.2 1.2 0 0 1 .643-1.073L6.4.178A1.632 1.632 0 0 1 7.136 0a1.761 1.761 0 0 1 1.712 1.8v15.354a1.761 1.761 0 0 1-1.712 1.802zM3.176 8.44a1.038 1.038 0 1 0 1.038 1.037A1.04 1.04 0 0 0 3.176 8.44z"
                                          transform="translate(11.374 2.522)"
                                          style={{stroke: "transparent", fill: "#91949b", strokeMiterlimit: 10}}/>
                                    <g data-name="그룹 82852">
                                        <path data-name="패스 43303"
                                              d="M6.225 13.6H1.648a.5.5 0 0 1-.537-.543v-1.6a.5.5 0 0 1 .537-.543h4.577a.626.626 0 0 1 .685.543v1.6a.626.626 0 0 1-.685.543"
                                              transform="translate(.29 -.261)" style={{fill: "#91949b"}}/>
                                        <path data-name="패스 43304"
                                              d="M4.78 15.708V9.58a.471.471 0 0 1 .776-.359l3.478 2.958a.472.472 0 0 1 .012.708l-3.478 3.17a.471.471 0 0 1-.789-.348"
                                              transform="translate(1.068 -.644)" style={{fill: "#91949b"}}/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        하루 무제한
                    </div>
                    <div className="flex flex-row rounded-[13px] bg-[#fff] p-[2px] pr-[13px] text-[12px] items-center">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="mr-[13px]"
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
                                </linearGradient>
                                Warning: React does not recognize the `stopColor-` prop on a DOM element. If you
                                intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase
                                `stopcolor-` instead. If you accidentally passed it from a parent component, remove it
                                from the DOM element.
                            </defs>
                        </svg>
                        5
                    </div>
                </div>
                <div
                    className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                    onClick={() => {
                    }}
                >

                    <div className="flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path data-name="사각형 146138" style={{fill: "none"}} d="M0 0h24v24H0z"/>
                            <g data-name="그룹 82851">
                                <g data-name="그룹 82849">
                                    <path data-name="패스 43301"
                                          d="M5.444 4.354V2.62A1.62 1.62 0 0 1 7.064 1h10.37a1.62 1.62 0 0 1 1.62 1.62v15.716a1.62 1.62 0 0 1-1.62 1.62H7.064a1.62 1.62 0 0 1-1.62-1.62v-1.9"
                                          transform="translate(1.166 1.522)"
                                          style={{
                                              strokeMiterlimit: 10,
                                              stroke: "#91949b",
                                              strokeLinecap: "round",
                                              strokeWidth: "1.5px",
                                              fill: "none"
                                          }}/>
                                    <path data-name="빼기 2"
                                          d="M7.136 18.956a1.632 1.632 0 0 1-.739-.178l-5.755-2.9A1.2 1.2 0 0 1 0 14.809V4.147a1.2 1.2 0 0 1 .643-1.073L6.4.178A1.632 1.632 0 0 1 7.136 0a1.761 1.761 0 0 1 1.712 1.8v15.354a1.761 1.761 0 0 1-1.712 1.802zM3.176 8.44a1.038 1.038 0 1 0 1.038 1.037A1.04 1.04 0 0 0 3.176 8.44z"
                                          transform="translate(11.374 2.522)"
                                          style={{stroke: "transparent", fill: "#91949b", strokeMiterlimit: 10}}/>
                                    <g data-name="그룹 82852">
                                        <path data-name="패스 43303"
                                              d="M6.225 13.6H1.648a.5.5 0 0 1-.537-.543v-1.6a.5.5 0 0 1 .537-.543h4.577a.626.626 0 0 1 .685.543v1.6a.626.626 0 0 1-.685.543"
                                              transform="translate(.29 -.261)" style={{fill: "#91949b"}}/>
                                        <path data-name="패스 43304"
                                              d="M4.78 15.708V9.58a.471.471 0 0 1 .776-.359l3.478 2.958a.472.472 0 0 1 .012.708l-3.478 3.17a.471.471 0 0 1-.789-.348"
                                              transform="translate(1.068 -.644)" style={{fill: "#91949b"}}/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        일주일 무제한
                    </div>
                    <div className="flex flex-row rounded-[13px] bg-[#fff] p-[2px] pr-[13px] text-[12px] items-center">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="mr-[13px]"
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
                                </linearGradient>
                                Warning: React does not recognize the `stopColor-` prop on a DOM element. If you
                                intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase
                                `stopcolor-` instead. If you accidentally passed it from a parent component, remove it
                                from the DOM element.
                            </defs>
                        </svg>
                        10
                    </div>
                </div>
                <div
                    className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                    onClick={() => {
                    }}
                >

                    <div className="flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path data-name="사각형 146138" style={{fill: "none"}} d="M0 0h24v24H0z"/>
                            <g data-name="그룹 82851">
                                <g data-name="그룹 82849">
                                    <path data-name="패스 43301"
                                          d="M5.444 4.354V2.62A1.62 1.62 0 0 1 7.064 1h10.37a1.62 1.62 0 0 1 1.62 1.62v15.716a1.62 1.62 0 0 1-1.62 1.62H7.064a1.62 1.62 0 0 1-1.62-1.62v-1.9"
                                          transform="translate(1.166 1.522)"
                                          style={{
                                              strokeMiterlimit: 10,
                                              stroke: "#91949b",
                                              strokeLinecap: "round",
                                              strokeWidth: "1.5px",
                                              fill: "none"
                                          }}/>
                                    <path data-name="빼기 2"
                                          d="M7.136 18.956a1.632 1.632 0 0 1-.739-.178l-5.755-2.9A1.2 1.2 0 0 1 0 14.809V4.147a1.2 1.2 0 0 1 .643-1.073L6.4.178A1.632 1.632 0 0 1 7.136 0a1.761 1.761 0 0 1 1.712 1.8v15.354a1.761 1.761 0 0 1-1.712 1.802zM3.176 8.44a1.038 1.038 0 1 0 1.038 1.037A1.04 1.04 0 0 0 3.176 8.44z"
                                          transform="translate(11.374 2.522)"
                                          style={{stroke: "transparent", fill: "#91949b", strokeMiterlimit: 10}}/>
                                    <g data-name="그룹 82852">
                                        <path data-name="패스 43303"
                                              d="M6.225 13.6H1.648a.5.5 0 0 1-.537-.543v-1.6a.5.5 0 0 1 .537-.543h4.577a.626.626 0 0 1 .685.543v1.6a.626.626 0 0 1-.685.543"
                                              transform="translate(.29 -.261)" style={{fill: "#91949b"}}/>
                                        <path data-name="패스 43304"
                                              d="M4.78 15.708V9.58a.471.471 0 0 1 .776-.359l3.478 2.958a.472.472 0 0 1 .012.708l-3.478 3.17a.471.471 0 0 1-.789-.348"
                                              transform="translate(1.068 -.644)" style={{fill: "#91949b"}}/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        한달 무제한
                    </div>
                    <div className="flex flex-row rounded-[13px] bg-[#fff] p-[2px] pr-[13px] text-[12px] items-center">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="mr-[13px]"
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
                                </linearGradient>
                                Warning: React does not recognize the `stopColor-` prop on a DOM element. If you
                                intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase
                                `stopcolor-` instead. If you accidentally passed it from a parent component, remove it
                                from the DOM element.
                            </defs>
                        </svg>
                        30
                    </div>
                </div>
            </div>
        </div>
    );
}