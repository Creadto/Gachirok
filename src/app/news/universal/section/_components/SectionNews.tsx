"use client";

import News from "@/app/news/universal/_components/News";
import {useEffect, useState} from "react";
import axios from "axios";
import {categoryToNumber} from "@/app/news/utils/Category";

interface NewsItem{
    title: string;
    description: string;
    category: string;
    date: string;
    id:number;
}

/**
 *
 * @Description 선택된 뉴스 섹션(카테고리)에 맞는 뉴스 항목들을 불러와 보여주는 컴포넌트
 * @Author 민동현
 */
export default function SectionNews({section}:{section:string}){

    const [sectionNews, setSectionNews] = useState<NewsItem[]>([]);
    const sectionId = categoryToNumber[section];

    useEffect(()=>{
        const fetchNews = async()=>{
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/section/${sectionId}`);
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
                    <News
                        id={newsItem.id}
                        title={newsItem.title}
                        description={newsItem.description}
                        date={newsItem.date}
                    />
                    <hr/>
                </div>
            ))}
        </div>
    );
}