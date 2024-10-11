"use client";

import Image from "next/image";
import LikeButton from "@/app/news/universal/[news-id]/_components/LikeButton";
import HateButton from "@/app/news/universal/[news-id]/_components/HateButton";
import Reply from "@/app/news/universal/[news-id]/_components/Reply";
import ReplyInput from "@/app/news/universal/[news-id]/_components/ReplyInput";
import ToBeforeNews from "@/app/news/universal/[news-id]/_components/ToBeforeNews";
import ToNextNews from "@/app/news/universal/[news-id]/_components/ToNextNews";
import axios from "axios";
import {useEffect, useState} from "react";

interface NewsItem{
    title: string;
    description: string;
    category: string;
    date: string;
    imageUrl: string;
    like:number;
    disLike:number;
    id:number;
}
interface RepliesItem{
    id:number;
    replyId:number;
    author:string;
    content:string;
    date:string;
    likes:number;
    replies:RepliesItem[];
}

/**
 * @Description (Universal)뉴스 상세 페이지를 렌더링하는 컴포넌트. 뉴스 ID에 해당하는 뉴스 데이터를 API에서 가져와 표시하며, 댓글 및 추천/비추천 버튼과 이전/다음 뉴스로 이동하는 버튼 등을 포함.
 * @param params 뉴스 ID를 포함한 객체
 * @Author 민동현
 */

export default function UniversalNewsPage({params} : {params : {'news-id': string}}) {


    const newsId = params['news-id'];
    const [newsData, setNewsData] = useState<NewsItem>();
    const [repliesData, setRepliesData] = useState<RepliesItem[]>([]);

    useEffect(()=>{
        const fetchNewsData = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${newsId}`);
                setNewsData(response.data.newsData);
            }
            catch(err){
                console.log(err);
            }
        }
        const fetchReplyData = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${newsId}/reply`);
                setRepliesData(response.data.repliesData);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchNewsData();
        fetchReplyData();
    },[]);

    return (
        <>
            {newsData ? (
                <section className="px-96 py-5">
                    {/* 뉴스 카테고리와 제목 표시 */}
                    <h4 className="text-xs text-gray-500">News &gt; {newsData.category}</h4>
                    <div className="py-5">
                        <h1 className="font-bold text-3xl">{newsData.title}</h1>
                        <p className="text-xs text-gray-500 py-2">{newsData.date} | 조회3 추천3 댓글{repliesData.length}</p>
                    </div>
                    <hr/>
                    <div>
                        {/* 뉴스 이미지 및 설명 표시 */}
                        <Image src={newsData.imageUrl} alt={newsData.title} height={400} width={600} className="object-cover py-5" />
                        <p className="py-5">{newsData.description}</p>
                    </div>
                    <hr/>
                    <div className="flex justify-center items-center p-4">
                        <p>이 기사를 추천합니다.</p>
                    </div>
                    {/* 추천 및 비추천 버튼 */}
                    <div className="flex justify-center items-center p-4">
                        <LikeButton likeCount={newsData.like}/>
                        <HateButton disLikeCount={newsData.disLike}/>
                    </div>
                    <hr/>
                    <div className="py-4">
                        {/* 댓글 수 및 댓글 입력 */}
                        <p className="font-bold py-4">댓글 {repliesData.length}</p>
                        <ReplyInput/>
                        <Reply reply={repliesData}/>
                    </div>
                    {/* 이전 뉴스 및 다음 뉴스로 이동하는 버튼 */}
                    <div>
                        <ToBeforeNews/>
                        <hr/>
                        <ToNextNews/>
                    </div>
                </section>
            ) : (
                /* 뉴스 데이터가 없을 경우 출력*/
                <p>찾는 뉴스가 없습니다</p>
                )}
        </>
    );
}