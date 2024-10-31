"use client";

import {useRouter} from "next/navigation";
import Image from "next/image";

interface NewsProps {
    title: string;
    description: string;
    category: string;
    date: string;
    id: number;
    imageUrl: string
}

/**
 *
 * @Description 뉴스 컴포넌트 ( Description이 없음)
 * @Author 민동현
 */

export default function SimpleNews({news}: {news:NewsProps}) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/news/universal/article/${news.id}`)
    }
    return (
        <div>
            {news.imageUrl === "" ?
                <div className="flex flex-col justify-between py-3 cursor-pointer mr-[10px] " onClick={handleClick}>
                    <h3 className="text-[14px] font-bold line-clamp-2 mb-2">{news.title}</h3>
                    <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                :
                <div className="flex flex-row py-3 cursor-pointer justify-between" onClick={handleClick}>
                    <div className="flex flex-col justify-between mr-[10px]">
                        <h3 className="text-[14px] font-bold line-clamp-2 mb-2">{news.title}</h3>
                        <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-[80px] h-[62px] relative">
                            <Image
                                src={news.imageUrl}
                                alt={news.title}
                                fill
                                // objectFit='contain' // 원본 비율 유지
                                className="rounded"
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}