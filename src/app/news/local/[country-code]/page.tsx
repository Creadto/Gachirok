"use client";

import DetailButton from "@/app/news/local/[country-code]/_components/DetailButton";
import {Category} from "@/app/news/utils/Category";
import SectionNews from "@/app/news/local/[country-code]/section/_components/SectionNews";
import getTodayTime from "@/app/news/utils/getTodayTime";
import {newsCategoryStore} from "@/core/store/newsCategory-store";
import {useEffect, useState} from "react";
import PopularNews from "@/app/news/local/[country-code]/_components/PopularNews";
import PinSetting from "@/app/news/local/[country-code]/_components/PinSetting";


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


    const {'country-code': countryCode} = params;

    const time = getTodayTime(countryCode);
    const {category,setLocalCategory} = newsCategoryStore();

    const [isChecked, setIsChecked] = useState<boolean[]>([]);

    useEffect(() => {
        const pinSetting = localStorage.getItem("pinSetting");
        if(pinSetting && JSON.parse(pinSetting).local &&JSON.parse(pinSetting).local[countryCode]){
            const data = JSON.parse(pinSetting).local[countryCode];
            setIsChecked(data);
            setLocalCategory({local:{[countryCode]:data}});
        }
        else{
            setIsChecked(Array(Category.length).fill(true));
            setLocalCategory({local:{[countryCode]:Array(Category.length).fill(true)}});
        }
    },[])

    return (
        <div className="mt-[1.5%] ml-[9.3%] mr-[9.3%] min-w-[1460px] max-w-[1460px] overflow-x-auto flex flex-col">
            <section className="mb-[40px]">
                <div className="flex flex-row items-center mb-[20px] px-[50px]">
                    <p className="mr-[5px] text-[24px]">🔥</p>
                    <p className="w-[77px] h-[30px] font-bold text-[22px] mr-[5px]">인기뉴스</p>
                    <p className="w-[46px] h-[24px] px-[5px] py-[3px] bg-[#ddd] flex justify-center items-center rounded text-[#808080] text-[13px]">Local</p>
                </div>
                <div>
                    <PopularNews/>
                </div>
            </section>
            <section className="mb-[200px] px-[50px]">
                <div className="flex flex-col">
                    <p className="w-[92px] h-[20px] mb-[2px] text-gray-500 text-[14px]">{time}</p>
                    <div className="flex flex-row justify-between mb-[20px]">
                        <div className="flex flex-row items-center">
                            <h1 className="font-bold text-[22px] mr-[5px]">실시간 뉴스</h1>
                            <p className="w-[46px] h-[24px] px-[5px] py-[3px] bg-[#ddd] flex justify-center items-center rounded text-[#808080] text-[13px]">Local</p>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[13px] text-[#808080] mr-[15px]">내가 원하는 뉴스만 골라 볼 수 있어요.</p>
                            <PinSetting/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 min-w-[1360px] max-w-[1360px]">
                    {Category.map((section, index) => (
                        category.local[countryCode][index] ?
                            <div
                                key={section}
                                className="w-[670px] h-[333px] text-center border rounded-2xl px-5 pt-5 pb-2 bg-[#FFF]"
                            >
                                <div className="flex flex-row mb-3">
                                    <div className="flex flex-row justify-center items-center">
                                        <p className="text-[20px] font-bold mr-[5px]">{section}</p>
                                        <DetailButton section={section}/> {/* 해당 뉴스 카테고리로 이동하는 버튼 */}
                                    </div>
                                </div>
                                <div>
                                    <SectionNews section={section}/> {/* 뉴스의 대략적인 정보만 보여주는 컴포넌트(제목, 내용, 날짜 ) */}
                                </div>
                            </div>
                            : null
                    ))}
                </div>
            </section>
        </div>
    );
}
