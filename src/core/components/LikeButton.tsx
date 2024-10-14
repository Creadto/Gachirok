"use client";

import {useState} from "react";

export default function LikeButton({likeCount}:{likeCount: number}){

    const [like,setLike] = useState(likeCount);

    const onClick = ()=>{
        setLike(like=>like+1);
    }


    return(
        <div
            className="px-4 border rounded-2xl flex flex-col items-center hover:bg-blue-100 transition"
            onClick={onClick}>
            <button
                className="rounded-full px-4 py-2"
            >
                👍
            </button>
            <p className="font-bold text-sm text-blue-400">추천해요!</p>
            <p className="font-bold"> {like}</p>
        </div>
    );
}