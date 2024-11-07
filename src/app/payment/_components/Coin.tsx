"use client";

import {Bootpay} from "@bootpay/client-js";
import axios from "axios";
import {useSession} from "next-auth/react";

export default function Coin({userId}: { userId: string | undefined }) {


    const {data: session} = useSession();

    const handlePayment = async (price: number, orderName: string) => {
        let chargeCoin: number = 0;
        const coinCount = price / 1000;
        switch (coinCount) {
            case 1:
                chargeCoin = 1
                break;
            case 5:
                chargeCoin = 6
                break;
            case 10:
                chargeCoin = 13
                break;
            case 30:
                chargeCoin = 40
                break;
            case 50:
                chargeCoin = 70
                break;
            case 100:
                chargeCoin = 150
                break;
            default:
                console.log("unexpected result");
                break;
        }

        try {
            const response = await Bootpay.requestPayment({
                "application_id": "67297d983aa7c4faf96e4ef3",
                "price": price,
                "order_name": orderName,
                "order_id": `${userId}-${Date.now().toString()}`,
                "pg": "나이스페이",
                "method": "카드",
                "tax_free": 0,
                "user": {
                    "id": userId, // user pk
                },
                "items": [
                    {
                        "id": `purchase_${coinCount}vc`,
                        "name": orderName,
                        "qty": 1,
                        "price": price
                    },
                ],
                "extra": {
                    "open_type": "iframe",
                    "escrow": false
                }
            });
            switch (response.event) {
                case 'issue':
                    break // 가상계좌 입급 완료 처리
                case 'done':
                    if (session?.accessToken) {
                        try {
                            const response = await axios.post("/api/coin", {
                                    chargeCoin: chargeCoin
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${session.accessToken}`,
                                    }
                                })
                            console.log(response);
                            window.location.reload();;
                        } catch (e) {
                            console.log(e.message);
                        }
                    } else { // 토큰이 없을 경우
                        console.log("No tokens");
                    }
                    break // 결제 완료 처리
                case 'confirm': //payload.extra.separately_confirmed = true; 일 경우 승인 전 해당 이벤트가 호출됨
                    console.log(response.receipt_id);
                    /**
                     * 1. 클라이언트 승인을 하고자 할때
                     * // validationQuantityFromServer(); //예시) 재고확인과 같은 내부 로직을 처리하기 한다.
                     */
                    const confirmedData = await Bootpay.confirm()

                    if (confirmedData.event === 'done') {
                        //결제 성공
                    }
                    break;

            }
        } catch (e) {
            // 결제 진행중 오류 발생
            // e.error_code - 부트페이 오류 코드
            // e.pg_error_code - PG 오류 코드
            // e.message - 오류 내용
            console.log(e.message);
            switch (e.event) {
                case 'cancel':
                    console.log(e.message);
                    break
                case 'error':
                    console.log(e.error_code);
                    break
            }
        }
    }


    return (
        <div className="w-full max-w-[20%] border rounded-2xl bg-white shadow-lg p-4">
            <div
                className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                onClick={() => {
                    handlePayment(1000, "1VC 충전")
                }}
            >
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
                                <stop stopColor="#FEF887"/>
                                <stop offset="1" stopColor="#FFA621"/>
                            </linearGradient>
                            <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FC0"/>
                                <stop offset="1" stopColor="#FF6F00"/>
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
                className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                onClick={() => {
                    handlePayment(5000, "5VC 충전")
                }}
            >
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
                                <stop stopColor="#FEF887"/>
                                <stop offset="1" stopColor="#FFA621"/>
                            </linearGradient>
                            <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FC0"/>
                                <stop offset="1" stopColor="#FF6F00"/>
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
                className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                onClick={() => {
                    handlePayment(10000, "10VC 충전")
                }}
            >
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
                                <stop stopColor="#FEF887"/>
                                <stop offset="1" stopColor="#FFA621"/>
                            </linearGradient>
                            <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FC0"/>
                                <stop offset="1" stopColor="#FF6F00"/>
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
                className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                onClick={() => {
                    handlePayment(30000, "30VC 충전")
                }}
            >
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
                                <stop stopColor="#FEF887"/>
                                <stop offset="1" stopColor="#FFA621"/>
                            </linearGradient>
                            <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FC0"/>
                                <stop offset="1" stopColor="#FF6F00"/>
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
                className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                onClick={() => {
                    handlePayment(50000, "50VC 충전")
                }}
            >
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
                                <stop stopColor="#FEF887"/>
                                <stop offset="1" stopColor="#FFA621"/>
                            </linearGradient>
                            <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FC0"/>
                                <stop offset="1" stopColor="#FF6F00"/>
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
                className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                onClick={() => {
                    handlePayment(100000, "100VC 충전")
                }}
            >
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
                                <stop stopColor="#FEF887"/>
                                <stop offset="1" stopColor="#FFA621"/>
                            </linearGradient>
                            <linearGradient id="n2elm4kcib" x1="10" y1="2.758" x2="10" y2="16.48"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FC0"/>
                                <stop offset="1" stopColor="#FF6F00"/>
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
            <div className="flex flex-col text-[13px] text-[#a3a3a3]">
                <p>문의, 모임 콘텐츠에 사용할 수 있습니다.</p>
                <p>포인트는 구매완료 후 환불이 불가능합니다.</p>
                <div>
                    서비스 이용약관 >
                </div>
            </div>
        </div>
    );
}