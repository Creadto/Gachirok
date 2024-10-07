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

export default function ToNextNews() {

    const params = useParams();
    const router = useRouter();
    const countryCode = params["countryCode"];
    const currentId = parseInt(params['news-id'] as string, 10); // 현재 뉴스의 id
    const nextId = currentId+1;
    const [nextNews, setNextNews] = useState<NewsItem>();
    const [newsLength, setNewsLength] = useState<number>(30);
    // 다음 뉴스 타이틀 업데이트

    // 다음 뉴스로 이동
    const clickToNextNews = () => {
        if (currentId < newsLength) {
            router.push(`/news/local/${countryCode}/${nextId}`);
        }
    };
    useEffect(()=>{
        const fetchNews = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${nextId}`);
                setNextNews(response.data.newsData);
            }
            catch(err){
                console.log(err);
            }
        }
        // const fetchNewsLength = async()=>{
        //     try{
        //         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/total`);
        //         setNewsLength(response.data.newsLength);
        //     }
        //     catch(err){
        //         console.log(err);
        //     }
        // }
        fetchNews();
        // fetchNewsLength();
    },[])

    return (
        <div className="flex flex-row py-4 border-b cursor-pointer" onClick={clickToNextNews}>
            <p className="pr-32">다음으로</p>
            {nextNews ? <p>{nextNews.title}</p> : <p>없음</p>}
        </div>
    );
}
