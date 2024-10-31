import NewsCategoryButton from "@/app/news/universal/section/_components/NewsCategoryButton";
import {Category, numberToCategory} from "@/app/news/utils/Category";
import Image from "next/image";
import PopularNews from "@/app/news/universal/_components/PopularNews";
import DetailSectionNews from "@/app/news/universal/section/_components/DetailSectionNews";

/**
 *  @Description universal 뉴스 카테고리 페이지
 *  @Author 민동현
 */




export default function SectionPage({params}:{params:{'section-id':string}}){

    const categoryId = params['section-id'];
    const currentCategory = numberToCategory[categoryId];

    return(
        <div className="mt-[1.5%] ml-[9.3%] mr-[9.3%] min-w-[1460px] max-w-[1460px] overflow-x-auto flex flex-col">
            <section className="mb-[20px] px-[50px] flex flex-row items-center gap-[5px] max-w-[318px] min-w-[318px]">
                <Image
                    src="/images/interests&expertises/news-logo.svg"
                    alt="뉴스"
                    width={30}
                    height={30}
                />
                <h1 className="w-[39px] h-[30px] text-[22px] font-bold flex items-center justify-center">뉴스</h1>
                <p className="text-[13px] text-[#808080] px-[7px] py-[3px] bg-[#ddd] rounded-[4px]">Universal</p>
            </section>
            <section className="flex flex-row gap-[5px] px-[50px] mb-[20px]">
                {Category.map((section) => (
                    <div key={section}>
                        <NewsCategoryButton section={section}
                                            currentSection={currentCategory}/> {/* 다른 카테고리로 이동할 수 있는 버튼*/}
                    </div>
                ))}
            </section>
            <section className="mb-[40px]">
                <div className="flex flex-row mb-[20px] px-[50px] items-center">
                    <p className="mr-[5px] text-[24px]">🔥</p>
                    <p className="w-[77px] h-[30px] font-bold text-[18px] mr-[5px]">인기뉴스</p>
                </div>
                <div>
                    <PopularNews category={currentCategory}/>
                </div>
            </section>
            <section className="px-[50px]">
                <DetailSectionNews categoryId={categoryId} regionType="universal"/>
            </section>
        </div>
    );
}