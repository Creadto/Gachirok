"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Item {
    title: string;
    description?: string;
    category?: string;
    date: string;
    id: number;
}

interface ToBeforeItemProps {
    basePath: string; // 예: "/news/universal" 또는 "/announcement"
    apiPath: string; // 예: "/api/news" 또는 "/api/announcement"
    itemType: string; // 예: "news" 또는 "announcement"
    regionType: string // 예: "Universal" 또는 "Local"
}

/**
 * @Description 이전 아이템(뉴스 또는 공지사항) 돌아가기 컴포넌트
 * @constructor
 */

export default function ToBeforeItem({ basePath, apiPath, itemType, regionType }: ToBeforeItemProps) {
    const params = useParams();
    const router = useRouter();
    const countryCode = params['country-code']; // Local이면 존재, Universal이면 undefined
    const currentId = parseInt(params[`${itemType}-id`] as string, 10);
    const beforeId = currentId - 1;
    const [beforeItem, setBeforeItem] = useState<Item | null>(null);

    if(regionType === "Local"){

    }

    else{   // Universal 인 경우

    }

    const clickToBeforeItem = () => {
        if (currentId > 1) {
            const newId = currentId - 1;
            if(regionType === "Local"){
                router.push(`${basePath}/${countryCode}/${newId}`);
            }
            else{
                router.push(`${basePath}/${newId}`);
            }
        }
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${apiPath}/${beforeId}`);
                setBeforeItem(response.data.news);
            } catch (err) {
                console.log(err);
            }
        };
        fetchItem();
    }, [beforeId, apiPath, itemType]);

    return (
        <div className="flex flex-row py-4 border-b cursor-pointer" onClick={clickToBeforeItem}>
            <p className="pr-32">이전으로</p>
            {beforeItem ? <p>{beforeItem.title}</p> : <p>없음</p>}
        </div>
    );
}
