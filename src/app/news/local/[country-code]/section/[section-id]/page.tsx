import NewsCategoryButton from "@/app/news/local/[country-code]/section/_components/NewsCategoryButton";
import {Category, numberToCategory} from "@/app/news/utils/Category";

/**
 *  @Description local 뉴스 카테고리 페이지
 *  @Author 민동현
 */

export default function SectionPage({params}:{params:{'section-id':string}}){

    const categoryId = params['section-id'];
    const currentCategory = numberToCategory[categoryId];

    return (
        <div className="mt-[1.5%] ml-[9.3%] mr-[9.3%] min-w-[1460px] max-w-[1460px] overflow-x-auto flex flex-col">
            <section className="mb-[20px] px-[50px] flex flex-row items-center gap-[5px] max-w-[318px] min-w-[318px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#rytfi9er3a)">
                        <circle cx="15" cy="15" r="15" fill="#FFE9EA"/>
                        <path
                            d="M14.999 22.166a7.167 7.167 0 1 0 0-14.334 7.167 7.167 0 0 0 0 14.334zM7.832 14.998h14.334"
                            stroke="#E62A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path
                            d="M15 7.832a10.966 10.966 0 0 1 2.866 7.167A10.966 10.966 0 0 1 15 22.166a10.965 10.965 0 0 1-2.867-7.167A10.965 10.965 0 0 1 15 7.832z"
                            stroke="#E62A2F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="rytfi9er3a">
                            <path fill="#fff" d="M0 0h30v30H0z"/>
                        </clipPath>
                    </defs>
                </svg>
                <h1 className="w-[39px] h-[30px] text-[22px] font-bold flex items-center justify-center">뉴스</h1>
                <p className="text-[13px] text-[#808080] px-[7px] py-[3px] bg-[#ddd] rounded-[4px]">Local</p>
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
                    {/*<PopularNews category={currentCategory}/>*/}
                </div>
            </section>
            <section className="px-[50px]">
                {/*<DetailSectionNews categoryId={categoryId} regionType="local"/>*/}
            </section>
        </div>
    );
}