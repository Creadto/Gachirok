"use client";

import {useRouter} from "next/navigation";
import {newsCategoryStore} from "@/core/store/news-category-store";

export default function DetailButton({section}:{section:string}) {

    const {setCategory} = newsCategoryStore();

    const router = useRouter();

    function onClick(){
        setCategory(section);
        router.push(`/news/universal/section`);
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