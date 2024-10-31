"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {categoryToNumber} from "@/app/news/utils/Category";

interface PopularNewsProps {
    category?: string;
}

interface NewsData {
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

export default function PopularNews({category} : PopularNewsProps) {


    const [news, setNews] = useState<NewsData[]>([]);
    const [currentNewsGroup,setCurrentNewsGroup] = useState<NewsData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const router = useRouter();
    const params = useParams();

    let countryCode : undefined | string | string[];
    let categoryId : undefined | string;

    if(category){ // section 일경우 전달하기 위해
        categoryId = categoryToNumber[category];
    }

    if(params){
        countryCode = params['country-code'];
    }


    const fetchPopularNews = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/popular`);
            setMaxIndex(response.data.data.length)
            setNews(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchPopularSectionNews = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/section/${categoryId}/popular`);
            setMaxIndex(response.data.data.length)
            setNews(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleNewsClick = (newsId: number) => {
        router.push(`/news/local/${countryCode}/article/${newsId}`);
    }

    const handleBeforeClick=()=>{
        if(currentIndex === 0){
            setCurrentIndex(Math.floor((maxIndex-1)/3) * 3);
        }
        else{
            setCurrentIndex((prev)=>(prev-3))
        }
    }
    const handleNextClick=()=>{
        if(maxIndex-currentIndex > 0 && maxIndex-currentIndex < 4){
            setCurrentIndex(0);
        }
        else{
            setCurrentIndex((prev)=>prev+3);
        }
    }

    useEffect(() => {
        if(category){
            fetchPopularSectionNews();
        }
        else{
            fetchPopularNews();
        }
    }, [])

    useEffect(()=>{
        const currentNews = news.slice(currentIndex, currentIndex + 3);
        setCurrentNewsGroup(currentNews)
    },[currentIndex,news])

    return (
        <div className="flex flex-row justify-between">
            <div className="flex items-center" onClick={handleBeforeClick}>
                <Image
                    src="/images/interests&expertises/circle-before-logo.svg"
                    alt="이전으로"
                    width={30}
                    height={30}
                    className="hover:bg-gray-300 rounded-full"
                />
            </div>
            <div className="grid grid-cols-3 gap-[20px]">
                {currentNewsGroup.map((news) => (
                    <div key={news.id}
                         className="w-[440px] h-[140px] flex flex-row p-[15px] cursor-pointer justify-between border rounded-2xl bg-[#FFF]"
                         onClick={() => handleNewsClick(news.id)}>
                        <div className="mr-[10px] flex flex-col">
                            <div className="flex flex-row gap-[2px] mb-[5px]">
                                <p className="h-[20px] text-[11px] text-[#e62a2f] rounded-[2px] bg-[#ffe9ea] px-[6px] py-[3px] flex justify-center items-center">{news.category}</p>
                                <div
                                    className="w-[49px] h-[20px] flex flex-row justify-center items-center px-[6px] py-[3px] rounded-[2px] bg-[#e62a2f]">
                                    <p className="text-[11px] text-[#fff] flex flex-row justify-center items-center mr-[2px]">Hot</p>
                                    <p className="flex justify-center items-center leading-none text-[11px]">🌟</p>
                                </div>
                            </div>
                            {news.imageUrl === "" ? // 이미지가 존재하는 경우와 존재하지 않는 경우 분기처리
                                <div className="w-[410px] h-[110px] flex flex-col justify-between">
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
                                :
                                <div className="w-[255px] h-[110px] flex flex-col justify-between">
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
                            <div className="w-[140px] h-[110px] relative">
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
                ))}
            </div>
            <div className="flex items-center" onClick={handleNextClick}>
                    <Image
                        src="/images/interests&expertises/circle-next-logo.svg"
                        alt="다음으로"
                        width={30}
                        height={30}
                        className="hover:bg-gray-300 rounded-full"
                    />
            </div>
        </div>
    );
}