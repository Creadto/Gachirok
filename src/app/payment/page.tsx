"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import BootPayModule from "@/app/_component/_payment/BootPayModule";

export default function PaymentPage(){

    const {data: session} = useSession();
    const [coin, setCoin] = useState();
    const [userId, setUserId] = useState<string>();

    const getCoinData = async () => { // 코인 개수 가져오기
        if (session?.accessToken) {
            try {
                const response = await axios.get("/api/coin", {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                setCoin(response.data[0].coin);
            } catch (error) {
                console.error("Error getCoin data:", error);
            }
        }
    }

    const getUserData = async () => {
        if (session?.accessToken) {
            try{
                const response = await axios.get("/api/users", {
                    headers:{
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });
                setUserId((response.data.userId).toString());
            }
            catch (error) {
                console.error("Error getUserData:", error);
            }
        }
    }

    const onClickCoin = (price:number, orderName: string, userId:string)=>{
        BootPayModule({price,orderName,userId});
    }


    useEffect(() => {
        getCoinData();
        getUserData();
    },[session])


    return(
        <div className="w-[800px] flex flex-col items-center justify-center">

            <div className="flex justify-center mb-[50px] text-[50px] font-bold text-gray-800">
                아이템 상점
            </div>

            <div className="mb-4 w-full max-w-[50%]">
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
                                        <stop stop-color="#FEF887"/>
                                        <stop offset="1" stop-color="#FFA621"/>
                                    </linearGradient>
                                    <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FC0"/>
                                        <stop offset="1" stop-color="#FF6F00"/>
                                    </linearGradient>
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

            <div className="flex flex-row w-full">
                <div className="w-full max-w-[50%] border rounded-2xl bg-white shadow-lg p-4">

                    <div
                        className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                        onClick={() => {
                            if (typeof userId === "string") {
                                onClickCoin(1000, "1VC 충전", userId)
                            }
                        }}
                    >
                        <div className="flex flex-row items-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="none"
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
                                        <stop stop-color="#FEF887"/>
                                        <stop offset="1" stop-color="#FFA621"/>
                                    </linearGradient>
                                    <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FC0"/>
                                        <stop offset="1" stop-color="#FF6F00"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-gray-700 font-bold">
                                1 코인
                            </div>
                        </div>
                        <div className="px-4 py-1 rounded-xl text-sm font-semibold">
                            1,000원
                        </div>
                    </div>


                    <div
                        className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]">
                        <div className="flex flex-row items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
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
                                        <stop stop-color="#FEF887"/>
                                        <stop offset="1" stop-color="#FFA621"/>
                                    </linearGradient>
                                    <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FC0"/>
                                        <stop offset="1" stop-color="#FF6F00"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex flex-col text-gray-700 font-bold">
                                5 코인
                                <div className="text-[12px] text-[#0075ff]">
                                    + 1 코인 추가제공
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-1 rounded-xl text-sm font-semibold">
                            5,000원
                        </div>
                    </div>

                    <div
                        className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]">
                        <div className="flex flex-row items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
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
                                        <stop stop-color="#FEF887"/>
                                        <stop offset="1" stop-color="#FFA621"/>
                                    </linearGradient>
                                    <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FC0"/>
                                        <stop offset="1" stop-color="#FF6F00"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-gray-700 font-bold">
                                10 코인
                                <div className="text-[12px] text-[#0075ff]">
                                    + 3 코인 추가제공
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-1 rounded-xl text-sm font-semibold">
                            10,000원
                        </div>
                    </div>

                    <div
                        className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]">
                        <div className="flex flex-row items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
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
                                        <stop stop-color="#FEF887"/>
                                        <stop offset="1" stop-color="#FFA621"/>
                                    </linearGradient>
                                    <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FC0"/>
                                        <stop offset="1" stop-color="#FF6F00"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-gray-700 font-bold">
                                30 코인
                                <div className="text-[12px] text-[#0075ff]">
                                    + 10 코인 추가제공
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-1 rounded-xl text-sm font-semibold">
                            30,000원
                        </div>
                    </div>

                    <div
                        className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]">
                        <div className="flex flex-row items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
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
                                        <stop stop-color="#FEF887"/>
                                        <stop offset="1" stop-color="#FFA621"/>
                                    </linearGradient>
                                    <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FC0"/>
                                        <stop offset="1" stop-color="#FF6F00"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-gray-700 font-bold">
                                50 코인
                                <div className="text-[12px] text-[#0075ff]">
                                    + 20 코인 추가제공
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-1 rounded-xl text-sm font-semibold">
                            50,000원
                        </div>
                    </div>

                    <div
                        className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]">
                        <div className="flex flex-row items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
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
                                        <stop stop-color="#FEF887"/>
                                        <stop offset="1" stop-color="#FFA621"/>
                                    </linearGradient>
                                    <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FC0"/>
                                        <stop offset="1" stop-color="#FF6F00"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-gray-700 font-bold">
                                100 코인
                                <div className="text-[12px] text-[#0075ff]">
                                    + 50 코인 추가제공
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-1 rounded-xl text-sm font-semibold">
                            100,000원
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[50%] border rounded-2xl bg-white shadow-lg p-4">
                    여긴 퍀키지
                </div>
            </div>

            <div className="flex flex-col">
                <p>문의, 모임 콘텐츠에 사용할 수 있습니다.</p>
                <p>포인트는 구매완료 후 환불이 불가능합니다.</p>
                <div>
                    서비스 이용약관 >
                </div>
            </div>
        </div>
    );
}
