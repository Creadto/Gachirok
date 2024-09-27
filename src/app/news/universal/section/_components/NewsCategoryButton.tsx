"use client";
import {newsCategoryStore} from "@/core/store/news-category-store";


export default function NewsCategoryButton({section}: { section: string }) {

    const {category,setCategory} = newsCategoryStore();

    const onClickHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        setCategory((e.target as HTMLButtonElement).value);
    }
    return (
        <div className="p-1">
            {category === section ? (
                <button
                    className="rounded-2xl border-2 p-1 bg-gray-200"
                    onClick={onClickHandler}
                    value={section}
                >
                    {section}
                </button>
            ) : (
                <button
                    className="rounded-2xl border-2 p-1"
                    onClick={onClickHandler}
                    value={section}
                >
                    {section}
                </button>
            )}
        </div>
    );
}

