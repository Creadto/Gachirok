import NewsCategoryButton from "@/app/news/universal/section/_components/NewsCategoryButton";
import SectionNews from "@/app/news/universal/section/_components/SectionNews";

export default function SectionPage(){

    const sections = ["정치", "경제", "사회", "스포츠", "생활", "문화"];

    return(
        <section>
            <div className="p-4 flex">
                <h1 className="pr-2 font-bold text-2xl">뉴스</h1>
                <p className="p-1 bg-gray-200 text-center rounded text-gray-500">Universal</p>
            </div>
            <div className="flex">
                {sections.map((section) => (
                    <NewsCategoryButton section={section} key={section}/>
                ))}
            </div>
            <div>
                <SectionNews/>
            </div>
        </section>
    );
}