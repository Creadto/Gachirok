"use client";

import {useState} from "react";
import Image from "next/image";

export default function ShareButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    function handleClickKakao() {
        setIsModalOpen(false);
        const {Kakao, location} = window;
        Kakao.Share.sendScrap({
            requestUrl: location.href,
        });
    };

    const copyLink = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setIsModalOpen(false);
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false);
            },3000)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="relative inline-block">
            {/* 공유하기 버튼 */}
            <div className="w-[24px] h-[24px] cursor-pointer" onClick={handleClick}>
                <Image
                    src="/images/interests&expertises/share-logo.svg"
                    alt="공유하기"
                    width={24}
                    height={24}
                    className="hover:bg-gray-100 rounded-full"
                />
            </div>
            {/* 모달창 */}
            {isModalOpen && (
                <div
                    className="absolute top-full right-0 mt-2 w-[250px] p-4 bg-gray-50 border border-gray-200 rounded shadow-lg z-10">
                    <div className="relative">
                        <p className=" flex justify-center text-[17px] font-bold">공유하기</p>
                        <button
                            className="absolute right-0 bottom-2 hover:text-gray-700 font-light"
                            onClick={() => setIsModalOpen(false)}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-2 mb-3 gap-8">
                        <div
                            className="flex flex-col items-center gap-[2px] cursor-pointer"
                            onClick={handleClickKakao}
                        >
                            <svg className="border rounded-2xl p-1 bg-white" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 48 48" width="48px" height="48px">
                                <linearGradient id="_rH8YBooyc-uwdwnRIye-a" x1="24" x2="24" y1="11.848" y2="61.644"
                                                gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fed100"/>
                                    <stop offset="1" stop-color="#e38101"/>
                                </linearGradient>
                                <path fill="url(#_rH8YBooyc-uwdwnRIye-a)"
                                      d="M35,42H13c-3.866,0-7-3.134-7-7V13c0-3.866,3.134-7,7-7h22c3.866,0,7,3.134,7,7v22	C42,38.866,38.866,42,35,42z"/>
                                <path
                                    d="M24,12c7.732,0,14,5.033,14,11.242s-6.268,11.242-14,11.242c-1.012,0-1.997-0.091-2.949-0.255l-5.615,3.713 C15.377,37.982,15.314,38,15.252,38c-0.206,0-0.389-0.198-0.32-0.427l1.479-4.892C12.557,30.679,10,27.203,10,23.242 C10,17.033,16.268,12,24,12 M24,11c-8.271,0-15,5.492-15,12.242c0,3.964,2.31,7.622,6.221,9.922l-1.246,4.119 c-0.123,0.406-0.049,0.835,0.203,1.174C14.43,38.797,14.831,39,15.252,39c0.261,0,0.516-0.077,0.736-0.223l5.289-3.498 c0.906,0.136,1.82,0.205,2.723,0.205c8.271,0,15-5.492,15-12.242C39,16.492,32.271,11,24,11L24,11z"
                                    opacity=".05"/>
                                <path
                                    d="M24,12c7.732,0,14,5.033,14,11.242s-6.268,11.242-14,11.242c-1.012,0-1.997-0.091-2.949-0.255l-5.615,3.713 C15.377,37.982,15.314,38,15.252,38c-0.206,0-0.389-0.198-0.32-0.427l1.479-4.892C12.557,30.679,10,27.203,10,23.242 C10,17.033,16.268,12,24,12 M24,11.5c-7.995,0-14.5,5.268-14.5,11.742c0,3.896,2.352,7.49,6.315,9.686l-1.361,4.5 c-0.077,0.254-0.031,0.521,0.125,0.732c0.158,0.213,0.409,0.34,0.673,0.34c0.163,0,0.322-0.048,0.46-0.14l5.451-3.605 c0.944,0.152,1.897,0.229,2.837,0.229c7.995,0,14.5-5.268,14.5-11.742C38.5,16.768,31.995,11.5,24,11.5L24,11.5z"
                                    opacity=".07"/>
                                <path fill="#343434"
                                      d="M24,12c-7.732,0-14,5.033-14,11.242c0,3.961,2.557,7.436,6.412,9.439l-1.479,4.892	c-0.09,0.297,0.244,0.542,0.504,0.37l5.615-3.713c0.951,0.164,1.937,0.255,2.949,0.255c7.732,0,14-5.033,14-11.242S31.732,12,24,12z"/>
                                <linearGradient id="_rH8YBooyc-uwdwnRIye-b" x1="16.364" x2="16.364" y1="11.848"
                                                y2="61.644" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fed100"/>
                                    <stop offset="1" stop-color="#e38101"/>
                                </linearGradient>
                                <path fill="url(#_rH8YBooyc-uwdwnRIye-b)"
                                      d="M18.91,20.636 c0-0.351-0.285-0.636-0.636-0.636h-3.818c-0.351,0-0.636,0.285-0.636,0.636c0,0.351,0.285,0.636,0.636,0.636h1.273v5.091 c0,0.351,0.285,0.636,0.636,0.636c0.351,0,0.636-0.285,0.636-0.636v-5.091h1.273C18.625,21.273,18.91,20.988,18.91,20.636z"/>
                                <linearGradient id="_rH8YBooyc-uwdwnRIye-c" x1="31.636" x2="31.636" y1="11.848"
                                                y2="61.644" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fed100"/>
                                    <stop offset="1" stop-color="#e38101"/>
                                </linearGradient>
                                <path fill="url(#_rH8YBooyc-uwdwnRIye-c)"
                                      d="M34.045,25.97l-2.359-3.002 c-0.008-0.011-0.021-0.015-0.03-0.025l1.857-1.857c0.249-0.248,0.249-0.651,0-0.9c-0.248-0.249-0.651-0.249-0.9,0l-2.249,2.249 v-1.799c0-0.351-0.285-0.636-0.636-0.636s-0.636,0.285-0.636,0.636v5.727c0,0.351,0.285,0.636,0.636,0.636s0.636-0.285,0.636-0.636 v-2.135c0.007-0.006,0.016-0.008,0.022-0.015l0.369-0.369l2.29,2.913c0.217,0.276,0.617,0.324,0.893,0.107 S34.262,26.246,34.045,25.97z"/>
                                <linearGradient id="_rH8YBooyc-uwdwnRIye-d" x1="26.545" x2="26.545" y1="11.848"
                                                y2="61.644" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fed100"/>
                                    <stop offset="1" stop-color="#e38101"/>
                                </linearGradient>
                                <path fill="url(#_rH8YBooyc-uwdwnRIye-d)"
                                      d="M27.818,25.727h-1.909v-5.09 c0-0.351-0.285-0.636-0.636-0.636s-0.636,0.285-0.636,0.636v5.727c0,0.351,0.285,0.636,0.636,0.636h2.545 c0.351,0,0.636-0.285,0.636-0.636C28.454,26.012,28.169,25.727,27.818,25.727z"/>
                                <linearGradient id="_rH8YBooyc-uwdwnRIye-e" x1="21.136" x2="21.136" y1="11.848"
                                                y2="61.644" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stop-color="#fed100"/>
                                    <stop offset="1" stop-color="#e38101"/>
                                </linearGradient>
                                <path fill="url(#_rH8YBooyc-uwdwnRIye-e)"
                                      d="M21.908,20.409 c-0.092-0.241-0.316-0.389-0.559-0.4c-0.071-0.003-0.344-0.002-0.408-0.001c-0.249,0.004-0.482,0.153-0.576,0.401l-2.05,5.727 c-0.126,0.328,0.038,0.696,0.367,0.822c0.328,0.126,0.696-0.038,0.822-0.367l0.309-0.864h2.647l0.309,0.864 c0.126,0.328,0.494,0.492,0.822,0.367c0.328-0.125,0.492-0.494,0.366-0.822L21.908,20.409z M20.269,24.454l0.868-2.426l0.868,2.426 H20.269z"/>
                            </svg>
                            <button className="text-[13px]">카카오톡</button>
                        </div>
                        <div className="flex flex-col items-center gap-[2px] cursor-pointer">
                            <svg className="border rounded-2xl p-1 bg-white" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 48 48"
                                 width="48px" height="48px">
                                <path fill="#3F51B5"
                                      d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
                                <path fill="#FFF"
                                      d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"/>
                            </svg>
                            <button className="text-[13px]">메타</button>
                        </div>
                        <div className="flex flex-col items-center gap-[2px] cursor-pointer">
                            <svg className="border rounded-2xl p-1 bg-white" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 50 50"
                                 width="48px" height="48px">
                                <path
                                    d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/>
                            </svg>
                            <button className="text-[13px]">X</button>
                        </div>
                    </div>
                    <div
                        className="flex flex-row border rounded-2xl cursor-pointer overflow-hidden"
                        onClick={() => copyLink(window.location.href)}>
                        <div
                            className="text-[14px] text-blue-500 px-[10px] py-[10px] max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {window.location.href}
                        </div>
                        <div className="text-[14px] text-[#a3a3a3] px-[10px] py-[10px] whitespace-nowrap bg-[#f6f6f6]">
                            복사
                        </div>
                    </div>
                </div>
            )}
            {showToast ?
                <div className="flex flex-row item-center fixed bottom-[50px] right-[50px] w-[320px] h-[60px] px-[20px] py-[15px] border border-l-4 border-solid border-[#eee] border-l-[#e62a2f] rounded-[5px] bg-[#fff] animate-bounce">
                    <div className="flex items-center justify-center mr-[15px]">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#fgfdvtzs6a)">
                                <path d="M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z" fill="#E62A2F"/>
                                <path d="m5.672 8.708 2.565 2.565L12.33 6.73" stroke="#fff" stroke-width="1.5"
                                      stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="fgfdvtzs6a">
                                    <path fill="#fff" d="M0 0h18v18H0z"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <hr className="w-[1px] h-[30px] bg-[#eee]"/>
                    <div className="flex items-center justify-center ml-[15px] text-[15px]">
                        주소가 복사되었습니다.
                    </div>
                </div> : null
            }
        </div>
    );
}
