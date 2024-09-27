import {mockNewsData} from "@/app/news/universal/_mock/mockNewsData";
import Image from "next/image";
import LikeButton from "@/app/news/universal/[news-id]/_components/LikeButton";
import HateButton from "@/app/news/universal/[news-id]/_components/HateButton";


interface UniversalNewsPageProps {
    params: {
        'news-id': string; // news-id는 문자열로 지정
    };
}

export default function UniversalNewsPage({params} : UniversalNewsPageProps) {


    const { 'news-id': newsId } = params;
    const newsData = mockNewsData.find((news) => news.id === newsId);


    return(
        <>
            {newsData ? (
                <section className="px-96 py-5">
                    <h4 className="text-xs text-gray-500">News &gt; {newsData.category}</h4>
                    <div className="py-5">
                        <h1 className="font-bold text-3xl">{newsData.title}</h1>
                        <p className="text-xs text-gray-500 py-2">{newsData.date} | 조회3 추천3 댓글3</p>
                    </div>
                    <hr/>
                    <div>
                        <Image
                            src={newsData.imageUrl}
                            alt={newsData.title}
                            width={600} // 원하는 너비
                            height={400} // 원하는 높이
                            className="object-cover py-5" // 스타일 추가
                        />
                        <p className="py-5">{newsData.description}</p>
                    </div>
                    <hr/>
                    <div className="flex justify-center items-center p-4">
                        <p>이 기사를 추천합니다.</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <LikeButton/>
                        <HateButton/>
                    </div>
                </section>
            ) : (
                <p>찾는 뉴스가 없습니다</p>
            )}
        </>
    );
}