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

export default function DetailNews({news} : { news : newsItem}) {

    const router = useRouter();

    const handleClick = ()=>{
        router.push(`/news/universal/article/${news.id}`)
    }
    return (
        <div className="w-[670px] h-[120px] flex flex-row p-[15px] cursor-pointer justify-between border rounded-2xl bg-[#FFF]">
            <div>
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
                                    <div className="w-[14px] h-[14px] relative mr-[2px]">
                                        <Image
                                            src="/images/interests&expertises/eye-log.svg"
                                            alt="조회수"
                                            fill
                                        />
                                    </div>
                                    <p>{news.visitCount}</p>
                                </div>
                                <p>&#183;</p>
                                <div className="flex flex-row justify-center items-center">
                                    <div className="w-[14px] h-[14px] relative mr-[2px]">
                                        <Image
                                            src="/images/interests&expertises/like-logo.svg"
                                            alt="좋아요"
                                            fill
                                        />
                                    </div>
                                    <p>{news.like}</p>
                                </div>
                                <p>&#183;</p>
                                <div className="flex flex-row justify-center items-center">
                                    <div className="w-[14px] h-[14px] relative mr-[2px]">
                                        <Image
                                            src="/images/interests&expertises/chatting-log.svg"
                                            alt="댓글"
                                            fill
                                        />
                                    </div>
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
                                    <div className="w-[14px] h-[14px] relative mr-[2px]">
                                        <Image
                                            src="/images/interests&expertises/eye-log.svg"
                                            alt="조회수"
                                            fill
                                        />
                                    </div>
                                    <p>{news.visitCount}</p>
                                </div>
                                <p>&#183;</p>
                                <div className="flex flex-row justify-center items-center">
                                    <div className="w-[14px] h-[14px] relative mr-[2px]">
                                        <Image
                                            src="/images/interests&expertises/like-logo.svg"
                                            alt="좋아요"
                                            fill
                                        />
                                    </div>
                                    <p>{news.like}</p>
                                </div>
                                <p>&#183;</p>
                                <div className="flex flex-row justify-center items-center">
                                    <div className="w-[14px] h-[14px] relative mr-[2px]">
                                        <Image
                                            src="/images/interests&expertises/chatting-log.svg"
                                            alt="댓글"
                                            fill
                                        />
                                    </div>
                                    <p>{news.reply}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
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