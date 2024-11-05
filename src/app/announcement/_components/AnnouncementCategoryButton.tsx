"use client";

import {useParams, useRouter} from "next/navigation";
import {AnCategoryToNumber} from "@/app/announcement/utils/Category";

interface AnnouncementCategoryButtonProps{
    section:string;
    currentSection: string;
    regionType : string;
}

/**
 *
 * @Description 공지사항 섹션을 선택할 수 있는 버튼을 렌더링
 * @Author 민동현
 */

export default function AnnouncementCategoryButton(props: AnnouncementCategoryButtonProps){

    const router = useRouter();
    const params = useParams();

    const {'country-code': countryCode} = params; // local 이면 undefined
    const {section:category, currentSection:currentCategory, regionType:region} = props;

    const categoryId = AnCategoryToNumber[category];

    const onClickHandler = () => {
        if(region === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${categoryId}?page=1&limit=8&sort=newest`);
        }
        else{
            router.push(`/announcement/universal/section/${categoryId}?page=1&limit=8&sort=newest`);
        }
    }
    return (
        <div>
            {category === currentCategory ? (
                <button
                    className="px-[12px] py-[9px] bg-[#000000] text-[13px] text-[#fff] rounded-[50px]"
                    onClick={onClickHandler}
                    value={category}
                >
                    {category}
                </button>
            ) : (
                <button
                    className="px-[12px] py-[9px] bg-[#fff] text-[13px] text-[#000000] rounded-[50px]"
                    onClick={onClickHandler}
                    value={category}
                >
                    {category}
                </button>
            )}
        </div>
    );
}