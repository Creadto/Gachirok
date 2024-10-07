import NewsCategoryButton from "@/app/news/local/[country-code]/section/_components/NewsCategoryButton";
import {Category, numberToCategory} from "@/app/news/utils/Category";
import SectionNews from "@/app/news/local/[country-code]/section/_components/SectionNews";

/**
 *  @Description local 뉴스 카테고리 페이지
 *  @Author 민동현
 */

export default function SectionPage({params}:{params:{'section-id':string}}){

    const categoryId = params['section-id'];
    const currentCategory = numberToCategory[categoryId];

    return(
        <section>
            <div className="p-4 flex">
                <h1 className="pr-2 font-bold text-2xl">뉴스</h1>
                <p className="p-1 bg-gray-200 text-center rounded text-gray-500">Local</p>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    {Category.map((section) => (
                        <div key={section}>
                            <NewsCategoryButton section={section} currentSection={currentCategory}/>
                        </div>
                    ))}
                </div>
                <SectionNews section={currentCategory}/>
            </div>
        </section>
    );
}