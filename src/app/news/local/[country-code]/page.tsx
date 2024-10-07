import DetailButton from "@/app/news/local/[country-code]/_components/DetailButton";
import {Category} from "@/app/news/utils/Category";
import SectionNews from "@/app/news/local/[country-code]/section/_components/SectionNews";


interface CountryNewsPageProps{
    params:{
        'country-code':string;
    }
}

/**
 *  @Description Local News 처음 화면
 *  @Author 민동현
 **/
export default function NewsPage({params} : CountryNewsPageProps) {

    const countryCode = params['country-code'];
    console.log(countryCode);

    return (
        <section className="p-4">
            <div className="p-4 flex">
                <h1 className="pr-2 font-bold text-3xl">이 시간 뉴스</h1>
                <p className="p-1 bg-gray-200 text-center rounded text-gray-500">Local</p>
                <div className="pl-2">
                    <p className="p-1 bg-gray-200 text-center rounded text-gray-500">{countryCode}</p>
                </div>
            </div>
            <div className="p-1 grid grid-cols-3 gap-5 max-w-8xl mx-auto">
                {Category.map((section) => (
                    <div key={section} className="p-4 bg-gray-100 text-center rounded">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold p-1 text-left">{section}</h2>
                            <DetailButton section={section}/>
                        </div>
                        <hr className="bg-black border-0 h-[2px]"/>
                        <div className="text-left">
                            <SectionNews section={section}/>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
