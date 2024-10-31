"use client";


import {useRouter} from "next/navigation";
import {categoryToNumber} from "@/app/news/utils/Category";

interface NewsCategoryButtonProps {
    section: string;
    currentSection: string;
}

/**
 *
 * @Description (Universal)각 뉴스 카테고리를 보여주고 선택된 카테고리에 맞는 페이지로 이동하는 버튼 컴포넌트
 * @Author 민동현
 */

export default function NewsCategoryButton(params : NewsCategoryButtonProps) {

    const router = useRouter();

    const category = params.section;
    const categoryId = categoryToNumber[category];
    const currentCategory = params.currentSection;

    const onClickHandler = () => {
        router.push(`/news/universal/section/${categoryId}?page=1&limit=8&sort=newest`);
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

