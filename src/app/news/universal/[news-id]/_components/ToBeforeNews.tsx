"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";

interface NewsItem{
    title: string;
    description: string;
    category: string;
    date: string;
    id:number;
}

/**
 * @Description 이전 뉴스 돌아가기 컴포넌트
 * @constructor
 */

export default function ToBeforeNews() {

    const params = useParams();
    const router = useRouter();
    const currentId = parseInt(params['news-id'] as string,10);
    const beforeId = currentId-1;
    const [beforeNews, setBeforeNews] = useState<NewsItem>();


    const clickToBeforeNews = ()=>{
        if (currentId > 1) {
            const newId = currentId - 1;
            router.push(`/news/universal/${newId}`);
        }
    }
    useEffect(()=>{
        const fetchNews = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${beforeId}`);
                setBeforeNews(response.data.newsData);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchNews();
    },[]);

    return (
        <div className="flex flex-row py-4 border-b cursor-pointer" onClick={clickToBeforeNews}>
            <p className="pr-32">이전으로</p>
            {beforeNews ? <p>{beforeNews.title}</p> : <p>없음</p>}
        </div>
    );
}