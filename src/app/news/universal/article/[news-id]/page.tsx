"use client";

import Image from "next/image";
import LikeButton from "@/core/components/LikeButton";
import HateButton from "@/core/components/HateButton";
import Reply from "@/core/components/Reply";
import ReplyInput from "@/core/components/ReplyInput";
import ToBeforeItem from "@/core/components/ToBeforeItem";
import ToNextItem from "@/core/components/ToNextItem";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ShareButton from "@/core/components/ShareButton"
import {categoryToNumber} from "@/app/news/utils/Category";

interface NewsItem {
    title: string;
    description: string;
    category: string;
    date: string;
    imageUrl: string;
    visitCount: number;
    reply:number;
    like: number;
    disLike: number;
    id: number;
}

interface RepliesItem {
    id: number;
    replyId: number;
    author: string;
    content: string;
    date: string;
    likes: number;
    replies: RepliesItem[];
}

/**
 * @Description (Universal)뉴스 상세 페이지를 렌더링하는 컴포넌트. 뉴스 ID에 해당하는 뉴스 데이터를 API에서 가져와 표시하며, 댓글 및 추천/비추천 버튼과 이전/다음 뉴스로 이동하는 버튼 등을 포함.
 * @param params 뉴스 ID를 포함한 객체
 * @Author 민동현
 */

export default function UniversalNewsPage({params}: { params: { 'news-id': string } }) {


    const newsId = params['news-id'];
    const [newsData, setNewsData] = useState<NewsItem>();
    const [repliesData, setRepliesData] = useState<RepliesItem[]>([]);

    let categoryId : string;
    if(newsData){
        categoryId = categoryToNumber[newsData.category];
    }

    const router = useRouter();

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${newsId}`);
                setNewsData(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        const fetchReplyData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${newsId}/reply`);
                setRepliesData(response.data.repliesData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchNewsData();
        fetchReplyData();
    }, []);

    const handleClickBackToList = ()=>{
        router.push(`/news/universal/section/${categoryId}?page=1&limit=8&sort=newest`)
    }

    return (
        <div className="mt-[1.5%] ml-[21.5%] mr-[36.5%] min-w-[800px] max-w-[800px] overflow-x-auto flex flex-col">
            {newsData ? (
                <section className="mt-[50px]">
                    {/* 뉴스 카테고리와 제목 표시 */}
                    <h1 className="text-[12px] mb-[7px] text-[#a3a3a3]">Universal &gt; News &gt; {newsData.category}</h1>
                    <div className="flex flex-row justify-between">
                        <h1 className="w-[609px] font-bold text-[25px] mb-[10px]">{newsData.title}</h1>
                        <div className="w-[30px] h-[30px] relative">
                            <ShareButton />
                        </div>
                    </div>
                    <div className="flex flex-row text-[12px] text-[#a3a3a3]">
                        <p>{newsData.date}</p>
                        <p className="mx-[10px]">|</p>
                        <p>조회 {newsData.visitCount} 추천 {newsData.like} 댓글 {repliesData.length}</p>
                    </div>
                    <hr className="my-[30px]"/>
                    <div>
                        {/* 뉴스 이미지 및 설명 표시 */}
                        <Image
                            src={newsData.imageUrl}
                            alt={newsData.title}
                            height={400}
                            width={800}
                            className="object-cover my-[30px] rounded-[5px]"/>
                        <p>{newsData.description}</p>
                    </div>
                    {/* 추천 및 비추천 버튼 */}
                    <div className="flex justify-center items-center my-[50px]">
                        <LikeButton likeCount={newsData.like}/>
                        <HateButton disLikeCount={newsData.disLike}/>
                    </div>
                    <hr className="mb-[30px]"/>
                    <div className="mb-[80px]">
                        {/* 댓글 수 및 댓글 입력 */}
                        <p className="text-[18px] mb-[15px]">댓글 {repliesData.length}</p>
                        <ReplyInput type="news" parentId={newsId}/>
                        <div className="mt-[30px] relative">
                            <Reply reply={repliesData} identity="parent"/>
                        </div>
                    </div>
                    {/* 이전 뉴스 및 다음 뉴스로 이동하는 버튼 */}
                    <div className="mb-[50px]">
                        <ToBeforeItem itemType="news" regionType="universal"/>
                        <hr/>
                        <ToNextItem itemType="news" regionType="universal"/>
                    </div>
                    <div className="flex justify-center items-center mb-[150px]">
                        <button className="w-[300px] h-[60px] px-[70px] py-[19px] bg-[#000] text-[#fff] text-[15px] rounded-[8px]" onClick={handleClickBackToList}>
                            목록으로
                        </button>
                    </div>
                </section>
            ) : (
                /* 뉴스 데이터가 없을 경우 출력*/
                <p>찾는 뉴스가 없습니다</p>
            )}
        </div>
    );
}