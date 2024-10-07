import DetailButton from "@/app/news/universal/_components/DetailButton";
import SectionNews from "@/app/news/universal/section/_components/SectionNews";
import {Category} from "@/app/news/utils/Category";


/**
 *  @Description Universal News 처음 화면
 *  @Author 민동현
 **/
export default function NewsPage() {

    return (
        <section className="p-4">
            <div className="p-4 flex">
                <h1 className="pr-2 font-bold text-3xl">이 시간 뉴스</h1>
                <p className="p-1 bg-gray-200 text-center rounded text-gray-500">Universal</p>
            </div>
            <div className="p-1 grid grid-cols-3 gap-5 max-w-8xl mx-auto">
                {Category.map((section) => (
                    <div key={section} className="p-4 bg-gray-100 text-center rounded">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold p-1 text-left">{section}</h2>
                            <DetailButton section={section}/>   {/* 해당 뉴스 카테고리로 이동하는 버튼 */}
                        </div>
                        <hr className="bg-black border-0 h-[2px]"/>
                        <SectionNews section={section}/>    {/* 뉴스의 대략적인 정보만 보여주는 컴포넌트(제목, 내용, 날짜 ) */}
                    </div>
                ))}
            </div>
        </section>
    );
}
