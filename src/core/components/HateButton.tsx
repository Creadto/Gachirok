"use client"

import {useState} from "react";
import Image from "next/image";

export default function HateButton({disLikeCount}:{disLikeCount:number}){

    const [disLike,setDisLike]=useState(disLikeCount);

    const onClick = () => {
        setDisLike(disLikeCount => disLikeCount + 1);
    }

    return(
        <div className="w-[90px] h-[90px] rounded-[8px] border-solid border-[#eee] border-[1px] hover:bg-red-100 ml-[5px]" onClick={onClick}>
            <div className="px-[20.5px] py-[11px] flex flex-col items-center justify-between ">
                <Image
                    src="/images/interests&expertises/dislike-logo.svg"
                    alt="like"
                    width={30}
                    height={30}
                />
                <p className="text-[10px] w-[49px] h-[14px] text-[#ff006f] mb-[8px]">그냥 그래요.</p>
                <p className="text-[10px]">{disLike}</p>
            </div>
        </div>
    );
}