"use client";

import {Category} from "@/app/news/utils/Category";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {countryStore} from "@/core/store/country-store";
import {newsCategoryStore} from "@/core/store/newsCategory-store";
import {is} from "date-fns/locale";

/**
 *
 * @Author 민동현
 * @Description (Local) 핀 모달 페이지
 */

export default function PinPage() {

    const {setLocalCategory} = newsCategoryStore();

    const countryStoreInstance = countryStore();
    const countryCode = countryStoreInstance.country;

    const [isChecked, setIsChecked] = useState<boolean[]>([]);
    const router = useRouter();


    // 로컬 스토리지에서 핀 세팅 정보를 가져와서 상태를 초기화하는 로직

    useEffect(() => {
        const pinSetting = localStorage.getItem("pinSetting");
        if(pinSetting && JSON.parse(pinSetting).local &&JSON.parse(pinSetting).local[countryCode]){ // 이미 핀세팅에 존재하는 경우
            const data = JSON.parse(pinSetting).local[countryCode]; // 임시
            setIsChecked(data);
        }
        else{
            setIsChecked(Array(Category.length).fill(true));
        }
    }, [])

    const handleCategoryClick = (id: number) => {
        setIsChecked((prev) => {
            const newState = [...prev]
            newState[id] = !newState[id];
            return newState;
        })
    }

    const handleSubmitClick = () => {

        const pinSetting = localStorage.getItem("pinSetting");

        setLocalCategory({local:{[countryCode]:isChecked}}); // 전역상태 업데이트

        if(pinSetting){  // 핀세팅이 존재하면

            let parsedData = JSON.parse(pinSetting);

            if(parsedData.local){ // 핀세팅에 local이 존재하면

                if(parsedData.local[countryCode]){ // 모두 존재
                    parsedData.local[countryCode] = isChecked;
                    localStorage.setItem("pinSetting",JSON.stringify(parsedData));
                }

                else{ // local은 존재하지만 해당 국가코드가 존재하지 않을 경우
                    parsedData.local = {
                        ...parsedData.local,
                        [countryCode]: isChecked
                    }
                    localStorage.setItem("pinSetting",JSON.stringify(parsedData));
                }

            }

            else{ // 핀세팅에 local이 존재하지 않음.
                parsedData = {
                    ...parsedData,
                    local:{countryCode:isChecked}
                }
                localStorage.setItem("pinSetting",JSON.stringify(parsedData));
            }

        }
        else{ // 핀세팅이 존재하지 않으면
            const data = {local: {[countryCode] : isChecked}}
            localStorage.setItem("pinSetting", JSON.stringify(data));
        }

        router.back();
    }
    const handleExitClick = () => {
        router.back();
    }

    const checkIsTrue = (item: boolean) => item;


    return (
        <div className="w-[100vw] h-[100vw] flex justify-center items-center absolute z-10 inset-0 bg-black/40">
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[620px] border border-solid border-[#eee] rounded-[15px] flex flex-col bg-[#fff]">
                <div
                    className="relative p-[15px] flex flex-row justify-center items-center border-b-[1px] border-[#eee]">
                    <div className="font-bold text-[18px]">
                        핀설정
                    </div>
                    <svg className="absolute right-[15px] cursor-pointer" onClick={handleExitClick} width="30"
                         height="30" viewBox="0 0 30 30" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m8.324 8.325 13.352 13.35M21.675 8.325l-13.35 13.35" stroke="#000" stroke-width="1.8"
                              stroke-linecap="round"/>
                    </svg>
                </div>
                <div className="p-[20px] flex flex-col flex-grow gap-[10px] relative">
                    {Category.map((item, index) => (
                        <div
                            key={item}
                            onClick={() => handleCategoryClick(index)}
                        >
                            {isChecked[index] ?

                                <div
                                    className="w-[280px] h-[60px] p-[10px] flex flex-row items-center border border-solid border-[#eee] rounded-[15px] cursor-pointer bg-[#ffe9ea]">
                                    <svg width="14" height="14" className="mr-[12px]" viewBox="0 0 14 14" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.548 12.768a.498.498 0 0 1-.116-.685l2.84-4.937a.496.496 0 0 1 .65-.244.499.499 0 0 1 .115.685l-2.84 4.938a.495.495 0 0 1-.65.243"
                                            fill="#E62A2F"/>
                                        <path
                                            d="m8.75 8.292 1.626-3.605.943.545.615-1.065L6.78 1.191l-.616 1.067.943.544-2.308 3.21a2.62 2.62 0 0 0-2.733 1.266l6.953 4.014a2.622 2.622 0 0 0-.27-3"
                                            fill="#E62A2F"/>
                                    </svg>

                                    <div className="relative w-[40px] h-[40px] mr-[15px]">
                                        <Image
                                            src={`/images/category${index}.jpeg`}
                                            alt="item"
                                            fill
                                            className="rounded-[5px]"
                                        />
                                    </div>
                                    <div className="text-[13px]">{item}</div>
                                </div> :

                                <div
                                    className="w-[280px] h-[60px] p-[10px] flex flex-row items-center border border-solid border-[#eee] rounded-[15px] cursor-pointer">
                                    <svg width="14" height="14" className="mr-[12px]" viewBox="0 0 14 14" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.548 12.768a.498.498 0 0 1-.116-.685l2.84-4.937a.496.496 0 0 1 .65-.244.499.499 0 0 1 .115.685l-2.84 4.938a.495.495 0 0 1-.65.243"
                                            fill="gray"/>
                                        <path
                                            d="m8.75 8.292 1.626-3.605.943.545.615-1.065L6.78 1.191l-.616 1.067.943.544-2.308 3.21a2.62 2.62 0 0 0-2.733 1.266l6.953 4.014a2.622 2.622 0 0 0-.27-3"
                                            fill="gray"/>
                                    </svg>
                                    <div className="relative w-[40px] h-[40px] mr-[15px]">
                                        <Image
                                            src={`/images/category${index}.jpeg`}
                                            alt="item"
                                            fill
                                            className="rounded-[5px]"
                                        />
                                    </div>
                                    <div className="text-[13px]">{item}</div>
                                </div>
                            }

                        </div>
                    ))}
                    {isChecked.some(checkIsTrue) ?
                        <button
                            className="absolute bottom-[20px] w-[280px] h-[60px] rounded-[8px] bg-[#e62a2f] text-[#fff] text-[15px]"
                            onClick={handleSubmitClick}
                        >
                            설정완료
                        </button> :
                        <button
                            className="absolute bottom-[20px] w-[280px] h-[60px] rounded-[8px] bg-[#a3a3a3] text-[#fff] text-[15px] disabled">
                            설정완료
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}