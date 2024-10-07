import NewsCategoryButton from "@/app/news/universal/section/_components/NewsCategoryButton";
import SectionNews from "@/app/news/universal/section/_components/SectionNews";
import {Category, numberToCategory} from "@/app/news/utils/Category";

/**
 *  @Description universal 뉴스 카테고리 페이지
 *  @Author 민동현
 */

export default function SectionPage({params}:{params:{'section-id':string}}){

    const categoryId = params['section-id'];
    const currentCategory = numberToCategory[categoryId];

    return(
        <section>
            <div className="p-4 flex">
                <h1 className="pr-2 font-bold text-2xl">뉴스</h1>
                <p className="p-1 bg-gray-200 text-center rounded text-gray-500">Universal</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    {Category.map((section) => (
                        <div key={section}>
                            <NewsCategoryButton section={section} currentSection={currentCategory}/> {/* 다른 카테고리로 이동할 수 있는 버튼*/}
                        </div>
                    ))}
                </div>
                <SectionNews section={currentCategory}/>
            </div>
        </section>
    );
}