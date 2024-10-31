"use client";

import {useState} from "react";
import Image from "next/image";

export default function LikeButton({likeCount}: { likeCount: number }) {

    const [like, setLike] = useState(likeCount);

    const onClick = () => {
        setLike(like => like + 1);
    }


    return (
        <div className="w-[90px] h-[90px] rounded-[8px] border-solid border-[#eee] border-[1px] hover:bg-blue-100 mr-[5px]" onClick={onClick}>
            <div className="px-[26px] py-[11px] flex flex-col items-center justify-between ">
                <Image
                    src="/images/interests&expertises/like-logo.svg"
                    alt="like"
                    width={30}
                    height={30}
                />
                <p className="w-[38px] h-[14px] text-[10px] text-[#0676fc] mb-[8px]">추천해요!</p>
                <p className="text-[10px]">{like}</p>
            </div>
        </div>
    );
}