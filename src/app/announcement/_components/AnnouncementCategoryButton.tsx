"use client";

import {useParams, useRouter} from "next/navigation";
import {AnCategoryToNumber} from "@/app/announcement/utils/Category";

interface AnnouncementCategoryButtonProps{
    section:string;
    currentSection: string;
    regionType : string;
}

export default function AnnouncementCategoryButton(props: AnnouncementCategoryButtonProps){

    const router = useRouter();
    const params = useParams();

    const countryCode = params['country-code'];
    const category = props.section;
    const categoryId = AnCategoryToNumber[category];
    const currentCategory = props.currentSection;



    const onClickHandler = () => {
        if(props.regionType === 'local'){
            router.push(`/announcement/local/${countryCode}/section/${categoryId}?page=1&limit=8&sort=newest`);
        }
        else{
            router.push(`/announcement/universal/section/${categoryId}?page=1&limit=8&sort=newest`);
        }
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