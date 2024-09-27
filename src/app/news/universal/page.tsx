import News from "@/app/news/universal/_components/News";
import { mockNewsData } from "@/app/news/universal/_mock/mockNewsData";
import DetailButton from "@/app/news/universal/_components/DetailButton";

interface NewsItem{
    title: string;
    description: string;
    category: string;
    date: string;
    id: string;
}
/**
 *
 *
 *
 *
 *
 *
 */
/**
 * @Description 뉴스 배열을 섹션 별로 객체를 생성하는 로직
 *
 * @Author 민동현
 **/
export default function NewsPage() {
    const sections = ["정치", "경제", "사회", "스포츠", "생활", "문화"];

    const groupedNews = sections.reduce((acc, section) => {
        acc[section] = mockNewsData.filter(newsData => newsData.category === section);
        return acc;
    }, {} as Record<string, NewsItem[]>);

    return (
        <section className="p-4">
            <div className="p-4 flex">
                <h1 className="pr-2 font-bold text-3xl">이 시간 뉴스</h1>
                <p className="p-1 bg-gray-200 text-center rounded text-gray-500">Universal</p>
            </div>
            <div className="p-1 grid grid-cols-3 gap-5 max-w-8xl mx-auto">
                {sections.map((section) => (
                    <div key={section} className="p-4 bg-gray-100 text-center rounded">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold p-1 text-left">{section}</h2>
                            <DetailButton section={section}/>
                        </div>
                        <hr className="bg-black border-0 h-[2px]"/>
                        <div className="text-left">
                            {groupedNews[section].map((newsItem) => (
                                <div key={newsItem.id}>
                                    <News
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
                    </div>
                ))}
            </div>
        </section>
    );
}
