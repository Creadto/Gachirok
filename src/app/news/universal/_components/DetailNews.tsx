"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";

interface newsItem {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    visitCount: number;
    like: number;
    disLike: number;
    reply: number;
    imageUrl: string;
}

export default function DetailNews({news}: { news: newsItem }) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/news/universal/article/${news.id}`)
    }
    return (
        <div
            className="w-[670px] h-[120px] flex flex-row p-[15px] cursor-pointer justify-between border rounded-2xl bg-[#FFF]">
            {news.imageUrl === "" ? // 이미지가 존재하는 경우와 존재하지 않는 경우 분기처리
                <div className="w-[640px] h-[90px] flex flex-col justify-between" onClick={handleClick}>
                    <div>
                        <h3 className="text-[15px] font-bold line-clamp-1 mb-[2px]">{news.title}</h3>
                        <p className="text-[13px] text-[#a3a3a3] line-clamp-2">{news.description}</p>
                    </div>
                    <div className="flex flex-row justify-between text-[10px] text-[#a3a3a3]">
                        <span>{news.date}</span>
                        <div className="flex flex-row gap-[5px]">
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.846 6.619 9.81 4.583a3.97 3.97 0 0 0-5.612 0L2.163 6.619a1.078 1.078 0 0 0 0 1.532l2.035 2.036a3.97 3.97 0 0 0 5.612 0l2.036-2.036a1.092 1.092 0 0 0 0-1.532z"
                                        stroke="#A3A3A3"/>
                                    <path d="M7 9.49a2.105 2.105 0 1 0 0-4.21 2.105 2.105 0 0 0 0 4.21z"
                                          stroke="#A3A3A3"/>
                                </svg>
                                <p>{news.visitCount}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m4.932 6.621 1.845-4.086c.367 0 .719.144.979.4.26.254.405.6.405.962v1.816h2.611a.935.935 0 0 1 .707.312.905.905 0 0 1 .216.732l-.637 4.086a.905.905 0 0 1-.315.556.931.931 0 0 1-.608.216H4.932m0-4.994v4.994m0-4.994H3.548a.93.93 0 0 0-.653.266.9.9 0 0 0-.27.642v3.178a.9.9 0 0 0 .27.642.93.93 0 0 0 .653.266h1.384"
                                        stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p>{news.like}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#b5c86sn4ua)">
                                        <path
                                            d="M11.977 7.312c0-2.193-2.139-3.972-4.775-3.972-2.637 0-4.776 1.776-4.776 3.972a4.173 4.173 0 0 0 3.541 3.83v1.599l2.297-1.569a4.213 4.213 0 0 0 3.719-3.86h-.006z"
                                            stroke="#A3A3A3" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="b5c86sn4ua">
                                            <path fill="#fff" transform="translate(1 1.5)" d="M0 0h12.406v12.22H0z"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>{news.reply}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="w-[509px] h-[90px] flex flex-col justify-between" onClick={handleClick}>
                    <div>
                        <h3 className="text-[15px] font-bold line-clamp-1 mb-[2px]">{news.title}</h3>
                        <p className="text-[13px] text-[#a3a3a3] line-clamp-2 mb-[11px]">{news.description}</p>
                    </div>
                    <div className="flex flex-row justify-between text-[10px] text-[#a3a3a3]">
                        <span>{news.date}</span>
                        <div className="flex flex-row gap-[5px]">
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.846 6.619 9.81 4.583a3.97 3.97 0 0 0-5.612 0L2.163 6.619a1.078 1.078 0 0 0 0 1.532l2.035 2.036a3.97 3.97 0 0 0 5.612 0l2.036-2.036a1.092 1.092 0 0 0 0-1.532z"
                                        stroke="#A3A3A3"/>
                                    <path d="M7 9.49a2.105 2.105 0 1 0 0-4.21 2.105 2.105 0 0 0 0 4.21z"
                                          stroke="#A3A3A3"/>
                                </svg>
                                <p>{news.visitCount}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m4.932 6.621 1.845-4.086c.367 0 .719.144.979.4.26.254.405.6.405.962v1.816h2.611a.935.935 0 0 1 .707.312.905.905 0 0 1 .216.732l-.637 4.086a.905.905 0 0 1-.315.556.931.931 0 0 1-.608.216H4.932m0-4.994v4.994m0-4.994H3.548a.93.93 0 0 0-.653.266.9.9 0 0 0-.27.642v3.178a.9.9 0 0 0 .27.642.93.93 0 0 0 .653.266h1.384"
                                        stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p>{news.like}</p>
                            </div>
                            <p>&#183;</p>
                            <div className="flex flex-row justify-center items-center">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#b5c86sn4ua)">
                                        <path
                                            d="M11.977 7.312c0-2.193-2.139-3.972-4.775-3.972-2.637 0-4.776 1.776-4.776 3.972a4.173 4.173 0 0 0 3.541 3.83v1.599l2.297-1.569a4.213 4.213 0 0 0 3.719-3.86h-.006z"
                                            stroke="#A3A3A3" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="b5c86sn4ua">
                                            <path fill="#fff" transform="translate(1 1.5)" d="M0 0h12.406v12.22H0z"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>{news.reply}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {news.imageUrl === "" ?
                null :
                <div className="w-[117px] h-[90px] relative">
                    <Image
                        src={news.imageUrl}
                        alt={news.title}
                        fill
                        // objectFit='contain' // 원본 비율 유지
                        className="rounded-[8px]"
                    />
                </div>
            }
        </div>
    );
}