import {mockNewsData} from "@/app/news/universal/_mock/mockNewsData";

interface LocalNewsPageProps{
    params:{
        "news-id":string;
    }
}

export default function LocalNewsPage({params} : LocalNewsPageProps){

    const { 'news-id': newsId } = params;
    const newsData = mockNewsData.find((news) => news.id === newsId);


    return(
        <>
            {newsData ? (
                <section>

                </section>

            ) : (
                <p>찾는 뉴스가 없습니다</p>
            )}
        </>
    );
}