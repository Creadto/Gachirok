"use client";

import { useParams, useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";

interface Item{
    title: string;
    description: string;
    category: string;
    date: string;
    id:number;
}
interface ToAfterItemProps {
    itemType: string; // 예: "news" 또는 "announcement"
    regionType: string // 예: "universal" 또는 "local"
}

/**
 * @Description 다음 아이템(뉴스 또는 공지사항)으로 이동하는 컴포넌트
 * @constructor
 */

export default function ToNextItem({itemType, regionType }: ToAfterItemProps) {

    const params = useParams();
    const router = useRouter();
    const countryCode = params['country-code']; // Local이면 존재, Universal이면 undefined
    const currentId = parseInt(params[`${itemType}-id`] as string, 10); // 현재 뉴스의 id
    const nextId = currentId+1;
    const [nextItem, setNextItem] = useState<Item>();
    const [itemLength, setItemLength] = useState<number>(100); // 아이템 페이지 개수 가져오는 거 오류나서 임시 데이터

    // 다음 아이템으로 이동
    const clickToNextItem = () => {

        console.log(currentId);

        if (currentId >= 1) { // max를 어떻게 설정하지?? 그냥 임의로 무조건 되게 햇음 주의!!!!!!
            if(regionType === "local"){
                console.log(itemType,regionType);
                if(itemType === "news"){
                    router.push(`/${itemType}/${regionType}/${countryCode}/article/${nextId}`); //
                }
                else if(itemType === "announcement"){
                    router.push(`/${itemType}/${regionType}/${countryCode}/${nextId}`); //
                }
            }
            else{
                if(itemType === "news"){
                    router.push(`/${itemType}/${regionType}/article/${nextId}`);
                }
                else if(itemType === "announcement"){
                    router.push(`/${itemType}/${regionType}/${nextId}`);
                }
            }
        }
    };

    useEffect(()=>{
        const fetchNextItem = async()=>{
            try{
                if(regionType === "local"){// local은 api 호출 어떻게 할지 구상중
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${itemType}/${nextId}`);
                    setNextItem(response.data.data);
                }
                else{
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${itemType}/${nextId}`);
                    setNextItem(response.data.data);
                }
            }
            catch(err){
                console.log(err);
            }
        }
        // const fetchNewsLength = async()=>{
        //     try{
        //         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/total`);
        //         console.log(response.data);
        //         setNewsLength(response.data.newsDataLength);
        //     }
        //     catch(err){
        //         console.log(err);
        //     }
        // }
        fetchNextItem();
        // fetchNewsLength();
    },[])



    return (
        <div className="flex flex-row items-center py-[20px] cursor-pointer hover:bg-blue-100 hover:text-white border-b-[1px]"
             onClick={clickToNextItem}>
            <p className="mr-[80px] text-[15px] whitespace-nowrap">다음으로</p>
            {nextItem ? <p className="line-clamp-1">{nextItem.title}</p> : <p>없음</p>}
        </div>
    );
}
