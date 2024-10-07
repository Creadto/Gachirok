"use client";

import {useParams, useRouter} from "next/navigation";

interface NewsProps{
    title: string;
    description: string;
    date: string;
    id: number;
}

/**
 *
 * @Description 뉴스 컴포넌트
 * @param title 뉴스 제목
 * @param description 뉴스 내용
 * @param date 뉴스 날짜
 * @param id 뉴스 ID
 * @Author 민동현
 */
export default function LocalNews({title, description, date, id} : NewsProps){

    const router = useRouter();
    const params = useParams();
    const countryCode = params['country-code'];

    const handleClick = ()=>{
        router.push(`/news/local/${countryCode}/${id}`)
    }
    return(
        <div className="cursor-pointer" onClick={handleClick}>
            <h3 className={`text-lg font-bold truncate whitespace-nowrap overflow-hidden`}>{title}</h3>
            <p className={`text-sm truncate whitespace-nowrap overflow-hidden`}>{description}</p>
            <span className="text-xs text-gray-500">{date}</span>
        </div>
    );
}