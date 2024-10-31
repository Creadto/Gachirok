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
    itemType: string; // 예: "news" 또는 "announcement"
    regionType: string // 예: "Universal" 또는 "Local"
}

/**
 * @Description 이전 아이템(뉴스 또는 공지사항) 돌아가기 컴포넌트
 * @constructor
 */

export default function ToBeforeItem({itemType, regionType }: ToBeforeItemProps) {
    const params = useParams();
    const router = useRouter();
    const countryCode = params['country-code']; // Local이면 존재, Universal이면 undefined
    const currentId = parseInt(params[`${itemType}-id`] as string, 10);

    console.log(countryCode, currentId);
    const beforeId = currentId - 1;
    const [beforeItem, setBeforeItem] = useState<Item | null>(null);

    const clickToBeforeItem = () => {
        if (currentId > 1) {
            if(regionType === "local"){
                router.push(`/${itemType}/${regionType}/article/${countryCode}/${beforeId}`); //
            }
            else{
                router.push(`/${itemType}/${regionType}/article/${beforeId}`);
            }
        }
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                if(regionType === "local"){ // local api 구상중
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${itemType}/${beforeId}`);
                    setBeforeItem(response.data.data);
                }
                else{
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${itemType}/${beforeId}`);
                    setBeforeItem(response.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchItem();
    }, [beforeId, itemType]);

    return (
        <div className="flex flex-row py-[20px] items-center cursor-pointer hover:bg-blue-100 hover:text-white border-y-[1px]"
             onClick={clickToBeforeItem}>
            <p className="mr-[80px] text-[15px] whitespace-nowrap">이전으로</p>
            {beforeItem ? <p className="line-clamp-1">{beforeItem.title}</p> : <p>없음</p>}
        </div>
    );
}
