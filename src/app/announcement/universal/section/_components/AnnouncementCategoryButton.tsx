"use client";

import {useRouter} from "next/navigation";
import {AnCategoryToNumber} from "@/app/announcement/utils/Category";

interface AnnouncementCategoryButtonProps{
    section:string;
    currentSection: string;
}

export default function AnnouncementCategoryButton(params: AnnouncementCategoryButtonProps){

    const router = useRouter();

    const category = params.section;
    const categoryId = AnCategoryToNumber[category];
    const currentCategory = params.currentSection;

    const onClickHandler = () => {
        router.push(`/announcement/universal/section/${categoryId}?page=1&limit=8&sort=newest`);
    }
    return (
        <div className="pr-2">
            {category === currentCategory ? (
                <button
                    className="rounded-2xl border-2 p-1 bg-gray-700 text-white"
                    onClick={onClickHandler}
                    value={category}
                >
                    {category}
                </button>
            ) : (
                <button
                    className="rounded-2xl border-2 p-1 hover:bg-gray-500 hover:text-white"
                    onClick={onClickHandler}
                    value={category}
                >
                    {category}
                </button>
            )}
        </div>
    );
}