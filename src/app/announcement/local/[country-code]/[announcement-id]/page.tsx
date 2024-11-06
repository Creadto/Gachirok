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

    return (
        <>
            {announcementData ? (
                <section className="px-96 py-5">
                    {/* 공지 카테고리와 제목 표시 */}
                    <h4 className="text-xs text-gray-500">Universal &gt; Announcement &gt; {announcementData.category}</h4>
                    <div className="py-5">
                        <h1 className="font-bold text-3xl">{announcementData.title}</h1>
                        <p className="text-xs text-gray-500 py-2">{announcementData.date} | 조회{announcementData.popular} 추천{announcementData.likes} 댓글{repliesData.length}</p>
                    </div>
                    <hr/>
                    <div>
                        {/* 공지 이미지 및 설명 표시 */}
                        <Image src={announcementData.imageUrl} alt={announcementData.title} height={400} width={600} className="object-cover py-5" />
                        <p className="py-5">{announcementData.description}</p>
                    </div>
                    {/* 추천 및 비추천 버튼 */}
                    <div className="flex justify-center items-center p-4">
                        <div className="pr-2">
                            <LikeButton likeCount={announcementData.likes}/>
                        </div>
                        <div className="pl-2">
                            <HateButton disLikeCount={0}/>
                        </div>
                    </div>
                    <div className="py-4">
                        {/* 댓글 수 및 댓글 입력 */}
                        <p className="font-bold py-4">댓글 {repliesData.length}</p>
                        <ReplyInput type="announcement" parentId={announcementId}/>
                        <Reply reply={repliesData}/>
                    </div>
                    {/* 이전 공지 및 다음 공지로 이동하는 버튼 */}
                    <div>
                        <ToBeforeItem itemType="announcement" regionType="local"/>
                        <hr/>
                        <ToNextItem itemType="announcement" regionType="local"/>
                    </div>
                </section>
            ) : (
                /* 공지 데이터가 없을 경우 출력*/
                <p>찾는 공지가 없습니다</p>
            )}
        </>
    );
}