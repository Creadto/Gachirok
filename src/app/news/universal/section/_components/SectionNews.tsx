"use client";

import SimpleNews from "@/app/news/universal/_components/SimpleNews";
import {useEffect, useState} from "react";
import axios from "axios";
import {categoryToNumber} from "@/app/news/utils/Category";

interface NewsItem {
    title: string;
    description: string;
    category: string;
    date: string;
    id: number;
    imageUrl: string
}

/**
 *
 * @Description 선택된 뉴스 섹션(카테고리)에 맞는 뉴스 항목들을 불러와 보여주는 컴포넌트
 * @Author 민동현
 */
export default function SectionNews({section}: { section: string }) {

    const [sectionNews, setSectionNews] = useState<NewsItem[]>([]);
    const sectionId = categoryToNumber[section];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/section/${sectionId}?page=1&limit=6&sort=newest`);
                setSectionNews(response.data.newsData)
            } catch (err) {
                console.log(err);
            }
        }
        fetchNews();
    }, [])

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