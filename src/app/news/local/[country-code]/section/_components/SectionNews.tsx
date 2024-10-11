"use client";

import LocalNews from "@/app/news/local/[country-code]/_components/LocalNews";
import axios from "axios";
import {useEffect, useState} from "react";
import {categoryToNumber} from "@/app/news/utils/Category";
import {useParams} from "next/navigation";


interface NewsItem{
    title: string;
    description: string;
    category: string;
    date: string;
    id:number;
}
/**
 *
 * @Description 선택된 로컬 뉴스 섹션(카테고리)에 맞는 뉴스 항목들을 불러와 보여주는 컴포넌트
 * @Author 민동현
 */
export default function SectionNews({section}:{section:string}){

    const [sectionNews, setSectionNews] = useState<NewsItem[]>([]);
    const sectionId = categoryToNumber[section];
    const params = useParams();
    const countryCode = params['country-code'];

    useEffect(()=>{
        const fetchNews = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${countryCode}/section/${sectionId}`);
                setSectionNews(response.data.sectionNews)
            }
            catch(err){
                console.log(err);
            }
        }
        fetchNews();
    },[])

    return(
        <div className="text-left">
            {sectionNews.map((newsItem) => (
                <div key={newsItem.id}>
                    <LocalNews
                        key={newsItem.title}
                        title={newsItem.title}
                        description={newsItem.description}
                        date={newsItem.date}
                        id={newsItem.id}
                    />
                    <hr/>
                </div>
            ))}
        </div>
    );
}