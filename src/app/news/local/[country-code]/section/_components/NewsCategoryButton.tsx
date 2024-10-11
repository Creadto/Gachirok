"use client";

import {useParams, useRouter} from "next/navigation";
import {categoryToNumber} from "@/app/news/utils/Category";

interface NewsCategoryButtonProps {
    section: string;
    currentSection: string;
}

/**
 *
 * @Description (Local)각 뉴스 카테고리를 보여주고 선택된 카테고리에 맞는 페이지로 이동하는 버튼 컴포넌트
 * @Author 민동현
 */
export default function NewsCategoryButton(params: NewsCategoryButtonProps) {

    const router = useRouter();
    const countryCode = useParams()['country-code'];
    const category = params.section;
    const categoryId = categoryToNumber[category];
    const currentCategory = params.currentSection;


    const onClickHandler = () => {
        router.push(`/news/local/${countryCode}/section/${categoryId}`);
    }

    return (
        <div className="p-1">
            {category === currentCategory ? (
                <button
                    className="rounded-2xl border-2 p-1 bg-gray-200"
                    onClick={onClickHandler}
                    value={category}
                >
                    {category}
                </button>
            ) : (
                <button
                    className="rounded-2xl border-2 p-1"
                    onClick={onClickHandler}
                    value={category}
                >
                    {category}
                </button>
            )}
        </div>
    );
}

