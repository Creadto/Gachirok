"use client";

import {useParams, useRouter} from "next/navigation";
import Image from "next/image";

interface AnnouncementProps {
    id: number;
    title:string;
    description:string;
    category:string;
    date:string;
    imageUrl:string;
    likes: number;
    popular: number;
    comments: number;
    regionType : string;
}

/**
 *
 * @Description 공지 사항 목록을 표시하기 위한 대략적인 정보(제목, 본문...)를 담고있는 공지 컴포넌트
 * @Author 민동현
 */

export default function Announcement(props:AnnouncementProps) {

    const params = useParams();
    const router = useRouter();

    const countryCode = params['country-code']; // local 일 경우

    const handleClick = ()=>{
        if(props.regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/${props.id}`)
        }
        else{
            router.push(`/announcement/universal/${props.id}`)
        }
    }

    return (
        <div className="flex flex-row justify-between gap-x-8">
            <div className="cursor-pointer flex-grow basis-7/12 " onClick={handleClick}>
                <h3 className="text-xs border inline-block text-red-500 bg-red-100 ">{props.category}</h3>
                <h3 className={`text-lg font-bold py-1 line-clamp-1`}>{props.title}</h3>
                <p className={`text-sm max-w-full flex-grow overflow-hidden text-ellipsis whitespace-normal line-clamp-2`}>{props.description}</p>
                <div className="flex justify-between pt-4">
                    <span className="text-xs text-gray-500">{props.date}</span>
                    <div>
                        <span className="text-xs text-gray-500 mr-1">🔎️</span>
                        <span className="text-xs text-gray-500 mr-1">{props.popular}</span>
                        <span className="text-xs text-gray-500 mr-1">🤍</span>
                        <span className="text-xs text-gray-500 mr-1">{props.likes}</span>
                        <span className="text-xs text-gray-500 mr-1">💬</span>
                        <span className="text-xs text-gray-500">{props.comments}</span>
                    </div>
                </div>
            </div>
            <div>
            <Image
                    src={props.imageUrl}
                    width={100}
                    height={200}
                    alt={props.title}
                />
            </div>
        </div>
    );
}