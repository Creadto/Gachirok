"use client";

import {useRouter} from "next/navigation";
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
}

export default function Announcement(params:AnnouncementProps) {

    const router = useRouter();

    const handleClick = ()=>{
        router.push(`/announcement/universal/${params.id}`)
    }

    return (
        <div className="flex flex-row justify-between gap-x-8">
            <div className="cursor-pointer flex-grow basis-7/12 " onClick={handleClick}>
                <h3 className="text-xs border inline-block text-red-500 bg-red-100 ">{params.category}</h3>
                <h3 className={`text-lg font-bold py-1 line-clamp-1`}>{params.title}</h3>
                <p className={`text-sm max-w-full flex-grow overflow-hidden text-ellipsis whitespace-normal line-clamp-2`}>{params.description}</p>
                <div className="flex justify-between pt-4">
                    <span className="text-xs text-gray-500">{params.date}</span>
                    <div>
                        <span className="text-xs text-gray-500 mr-1">🔎️</span>
                        <span className="text-xs text-gray-500 mr-1">{params.popular}</span>
                        <span className="text-xs text-gray-500 mr-1">🤍</span>
                        <span className="text-xs text-gray-500 mr-1">{params.likes}</span>
                        <span className="text-xs text-gray-500 mr-1">💬</span>
                        <span className="text-xs text-gray-500">{params.comments}</span>
                    </div>
                </div>
            </div>
            <div>
            <Image
                    src={params.imageUrl}
                    width={100}
                    height={200}
                    alt={params.title}
                />
            </div>
        </div>
    );
}