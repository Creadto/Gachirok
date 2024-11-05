"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import LikeButton from "@/core/components/LikeButton";
import HateButton from "@/core/components/HateButton";
import Reply from "@/core/components/Reply";
import ToNextItem from "@/core/components/ToNextItem";
import ReplyInput from "@/core/components/ReplyInput";
import ToBeforeItem from "@/core/components/ToBeforeItem";
import {useRouter} from "next/navigation";
import {AnCategoryToNumber, AnNumberToCategory} from "@/app/announcement/utils/Category";
import ShareButton from "@/core/components/ShareButton";

interface AnnouncementItem{
    title: string;
    description: string;
    category: string;
    date: string;
    imageUrl: string;
    likes:number;
    disLikes:number;
    id:number;
    popular:number;
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

export default function UniversalAnnouncePage({params} : {params : {'announcement-id': string}}){
    const announcementId = params['announcement-id'];
    const [announcementData, setAnnouncementData] = useState<AnnouncementItem>();
    const [repliesData, setRepliesData] = useState<RepliesItem[]>([]);

    let categoryId : string;
    if(announcementData){
        categoryId = AnCategoryToNumber[announcementData.category];
    }

    const router = useRouter();

    useEffect(()=>{
        const fetchAnnouncementData = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/announcement/${announcementId}`);
                setAnnouncementData(response.data.data);
            }
            catch(err){
                console.log(err);
            }
        }
        const fetchReplyData = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/announcement/${announcementId}/reply`);
                setRepliesData(response.data.repliesData);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchAnnouncementData();
        fetchReplyData();
    },[]);

    const handleClickBackToList = ()=>{
        router.push(`/announcement/universal/section/${categoryId}?page=1&limit=8&sort=newest`)
    }

    return (
        <div className="mt-[1.5%] mb-[1.5%] ml-[21.5%] mr-[36.5%] min-w-[800px] max-w-[800px] overflow-x-auto flex flex-col">
            {announcementData ? (
                <section className="p-[50px] bg-[#fff] border rounded-2xl">
                    {/* 공지 카테고리와 제목 표시 */}
                    <h1 className="text-[12px] mb-[7px] text-[#a3a3a3]">Universal &gt; Announcement &gt; {announcementData.category}</h1>
                    <div className="flex flex-row justify-between">
                        <h1 className="w-[609px] font-bold text-[25px] mb-[10px]">{announcementData.title}</h1>
                        <div className="w-[30px] h-[30px] relative">
                            <ShareButton/>
                        </div>
                    </div>
                    <div className="flex flex-row text-[12px] text-[#a3a3a3]">
                        <p>{announcementData.date}</p>
                        <p className="mx-[10px]">|</p>
                        <p>조회 {announcementData.popular} 추천 {announcementData.likes} 댓글 {repliesData.length}</p>
                    </div>
                    <hr className="my-[30px]"/>
                    <div>
                        {/* 공지 이미지 및 설명 표시 */}
                        {announcementData.imageUrl === "" ?
                        null :
                            <div className="w-[700px] h-[500px] relative">
                                <Image
                                    src={announcementData.imageUrl}
                                    alt={announcementData.title}
                                    fill
                                    className="object-cover my-[30px] rounded-[5px]"/>
                            </div>
                        }
                        <p>{announcementData.description}</p>
                    </div>
                    {/* 추천 및 비추천 버튼 */}
                    <div className="flex justify-center items-center my-[50px]">
                        <LikeButton likeCount={announcementData.likes}/>
                        <HateButton disLikeCount={announcementData.disLikes}/>
                    </div>
                    <hr className="mb-[30px]"/>
                    <div className="mb-[80px]">
                        {/* 댓글 수 및 댓글 입력 */}
                        <p className="text-[18px] mb-[15px]">댓글 {repliesData.length}</p>
                        <ReplyInput type="news" parentId={announcementData.id}/>
                        <div className="mt-[30px] relative">
                            <Reply reply={repliesData} identity="parent"/>
                        </div>
                    </div>
                    {/* 이전 공지 및 다음 공지로 이동하는 버튼 */}
                    <div className="mb-[50px]">
                        <ToBeforeItem itemType="announcement" regionType="universal"/>
                        <hr/>
                        <ToNextItem itemType="announcement" regionType="universal"/>
                    </div>
                    <div className="flex justify-center items-center mb-[150px]">
                        <button
                            className="w-[300px] h-[60px] px-[70px] py-[19px] bg-[#000] text-[#fff] text-[15px] rounded-[8px]"
                            onClick={handleClickBackToList}>
                            목록으로
                        </button>
                    </div>
                </section>
            ) : (
                /* 공지 데이터가 없을 경우 출력*/
                <p>찾는 공지가 없습니다</p>
            )}
        </div>
    );
}