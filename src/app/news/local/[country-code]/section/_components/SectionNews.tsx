"use client";

import axios from "axios";
import {useEffect, useState} from "react";
import {categoryToNumber} from "@/app/news/utils/Category";
import {useParams} from "next/navigation";
import SimpleNews from "@/app/news/local/[country-code]/_components/SimpleNews";


interface NewsItem{
    title: string;
    description: string;
    category: string;
    date: string;
    id:number;
    imageUrl: string
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
    let countryCode:undefined | string | string[];
    if(params){
        countryCode = params['country-code'];
    }

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

    return (
        <div>
            <div className="text-left grid grid-cols-2 gap-x-4">
                {sectionNews.map((newsItem, index) => (
                    <div key={newsItem.id}>
                        <SimpleNews news={newsItem}/>
                        {index === 4 || index === 5 ? null : <hr/>}
                    </div>
                ))}
            </div>
        </div>
    );
}