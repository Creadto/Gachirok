"use client";
import axios from "axios";
import {useSession} from "next-auth/react";

export default function AllinonePackage() {

    const {data: session} = useSession();

    const handlePay = async (packageItem: string, coin:number) => {
        try {
            if (session?.accessToken) {
                try {
                    const response = await axios.post("/api/purchases", {
                            packageItem: packageItem,
                            coin: coin
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${session.accessToken}`,
                            }
                        })
                    window.location.reload();
                } catch (e) {
                    console.log(e.message);
                }
            } else { // 토큰이 없을 경우
                console.log("No tokens");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full max-w-[20%] border rounded-2xl bg-white shadow-lg p-4">
            <div className="mb-[24px]">
                <h1 className="text-[18px] font-bold">올인원 패키지</h1>
                <p className="text-[13x] text-[#a3a3a3]">모든 기능 및 권한 활성화</p>
            </div>
            <div className="text-[16px]">
                <div
                    className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                    onClick={() => {
                        handlePay("day_all",-15)
                    }}
                >
                    <div className="flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <defs>
                                <linearGradient id="ew06i6z4ea" x1=".5" x2=".5" y2="1"
                                                gradientUnits="objectBoundingBox">
                                    <stop offset="0" stop-color="#ff006f"/>
                                    <stop offset="1" stop-color="#0075ff"/>
                                </linearGradient>
                            </defs>
                            <path data-name="패스 43228"
                                  d="M134.381 614.308h-.953v-1.282a2.623 2.623 0 0 0-2.6-2.651h-2.7a2.623 2.623 0 0 0-2.6 2.651v1.282h-.953a2.758 2.758 0 0 0-2.729 2.787v1.845a4.1 4.1 0 0 0 6.97 3.011l-2.968-1.585a.088.088 0 0 1-.021-.139l.272-.278a.745.745 0 0 1 .713-.2l3.349.833 1.058-1.081c.729-.745 1.443-.769 1.589-.62s.122.878-.607 1.623l-1.058 1.081.816 3.42a.784.784 0 0 1-.2.728l-.272.278a.085.085 0 0 1-.136-.021l-1.552-3.032-6.183 6.316a1.4 1.4 0 0 0 .959 2.381h.014a.656.656 0 0 1 .608.464 1.338 1.338 0 0 0 2.536 0 .656.656 0 0 1 .607-.464h2.263a.656.656 0 0 1 .608.464 1.338 1.338 0 0 0 2.536 0 .656.656 0 0 1 .608-.464h.014a2.758 2.758 0 0 0 2.728-2.787V617.1a2.758 2.758 0 0 0-2.716-2.792zm-2.39 0h-5.014v-1.282a1.172 1.172 0 0 1 1.158-1.183h2.7a1.173 1.173 0 0 1 1.158 1.183z"
                                  transform="translate(-117.27 -609.907)" style={{fill: "url(#ew06i6z4ea)"}}/>
                            <path data-name="사각형 146138" style={{fill: "none"}} d="M0 0h24v24H0z"/>
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
                        15
                    </div>
                </div>
                <div
                    className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                    onClick={() => {
                    }}
                >
                    <div className="flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <defs>
                                <linearGradient id="ew06i6z4ea" x1=".5" x2=".5" y2="1"
                                                gradientUnits="objectBoundingBox">
                                    <stop offset="0" stop-color="#ff006f"/>
                                    <stop offset="1" stop-color="#0075ff"/>
                                </linearGradient>
                            </defs>
                            <path data-name="패스 43228"
                                  d="M134.381 614.308h-.953v-1.282a2.623 2.623 0 0 0-2.6-2.651h-2.7a2.623 2.623 0 0 0-2.6 2.651v1.282h-.953a2.758 2.758 0 0 0-2.729 2.787v1.845a4.1 4.1 0 0 0 6.97 3.011l-2.968-1.585a.088.088 0 0 1-.021-.139l.272-.278a.745.745 0 0 1 .713-.2l3.349.833 1.058-1.081c.729-.745 1.443-.769 1.589-.62s.122.878-.607 1.623l-1.058 1.081.816 3.42a.784.784 0 0 1-.2.728l-.272.278a.085.085 0 0 1-.136-.021l-1.552-3.032-6.183 6.316a1.4 1.4 0 0 0 .959 2.381h.014a.656.656 0 0 1 .608.464 1.338 1.338 0 0 0 2.536 0 .656.656 0 0 1 .607-.464h2.263a.656.656 0 0 1 .608.464 1.338 1.338 0 0 0 2.536 0 .656.656 0 0 1 .608-.464h.014a2.758 2.758 0 0 0 2.728-2.787V617.1a2.758 2.758 0 0 0-2.716-2.792zm-2.39 0h-5.014v-1.282a1.172 1.172 0 0 1 1.158-1.183h2.7a1.173 1.173 0 0 1 1.158 1.183z"
                                  transform="translate(-117.27 -609.907)" style={{fill: "url(#ew06i6z4ea)"}}/>
                            <path data-name="사각형 146138" style={{fill: "none"}} d="M0 0h24v24H0z"/>
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
                        30
                    </div>
                </div>
                <div
                    className="h-[64px] px-[15px] flex flex-row justify-between items-center py-3 cursor-pointer border rounded-[10px] bg-[#f6f6f6] mb-[10px] hover:bg-[#ffdb9b]"
                    onClick={() => {
                    }}
                >

                    <div className="flex flex-row items-center gap-[10px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <defs>
                                <linearGradient id="ew06i6z4ea" x1=".5" x2=".5" y2="1"
                                                gradientUnits="objectBoundingBox">
                                    <stop offset="0" stop-color="#ff006f"/>
                                    <stop offset="1" stop-color="#0075ff"/>
                                </linearGradient>
                            </defs>
                            <path data-name="패스 43228"
                                  d="M134.381 614.308h-.953v-1.282a2.623 2.623 0 0 0-2.6-2.651h-2.7a2.623 2.623 0 0 0-2.6 2.651v1.282h-.953a2.758 2.758 0 0 0-2.729 2.787v1.845a4.1 4.1 0 0 0 6.97 3.011l-2.968-1.585a.088.088 0 0 1-.021-.139l.272-.278a.745.745 0 0 1 .713-.2l3.349.833 1.058-1.081c.729-.745 1.443-.769 1.589-.62s.122.878-.607 1.623l-1.058 1.081.816 3.42a.784.784 0 0 1-.2.728l-.272.278a.085.085 0 0 1-.136-.021l-1.552-3.032-6.183 6.316a1.4 1.4 0 0 0 .959 2.381h.014a.656.656 0 0 1 .608.464 1.338 1.338 0 0 0 2.536 0 .656.656 0 0 1 .607-.464h2.263a.656.656 0 0 1 .608.464 1.338 1.338 0 0 0 2.536 0 .656.656 0 0 1 .608-.464h.014a2.758 2.758 0 0 0 2.728-2.787V617.1a2.758 2.758 0 0 0-2.716-2.792zm-2.39 0h-5.014v-1.282a1.172 1.172 0 0 1 1.158-1.183h2.7a1.173 1.173 0 0 1 1.158 1.183z"
                                  transform="translate(-117.27 -609.907)" style={{fill: "url(#ew06i6z4ea)"}}/>
                            <path data-name="사각형 146138" style={{fill: "none"}} d="M0 0h24v24H0z"/>
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
                        50
                    </div>
                </div>
            </div>
        </div>
    );
}