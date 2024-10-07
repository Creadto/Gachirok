"use client";

import {usePathname, useRouter} from "next/navigation";
import {categoryToNumber} from "@/app/news/utils/Category";

/**
 *
 * @Description (Local)해당 카테고리 뉴스 목록으로 이동하는 버튼 컴포넌트
 * @param section 뉴스 카테고리 ID
 * @Author 민동현
 */
export default function DetailButton({section}:{section:string}) {

    const categoryId = categoryToNumber[section];

    const router = useRouter();
    const path = usePathname();

    function onClick(){
        router.push(`${path}/section/${categoryId}`);
    }
    return(
        <>
            <button
                onClick={onClick}
            >
                &gt;
            </button>
        </>
    );
}