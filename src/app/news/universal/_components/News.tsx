"use client";

import {useRouter} from "next/navigation";

interface NewsProps{
    title: string;
    description: string;
    date: string;
    id: string;
    classNameTitle?: string;   // 추가된 prop
    classNameDescription?: string; // 추가된 prop
}



export default function News({title, description, date, id, classNameTitle, classNameDescription} : NewsProps){

    const router = useRouter();

    const handleClick = ()=>{
        router.push(`/news/universal/${id}`)
    }
    return(
        <div onClick={handleClick}>
            <h3 className={`text-lg font-bold ${classNameTitle}`}>{title}</h3>
            <p className={`text-sm ${classNameDescription}`}>{description}</p>
            <span className="text-xs text-gray-500">{date}</span>
        </div>
    );
}