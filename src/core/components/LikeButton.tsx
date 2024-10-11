"use client";

import {useState} from "react";

export default function LikeButton({likeCount}:{likeCount: number}){

    const [like,setLike] = useState(likeCount);

    const onClick = ()=>{
        setLike(like=>like+1);
    }


    return(
        <div className="px-6">
            <button
                onClick={onClick}
                className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
            >
                👍
            </button>
            <p className="font-bold">추천 {like}</p>
        </div>
    );
}