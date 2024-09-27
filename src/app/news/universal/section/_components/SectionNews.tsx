"use client";

import {mockNewsData} from "@/app/news/universal/_mock/mockNewsData";
import {newsCategoryStore} from "@/core/store/news-category-store";
import News from "@/app/news/universal/_components/News";


interface NewsItem{
    title: string;
    description: string;
    category: string;
    date: string;
    id:string;
}

export default function SectionNews(){

    const {category} = newsCategoryStore();


    const sectionNews:NewsItem[] = mockNewsData.filter(newsData => newsData.category === category);

    return(
        <div className="text-left">
            {sectionNews.map((newsItem) => (
                <div key={newsItem.id}>
                    <News
                        key={newsItem.title}
                        title={newsItem.title}
                        description={newsItem.description}
                        date={newsItem.date}
                        id={newsItem.id}
                        classNameTitle="truncate whitespace-nowrap overflow-hidden"
                        classNameDescription="truncate whitespace-nowrap overflow-hidden"
                    />
                    <hr/>
                </div>
            ))}
        </div>
    );
}